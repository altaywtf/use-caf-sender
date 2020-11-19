import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Player, { Props } from './Player'
import theme from '../../theme'
import subtitles from '../../fixtures/textTracks'
import subtitleStyles from '../../fixtures/textTrackStyle'
import withMaxWidth from '../../utils/storybook-decorators/withMaxWidth'

enum PlayerState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  BUFFERING = 'BUFFERING',
}

const defaultProps: Props = {
  theme,
  deviceName: 'Living Room TV',
  posterURL: theme.defaultPosterImageURL,
  currentTime: 50,
  duration: 500,
  muted: false,
  playerState: PlayerState.PLAYING,
  onPlayOrPause: action('onPlayOrPause'),
  onMuteOrUnmute: action('onMuteOrUnMute'),
  onSeek: action('onSeek'),
  subtitles: [],
  selectedSubtitleId: 0,
  selectSubtitle: action('selectSubtitle'),
  subtitleStyles,
  setSubtitleStyle: action('setSubtitleStyle'),
}

storiesOf('Player', module)
  .addDecorator(withMaxWidth(640))
  .add('without subtitles', () => <Player {...defaultProps} />)
  .add('with subtitles, paused and muted', () => (
    <Player
      {...defaultProps}
      muted
      playerState={PlayerState.PAUSED}
      subtitles={subtitles}
      selectedSubtitleId={subtitles[0].trackId}
    />
  ))
