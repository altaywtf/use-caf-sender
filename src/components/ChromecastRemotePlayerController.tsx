import React from 'react'
import useRemotePlayerController from '../hooks/useRemotePlayerController'
import useCastReceiver from '../hooks/useCastReceiver'
import theme from '../theme'
import Player from './Player'

const getMetadataFromMediaInfo = (
  mediaInfo: chrome.cast.media.MediaInfo | undefined,
) => mediaInfo && (mediaInfo.metadata as chrome.cast.media.GenericMediaMetadata)

const getPosterURLFromMetadata = (
  metadata: chrome.cast.media.GenericMediaMetadata | undefined,
  fallbackURL: string,
) => {
  if (metadata && metadata.images.length) {
    const poster = metadata.images[0]
    return poster.url
  }

  return fallbackURL
}

const ChromecastRemotePlayerController: React.FC = () => {
  const [playerState, playerActions] = useRemotePlayerController()
  const metadata = getMetadataFromMediaInfo(playerState.mediaInfo)
  const poster = getPosterURLFromMetadata(metadata, theme.defaultPosterImageURL)
  const [, receiver] = useCastReceiver()

  return (
    <Player
      deviceName={receiver ? receiver.friendlyName : ''}
      theme={theme}
      posterURL={poster}
      currentTime={playerState.currentTime}
      duration={playerState.duration}
      muted={playerState.muted}
      playerState={playerState.playerState}
      onPlayOrPause={playerActions.playOrPause}
      onMuteOrUnmute={playerActions.muteOrUnmute}
      onSeek={playerActions.seek}
      subtitles={playerState.subtitles}
      selectedSubtitleId={playerState.selectedSubtitleId}
      selectSubtitle={playerActions.selectSubtitle}
      subtitleStyles={playerState.subtitleStyles}
      setSubtitleStyle={playerActions.setSubtitleStyle}
    />
  )
}

export default ChromecastRemotePlayerController
