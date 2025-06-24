import { BaseChartRenderer } from "../core/BaseRenderer";
import { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

export class ColumnChartRenderer extends BaseChartRenderer {
  private options: ChartOptions;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas);
    this.options = options;
  }

  countMax(coord: "x" | "y") {
    const coordsArray = this.options.coords.map((item) => item[coord]);
    return Math.max.apply(null, coordsArray);
  }

  countRatio = (maxCoord: number, graphSize: number) => {
    return graphSize / maxCoord;
  };

  drawColumn(
    coord: { x: number; y: number; color?: string },
    index: number,
    ratioX: number,
    ratioY: number
  ): void {
    this.ctx.beginPath();
    if (coord.color) {
      this.ctx.fillStyle = coord.color;
      this.ctx.strokeStyle = coord.color;
    } else {
      this.ctx.fillStyle = this.options.columnColor || BASE_COLOR;
      this.ctx.strokeStyle = this.options.columnColor || BASE_COLOR;
    }
    this.ctx.roundRect(
      index * 15 * ratioX + 20,
      this.options.height - coord.y * ratioY - 20,
      this.options.columnWidth,
      coord.y * ratioY
    );
    this.ctx.fill();
  }

  drawAxis(): void {
    if (this.options.xAxis) {
      this.drawXAxis((this.options.height = 300), (this.options.width = 300));
    }
    if (this.options.yAxis) {
      this.drawYAxis((this.options.height = 300));
    }
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
  }

  render(): void {
    this.setResolution()
    const width = this.options.width;
    const height = this.options.height;
    const maxOfX = this.countMax("x");
    const maxOfY = this.countMax("y");
    const ratioX = this.countRatio(maxOfX, width - 30);
    const ratioY = this.countRatio(maxOfY, height - 30);
    this.ctx.clearRect;
    this.options.coords.forEach((coord, index) => {
      this.drawColumn(coord, index, ratioX, ratioY);
    });
  }
}
