// https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.TextTrackStyle

export enum TextTrackEdgeType {
  NONE = 'NONE',
  OUTLINE = 'OUTLINE',
  DROP_SHADOW = 'DROP_SHADOW',
  RAISED = 'RAISED',
  DEPRESSED = 'DEPRESSED',
}

export enum TextTrackFontGenericFamily {
  SANS_SERIF = 'SANS_SERIF',
  MONOSPACED_SANS_SERIF = 'MONOSPACED_SANS_SERIF',
  SERIF = 'SERIF',
  MONOSPACED_SERIF = 'MONOSPACED_SERIF',
  CASUAL = 'CASUAL',
  CURSIVE = 'CURSIVE',
  SMALL_CAPITALS = 'SMALL_CAPITALS',
}

export enum TextTrackFontStyle {
  NORMAL = 'NORMAL',
  BOLD = 'BOLD',
  BOLD_ITALIC = 'BOLD_ITALIC',
  ITALIC = 'ITALIC',
}

export enum TextTrackWindowType {
  NONE = 'NONE',
  NORMAL = 'NORMAL',
  ROUNDED_CORNERS = 'ROUNDED_CORNERS',
}

const textTrackStyle: chrome.cast.media.TextTrackStyle = {
  backgroundColor: '#000',
  edgeColor: '#FFF',
  edgeType: TextTrackEdgeType.NONE,
  fontFamily: 'SANS_SERIF',
  fontGenericFamily: TextTrackFontGenericFamily.SANS_SERIF,
  fontScale: 1,
  fontStyle: TextTrackFontStyle.NORMAL,
  foregroundColor: '#FFF',
  windowColor: '#000',
  windowRoundedCornerRadius: 3,
  windowType: TextTrackWindowType.ROUNDED_CORNERS,
  customData: {},
}

export default textTrackStyle
