import React from 'react'
import { Flex, Text } from 'rebass'
import { MdCastConnected } from 'react-icons/md'
import { ChromecastPlayerTheme } from '../../theme'

export type Props = {
  theme: ChromecastPlayerTheme['header']
  deviceName?: string
}

const ChromecastPlayerHeader: React.FC<Props> = ({
  theme,
  deviceName = 'Chromecast',
}) => (
  <Flex
    backgroundColor={theme.backgroundColor}
    padding={theme.spacing}
    alignItems="center"
    width={1}
  >
    <MdCastConnected color={theme.iconColor} size={theme.iconSize} />

    <Text
      color={theme.textColor}
      fontSize={theme.textSize}
      marginX={theme.spacing}
    >
      Casting to {deviceName}
    </Text>
  </Flex>
)

export default ChromecastPlayerHeader
