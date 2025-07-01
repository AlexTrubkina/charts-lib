export interface ChartOptions {
  width: number;
  height: number;
  columnWidth: number;
  xAxis?: boolean;
  yAxis?: boolean;
  coords: { x: number; y: number; color?: string }[];
  chartName?: string;
  columnColor?: string;
  padding?: number
}

export interface InteractionState {
  hoveredItem: HoveredItem | null;
  clickedItem: HoveredItem | null;
  zoomLevel: number;
  panOffset: { x: number, y: 0 };
}

export interface HoveredItem {
  position: { x: number, y: number };
  value: number;
}