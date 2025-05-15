import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../index';

const meta = {
  title: 'Components/LineChart',
  component: LineChart,
  parameters: {
    
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    coords: [{ x: 10, y: 20 }],
  },
  args: { chartName: "Линейный график" },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    coords: [{ x: 5, y: 20 }, { x: 30, y: 25 }, { x: 35, y: 40 }]
  },
};