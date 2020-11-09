import React, { useCallback } from 'react'
import { Button, Flex, Text, Box } from 'rebass'
import { MdCast, MdCastConnected } from 'react-icons/md'
import useCast from '../hooks/useCast'
import defaultTheme, { ChromecastPlayerTheme } from '../theme'
import createElementId from '../utils/createElementId'

type Props = {
  theme: ChromecastPlayerTheme['castButton']
  connect: string
  disconnect: string
  style: React.CSSProperties
}

const buttonStyle: React.CSSProperties = {
  cursor: 'pointer',
}

const textStyle: React.CSSProperties = {
  textTransform: 'uppercase',
  letterSpacing: 1.1,
  fontSize: 12,
}

const CastButton: React.FC<Props> = ({
  style = {},
  theme = defaultTheme.castButton,
  connect,
  disconnect,
}) => {
  const { connected, available, requestSession, endSession } = useCast()

  const handleClick = useCallback(
    () => (connected ? endSession() : requestSession()),
    [connected, endSession, requestSession],
  )

  if (!available) {
    return null
  }

  return (
    <Button
      id={createElementId('btn-cast')}
      backgroundColor={theme.backgroundColor}
      color={theme.textColor}
      onClick={handleClick}
      height={38}
      style={{ ...buttonStyle, ...style }}
    >
      <Flex alignItems="center">
        {connected ? <MdCastConnected /> : <MdCast />}
        <Box width={8} />
        <Text style={textStyle} sx={{ fontWeight: 'body' }}>
          {connected ? disconnect : connect}
        </Text>
      </Flex>
    </Button>
  )
}

export default CastButton
