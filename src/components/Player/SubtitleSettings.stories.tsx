import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SubtitleSettings, { Props } from './SubtitleSettings'
import theme from '../../theme'
import '../../fixtures/chrome'
import subtitles from '../../fixtures/textTracks'
import subtitleStyles from '../../fixtures/textTrackStyle'
import withMaxWidth from '../../utils/storybook-decorators/withMaxWidth'

const defaultProps: Props = {
  theme: theme.subtitleSettings,
  onClose: action('onClose'),
  subtitles: [],
  selectedSubtitleId: 0,
  selectSubtitle: action('selectSubtitle'),
  subtitleStyles,
  setSubtitleStyle: action('setSubtitleStyle'),
}

storiesOf('SubtitleSettings', module)
  .addDecorator(withMaxWidth(480))
  .add('empty state', () => <SubtitleSettings {...defaultProps} />)
  .add('with subtitles', () => (
    <SubtitleSettings
      {...defaultProps}
      subtitles={subtitles}
      selectedSubtitleId={subtitles[0].trackId}
    />
  ))
