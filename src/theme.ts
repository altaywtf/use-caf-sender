const theme = {
  defaultPosterImageURL: 'https://app.put.io/images/chromecast.png', // @TODO: move to somewhere else
  header: {
    backgroundColor: '#000',
    textColor: '#FFF',
    textSize: '14px',
    iconSize: '2em',
    iconColor: '#0091FF',
    spacing: '8px',
  },
  body: {
    backgroundColor: '#101010',
  },
  castButton: {
    backgroundColor: '#FDCE45',
    textColor: '#000',
  },
  slider: {
    thumbColor: '#FDCE45',
    thumbTextBackgroundColor: '#000',
    thumbSize: '18px',
    textColor: '#FDCE45',
    textSize: '12px',
    trackActiveColor: '#FDCE45',
    trackPassiveColor: 'rgba(84, 84, 84, 0.5)',
  },
  controls: {
    iconColor: '#FDCE45',
    iconSize: '2em',
    playPauseIconSize: '4em',
  },
  subtitleSettings: {
    header: {
      backgroundColor: '#232323',
      textColor: '#FFF',
      textSize: '16px',
      spacing: 20,
      buttonColor: '#FDCE45',
    },
    body: {
      backgroundColor: '#232323',
      textColor: '#FFF',
      spacing: 16,
      textSize: '14px',
    },
    list: {
      item: {
        tintColor: '#FDCE45',
        textSize: '14px',
        textColor: '#FFF',
        spacing: 14,
      },
    },
    styler: {
      item: {
        borderColor: 'rgba(100, 100, 100, 1)',
        focusedBorderColor: '#FDCE45',
        backgroundColor: '#101010',
        textSize: '14px',
        textColor: '#FFF',
        spacing: 14,
      },
    },
  },
};

export type ChromecastPlayerTheme = typeof theme;

export default theme;
