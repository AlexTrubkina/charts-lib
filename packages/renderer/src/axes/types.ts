// packages/renderer/src/axes/types.ts
export interface AxisOptions {
    position?: 'top' | 'bottom' | 'left' | 'right';
    lineColor?: string;
    lineWidth?: number;
    labelColor?: string;
    labelFontSize?: number;
    labelFontFamily?: string;
    labelOffset?: number;
    labelRotation?: number;
    majorTickLength?: number;
    minorTickLength?: number;
    majorTickColor?: string;
    minorTickColor?: string;
    padding?: number;
  }
  
  export const defaultAxisOptions: AxisOptions = {
    position: 'bottom',
    lineColor: '#666',
    lineWidth: 1,
    labelColor: '#333',
    labelFontSize: 12,
    labelFontFamily: 'Arial',
    labelOffset: 15,
    labelRotation: 0,
    majorTickLength: 10,
    minorTickLength: 5,
    majorTickColor: '#666',
    minorTickColor: '#999',
    padding: 20
  };