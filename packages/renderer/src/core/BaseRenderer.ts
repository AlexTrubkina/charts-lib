interface BaseConfig {
  width?: number;
  height?: number;
  columnWidth?: number;
  xAxis?: boolean;
  yAxis?: boolean;
  coords: { x: number; y: number; color?: string }[];
  chartName?: string;
  columnColor?: string;
}

export class BaseRenderer {
  config: BaseConfig;

  constructor(config: BaseConfig) {
    this.config = config;
  }

  private countMaxCoord(coord: "x" | "y") {
    const coordsArray = this.config.coords.map((item) => item[coord]);
    return Math.max.apply(null, coordsArray);
  }
}
