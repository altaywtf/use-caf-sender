import { capitalCase } from 'capital-case'

export type Styles = chrome.cast.media.TextTrackStyle
export type StyleKey = keyof chrome.cast.media.TextTrackStyle
export type StyleValue = string | number

export type StyleConfigOption = { label: string; value: StyleValue }

export type StyleConfig = {
  keyPath: StyleKey
  label: string
  options: StyleConfigOption[]
}

const convertChromecastEnumToOptions = (input: Record<string, string>) =>
  Object.values(input).map((v) => ({
    label: capitalCase(v),
    value: v,
  }))

const getSchema = (): StyleConfig[] => [
  {
    keyPath: 'foregroundColor',
    label: 'Font Color',
    options: [
      {
        label: 'White',
        value: '#FFF',
      },
      {
        label: 'Yellow',
        value: '#FDCE45FF',
      },
    ],
  },
  {
    keyPath: 'backgroundColor',
    label: 'Background Color',
    options: [
      {
        label: 'Transparent',
        value: '#00000000',
      },
      {
        label: 'Semi-Transparent',
        value: '#00000080',
      },
      {
        label: 'Opaque',
        value: '#000',
      },
    ],
  },
  // @TODO: this doesn't change, why?
  // {
  //   keyPath: 'fontFamily',
  //   label: 'Font Family',
  //   options: convertChromecastEnumToOptions(
  //     window.chrome.cast.media.TextTrackFontGenericFamily,
  //   ),
  // },
  {
    keyPath: 'fontScale',
    label: 'Font Size',
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4].map((v) => ({
      label: `${v * 100}%`,
      value: v,
    })),
  },
  {
    keyPath: 'fontStyle',
    label: 'Font Style',
    options: convertChromecastEnumToOptions(
      window.chrome.cast.media.TextTrackFontStyle,
    ),
  },
  {
    keyPath: 'edgeType',
    label: 'Text Edge Style',
    options: convertChromecastEnumToOptions(
      window.chrome.cast.media.TextTrackEdgeType,
    ),
  },
  {
    keyPath: 'edgeColor',
    label: 'Text Edge Color',
    options: [
      {
        label: 'White',
        value: '#FFF',
      },
      {
        label: 'Black',
        value: '#000',
      },
    ],
  },
]

export default getSchema
