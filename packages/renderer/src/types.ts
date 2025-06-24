export interface ChartOptions {
  width: number;
  height: number;
  columnWidth: number;
  xAxis?: boolean;
  yAxis?: boolean;
  coords: { x: number; y: number; color?: string }[];
  chartName?: string;
  columnColor?: string;
}
