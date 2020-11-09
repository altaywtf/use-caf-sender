import React, { useCallback } from 'react'
import { Flex, Text } from 'rebass'
import { MdCheck } from 'react-icons/md'
import { ChromecastPlayerTheme } from '../../theme'

export type Props = {
  theme: ChromecastPlayerTheme['subtitleSettings']['list']['item']
  selected: boolean
  subtitle: { trackId: number; name: string }
  onSelect: (id: number) => void
}

const containerStyle: React.CSSProperties = {
  cursor: 'pointer',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
}

const SubtitleListItem: React.FC<Props> = ({
  selected,
  theme,
  subtitle,
  onSelect,
}) => {
  const { trackId } = subtitle
  const handleSelect = useCallback(() => onSelect(trackId), [trackId, onSelect])

  const iconColor = selected ? theme.tintColor : '#00000000'
  const textColor = selected ? theme.tintColor : theme.textColor

  return (
    <Flex
      alignItems="center"
      onClick={handleSelect}
      padding={theme.spacing}
      style={containerStyle}
    >
      <Text color={iconColor}>
        <MdCheck />
      </Text>

      <Text
        fontSize={theme.textSize}
        lineHeight={1.2}
        color={textColor}
        style={{ wordBreak: 'break-all' }}
        marginLeft={theme.spacing}
      >
        {subtitle.name}
      </Text>
    </Flex>
  )
}

export default SubtitleListItem
