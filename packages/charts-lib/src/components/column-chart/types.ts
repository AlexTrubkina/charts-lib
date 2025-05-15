export interface ColumnChartProps {
  width?: number;
  height?: number;
  columnWidth?: number;
  xAxis?: boolean;
  yAxis?: boolean;
  coords: ColumnChartCoords;
  chartName?: string;
  columnColor?: string;
}

export type ColumnChartCoords = { x: number; y: number; color?: string }[];
