import React from 'react'
import { Box, Text } from 'rebass'
import { ChromecastPlayerTheme } from '../../theme'
import SubtitleListItem, { Props as ItemProps } from './SubtitleListItem'

export type Props = {
  theme: ChromecastPlayerTheme['subtitleSettings']
  subtitles: ItemProps['subtitle'][]
  selectedSubtitleId: number
  selectSubtitle: ItemProps['onSelect']
}

const containerStyle: React.CSSProperties = {
  maxHeight: 320,
  overflow: 'auto',
}

const SubtitleList: React.FC<Props> = ({
  theme,
  subtitles,
  selectedSubtitleId,
  selectSubtitle,
}) => {
  const state = subtitles.length ? 'LOADED' : 'EMPTY'

  return (
    <Box>
      {state === 'EMPTY' && (
        <Text
          textAlign="center"
          fontSize={theme.body.textSize}
          color={theme.body.textColor}
          padding={theme.body.spacing}
        >
          No Subtitles
        </Text>
      )}

      {state === 'LOADED' && (
        <Box style={containerStyle}>
          <SubtitleListItem
            subtitle={{ trackId: -1, name: 'No Subtitle' }}
            selected={selectedSubtitleId === -1}
            onSelect={() => selectSubtitle(-1)}
            theme={theme.list.item}
          />

          {subtitles.map((s) => (
            <SubtitleListItem
              key={s.trackId}
              subtitle={s}
              selected={s.trackId === selectedSubtitleId}
              onSelect={selectSubtitle}
              theme={theme.list.item}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SubtitleList
