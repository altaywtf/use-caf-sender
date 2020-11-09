import React, { useState, useEffect } from 'react'
import PlayerPlaceholder from './PlayerPlaceholder'
import assertNever from '../errors/assertNever'
import createMediaInfo from '../utils/createMediaInfo'
import useMediaLoader from '../hooks/useMediaLoader'
import ChromecastRemotePlayerController from './ChromecastRemotePlayerController'
import ChromecastMediaError from './ChromecastMediaError'

type Props = {
  id: number
  title: string
  poster: string
  contentType: string
  stream: string
  duration: number
  subtitles: Array<{
    name: string
    source: string
    link: string
    language: string
    langCode: string
  }>
}

const createMediaInfoFromProps = (
  props: Props,
): chrome.cast.media.MediaInfo => {
  const { id, stream, duration, title, poster, subtitles } = props

  const mediaInfo = createMediaInfo({ contentId: stream, duration })

  const metaData = new window.chrome.cast.media.GenericMediaMetadata()
  metaData.title = title
  metaData.subtitle = `put.io/files/${id}`
  metaData.images = [new window.chrome.cast.Image(poster)]

  mediaInfo.metadata = metaData

  if (subtitles.length) {
    const { Track, TrackType, TextTrackType } = window.chrome.cast.media

    const textTracks = subtitles.map((subtitle, index) => {
      const track = new Track(index, TrackType.TEXT)
      track.trackContentId = `${subtitle.link}&format=webvtt`
      track.trackContentType = 'text/vtt'
      track.subtype = TextTrackType.SUBTITLES
      track.name = subtitle.name
      track.language = subtitle.langCode
      track.customData = {}
      return track
    })

    mediaInfo.tracks = textTracks
  }

  return mediaInfo
}

const ChromecastMediaLoader: React.FC<Props> = (props) => {
  const [mediaId, setMediaId] = useState<number>()
  const [media, loadMedia] = useMediaLoader()

  useEffect(() => {
    if (mediaId !== props.id) {
      setMediaId(props.id)
      loadMedia(createMediaInfoFromProps(props))
    }
  }, [loadMedia, props, mediaId])

  switch (media.status) {
    case 'loading':
      return <PlayerPlaceholder ratio={0.6} />

    case 'error':
      return <ChromecastMediaError error={media.error} />

    case 'loaded':
      return <ChromecastRemotePlayerController />

    default:
      assertNever(media)
  }
}

export default React.memo(ChromecastMediaLoader)
