// YourComponent.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import { Carousel } from './Carousel';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Carousel> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};