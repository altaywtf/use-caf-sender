import React, { useMemo, useCallback } from 'react'
import styled from '@emotion/styled'
import ReactSlider from 'react-slider'
import { Box, Flex, Text } from 'rebass'
import formatDuration from '../../utils/formatDuration'
import { ChromecastPlayerTheme } from '../../theme'

export type Props = {
  theme: ChromecastPlayerTheme['slider']
  currentTime: number
  duration: number
  onSeek: (time: number) => void
}

const Slider = styled(ReactSlider)`
  width: 100%;
  height: 3px;
`

const Thumb = styled(Box)`
  .thumb-text {
    opacity: 0;
  }

  &:hover {
    .thumb-text {
      opacity: 1;
    }
  }
`

const ThumbCircle = styled(Box)`
  height: 18px;
  width: 18px;
  border-radius: 50%;
  cursor: grab;
`

const ThumbText = styled(Text)`
  position: absolute;
  bottom: 24px;
  left: -10px;
  padding: 2px 4px;
  border-radius: 6px;
`

const createThumbRenderer = (
  theme: Props['theme'],
): ReactSlider.ReactSliderProps['renderThumb'] => (props, state) => (
  <Thumb {...props} marginTop="-7px">
    <ThumbCircle backgroundColor={theme.thumbColor} />

    <ThumbText
      className="thumb-text"
      color={theme.textColor}
      fontSize={theme.textSize}
      backgroundColor={theme.thumbTextBackgroundColor}
    >
      {formatDuration(state.valueNow)}
    </ThumbText>
  </Thumb>
)

const StyledTrack = styled(Box)`
  top: 0;
  bottom: 0;
  border-radius: 999px;
  cursor: pointer;
`

const createTrackRenderer = (
  theme: Props['theme'],
): ReactSlider.ReactSliderProps['renderTrack'] => (props, state) => (
  <StyledTrack
    {...props}
    backgroundColor={
      state.index === 0 ? theme.trackActiveColor : theme.trackPassiveColor
    }
  />
)

const ChromecastPlayerSlider: React.FC<Props> = ({
  theme,
  currentTime,
  duration,
  onSeek,
}) => {
  const renderThumb = useMemo(() => createThumbRenderer(theme), [theme])
  const renderTrack = useMemo(() => createTrackRenderer(theme), [theme])
  const onAfterChange = useCallback(
    (value: unknown) => {
      if (typeof value === 'number') onSeek(value)
    },
    [onSeek],
  )

  return (
    <>
      <Slider
        value={currentTime}
        max={duration}
        renderThumb={renderThumb}
        renderTrack={renderTrack}
        onAfterChange={onAfterChange}
        onSliderClick={onSeek}
      />

      <Box width={1} height={12} />

      <Flex alignItems="center" justifyContent="space-between">
        <Text color={theme.textColor} fontSize={theme.textSize}>
          {formatDuration(currentTime)}
        </Text>

        <Text color={theme.textColor} fontSize={theme.textSize}>
          {formatDuration(duration)}
        </Text>
      </Flex>
    </>
  )
}

export default ChromecastPlayerSlider
