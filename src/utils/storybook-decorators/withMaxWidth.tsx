import React, { ReactNode } from 'react'
import { StoryFn } from '@storybook/addons'
import { Box } from 'rebass'

type Props = {
  width: number
  children: React.ReactNode
}

export const WithMaxWidth: React.FC<Props> = ({ width, children }) => (
  <Box maxWidth={width}>{children}</Box>
)

export default (width: number) => (storyFn: StoryFn<ReactNode>) => (
  <WithMaxWidth width={width}>{storyFn()}</WithMaxWidth>
)
