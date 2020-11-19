import React, { useCallback } from 'react'
import { Flex, Box } from 'rebass'
import { Label, Select } from '@rebass/forms'
import { ChromecastPlayerTheme } from '../../../theme'
import getSchema, { Styles, StyleKey, StyleValue, StyleConfig } from './schema'

type SubtitleStylerItemProps = StyleConfig & {
  value: StyleValue
  onChange: <K extends StyleKey>(key: K, value: Styles[K]) => void
  theme: ChromecastPlayerTheme['subtitleSettings']['styler']['item']
}

const SubtitleStylerItem: React.FC<SubtitleStylerItemProps> = ({
  keyPath,
  label,
  value,
  options,
  onChange,
  theme,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(keyPath, e.target.value)
    },
    [onChange, keyPath],
  )

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      margin={theme.spacing}
      css={{
        svg: {
          fill: theme.textColor,
        },
      }}
    >
      <Box flex={1}>
        <Label
          htmlFor={keyPath}
          color={theme.textColor}
          fontSize={theme.textSize}
        >
          {label}
        </Label>
      </Box>

      <Box flex={1}>
        <Select
          id={keyPath}
          name={keyPath}
          value={value}
          onChange={handleChange}
          color={theme.textColor}
          fontSize={theme.textSize}
          backgroundColor={theme.backgroundColor}
          css={{
            borderColor: theme.borderColor,
            ':focus': {
              borderColor: theme.focusedBorderColor,
            },
          }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Box>
    </Flex>
  )
}

export type Props = {
  theme: ChromecastPlayerTheme['subtitleSettings']
  styles: Styles
  setStyle: SubtitleStylerItemProps['onChange']
}

const SubtitleStyler: React.FC<Props> = ({ theme, styles, setStyle }) => {
  const schema = getSchema()

  return (
    <div>
      {schema.map(i => (
        <SubtitleStylerItem
          key={i.keyPath}
          keyPath={i.keyPath}
          label={i.label}
          value={styles[i.keyPath] as StyleValue}
          options={i.options}
          onChange={setStyle}
          theme={theme.styler.item}
        />
      ))}
    </div>
  )
}

export default SubtitleStyler
