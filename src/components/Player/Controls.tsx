import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { Flex, Button } from 'rebass'
import { IconContext } from 'react-icons'
import {
  MdVolumeOff,
  MdVolumeUp,
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdForward30,
  MdReplay30,
  MdClosedCaption,
} from 'react-icons/md'
import { ChromecastPlayerTheme } from '../../theme'
import createElementId from '../../utils/createElementId'

export type Props = {
  theme: ChromecastPlayerTheme['controls']
  currentTime: number
  muted: boolean
  playerState: chrome.cast.media.PlayerState
  onPlayOrPause: () => void
  onMuteOrUnmute: () => void
  onSeek: (time: number) => void
  onSelectSubtitle: () => void
}

const ControlButton = styled(Button)`
  padding: none;
  background: transparent;
  cursor: pointer;
`

const ChromecastPlayerControls: React.FC<Props> = ({
  theme,
  currentTime,
  muted,
  playerState,
  onMuteOrUnmute,
  onPlayOrPause,
  onSeek,
  onSelectSubtitle,
}) => {
  const handleRewind = useCallback(() => onSeek(currentTime - 30), [
    currentTime,
    onSeek,
  ])

  const handleFastForward = useCallback(() => onSeek(currentTime + 30), [
    currentTime,
    onSeek,
  ])

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <IconContext.Provider
        value={{
          color: theme.iconColor,
          size: theme.iconSize,
        }}
      >
        <ControlButton
          id={createElementId('btn-captions')}
          onClick={onSelectSubtitle}
        >
          <MdClosedCaption />
        </ControlButton>

        <ControlButton
          id={createElementId('btn-rewind')}
          onClick={handleRewind}
        >
          <MdReplay30 />
        </ControlButton>

        <ControlButton id={createElementId('btn-play')} onClick={onPlayOrPause}>
          {playerState === 'PLAYING' ? (
            <MdPauseCircleOutline size={theme.playPauseIconSize} />
          ) : (
            <MdPlayCircleOutline size={theme.playPauseIconSize} />
          )}
        </ControlButton>

        <ControlButton
          id={createElementId('btn-fastforward')}
          onClick={handleFastForward}
        >
          <MdForward30 />
        </ControlButton>

        <ControlButton
          id={createElementId('btn-mute')}
          onClick={onMuteOrUnmute}
        >
          {muted ? <MdVolumeOff /> : <MdVolumeUp />}
        </ControlButton>
      </IconContext.Provider>
    </Flex>
  )
}

export default ChromecastPlayerControls
