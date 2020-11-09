import React, { useState, useCallback } from 'react'
import { Flex, Box, Image } from 'rebass'
import { ChromecastPlayerTheme } from '../../theme'
import Header, { Props as HeaderProps } from './Header'
import Slider, { Props as SliderProps } from './Slider'
import Controls, { Props as ControlsProps } from './Controls'
import SubtitleSettings, {
  Props as SubtitleSettingsProps,
} from './SubtitleSettings'

export type Props = Omit<HeaderProps, 'theme'> &
  Omit<SliderProps, 'theme'> &
  Omit<ControlsProps, 'theme' | 'onSelectSubtitle'> &
  Omit<SubtitleSettingsProps, 'theme' | 'onClose'> & {
    theme: ChromecastPlayerTheme
    posterURL: string
  }

const containerStyle: React.CSSProperties = { position: 'relative' }
const subtitleSelectorContainerStyle: React.CSSProperties = {
  position: 'absolute',
  zIndex: 99,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
}

const ChromecastPlayer: React.FC<Props> = ({
  theme,
  deviceName,
  posterURL,
  currentTime,
  duration,
  muted,
  playerState,
  onPlayOrPause,
  onMuteOrUnmute,
  onSeek,
  subtitles,
  selectedSubtitleId,
  selectSubtitle,
  subtitleStyles,
  setSubtitleStyle,
}) => {
  const [showSubtitleSelector, setShowSubtitleSelector] = useState(false)

  const handleSubtitleButtonClick = useCallback(() => {
    setShowSubtitleSelector(true)
  }, [])

  const handleSubtitleSelectorClose = useCallback(() => {
    setShowSubtitleSelector(false)
  }, [])

  return (
    <Flex
      flexDirection="column"
      padding="0px"
      backgroundColor={theme.body.backgroundColor}
      alignItems="center"
      style={containerStyle}
    >
      <Header deviceName={deviceName} theme={theme.header} />

      <Box width={1} height={24} />

      <Flex
        width={[3 / 4, 1]}
        height={200}
        justifyContent="center"
        alignItems="center"
      >
        <Image src={posterURL} maxHeight="100%" maxWidth="100%" />
      </Flex>

      <Box width={1} height={48} />

      <Box width={3 / 4}>
        <Slider
          theme={theme.slider}
          currentTime={currentTime}
          duration={duration}
          onSeek={onSeek}
        />
      </Box>

      <Box width={[1, 3 / 4, 1 / 2]}>
        <Controls
          theme={theme.controls}
          muted={muted}
          currentTime={currentTime}
          playerState={playerState}
          onMuteOrUnmute={onMuteOrUnmute}
          onPlayOrPause={onPlayOrPause}
          onSeek={onSeek}
          onSelectSubtitle={handleSubtitleButtonClick}
        />
      </Box>

      <Box width={1} height={16} />

      {showSubtitleSelector && (
        <div style={subtitleSelectorContainerStyle}>
          <Flex justifyContent="center">
            <Box width={[1, 4 / 5]} marginY={1}>
              <SubtitleSettings
                theme={theme.subtitleSettings}
                onClose={handleSubtitleSelectorClose}
                selectedSubtitleId={selectedSubtitleId}
                subtitles={subtitles}
                selectSubtitle={selectSubtitle}
                subtitleStyles={subtitleStyles}
                setSubtitleStyle={setSubtitleStyle}
              />
            </Box>
          </Flex>
        </div>
      )}
    </Flex>
  )
}

export default ChromecastPlayer
