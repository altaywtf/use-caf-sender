import React from 'react'
import { Flex, Box, Text, Button } from 'rebass'
import { MdClose } from 'react-icons/md'
import { ChromecastPlayerTheme } from '../../theme'
import SubtitleList, { Props as ListProps } from './SubtitleList'
import SubtitleStyler, { Props as StylerProps } from './SubtitleStyler'

export type Props = {
  theme: ChromecastPlayerTheme['subtitleSettings']
  onClose: () => void
  subtitles: ListProps['subtitles']
  selectedSubtitleId: number
  selectSubtitle: ListProps['selectSubtitle']
  subtitleStyles: StylerProps['styles']
  setSubtitleStyle: StylerProps['setStyle']
}

const SubtitleSettings: React.FC<Props> = ({
  theme,
  subtitles,
  selectedSubtitleId,
  selectSubtitle,
  subtitleStyles,
  setSubtitleStyle,
  onClose,
}) => {
  return (
    <Flex justifyContent="center" flexDirection="column">
      <Flex
        width={1}
        backgroundColor={theme.header.backgroundColor}
        alignItems="center"
        justifyContent="space-between"
        padding={theme.header.spacing}
      >
        <Text color={theme.header.textColor} fontSize={theme.header.textSize}>
          Subtitle Settings
        </Text>

        <Button
          color={theme.header.buttonColor}
          onClick={onClose}
          variant="transparent"
        >
          <MdClose />
        </Button>
      </Flex>

      <Box width={1} backgroundColor={theme.body.backgroundColor}>
        <SubtitleList
          theme={theme}
          subtitles={subtitles}
          selectSubtitle={selectSubtitle}
          selectedSubtitleId={selectedSubtitleId}
        />

        <SubtitleStyler
          theme={theme}
          styles={subtitleStyles}
          setStyle={setSubtitleStyle}
        />
      </Box>
    </Flex>
  )
}

export default SubtitleSettings
