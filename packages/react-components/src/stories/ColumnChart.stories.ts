import type { Meta, StoryObj } from '@storybook/react';
import { ColumnChart } from '../index';

const meta = {
  title: 'Components/ColumnChart',
  component: ColumnChart,
  parameters: {
    
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    coords: [{ x: 10, y: 20 }],
  },
  args: { chartName: "Линейный график" },
} satisfies Meta<typeof ColumnChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    coords: [{ x: 5, y: 32 }, { x: 30, y: 44 }, { x: 35, y: 40 }],
  },
};

export const Four: Story = {
  args: {
    coords: [{ x: 22, y: 10 }, { x: 30, y: 25 }, { x: 10, y: 40 }, {x: 24, y: 35}],
  },
};

export const Colorfull: Story = {
  args: {
    coords: [{ x: 5, y: 100, color: "red" }, { x: 30, y: 25, color: "green" }, { x: 35, y: 40 }, {x: 50, y: 35}],
  },
}