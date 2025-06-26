import { BaseChartRenderer } from "../core/BaseRenderer";
import { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

export class LineChartRenderer extends BaseChartRenderer {

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas, options);
    this.options = options;
  }

  drawDots(ratioX: number, ratioY: number, color = "#6FC6E8") {
    this.options.coords.forEach((coord) => {
      this.ctx.beginPath();
      this.ctx.arc(coord.x * ratioX, coord.y * ratioY, 3, 0, Math.PI * 2, true);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.strokeStyle = color;
    });
  }

  drawLines(ratioX: number, ratioY: number, color = "#6FC6E8") {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.options.coords[0].x * ratioX,
      this.options.coords[0].y * ratioY
    );
    this.options.coords.forEach((coord) => {
      this.ctx.lineTo(coord.x * ratioX, coord.y * ratioY);
    });

    this.ctx.strokeStyle = color;
    this.ctx.stroke();
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
    const width = this.options.width || 300;
    const height = this.options.height || 300;
    const color = this.options.columnColor || BASE_COLOR;
    const maxOfX = this.countMax("x");
    const maxOfY = this.countMax("y");
    const ratioX = this.countRatio(maxOfX, width - 30);
    const ratioY = this.countRatio(maxOfY, height - 30);
    this.drawAxis();
    this.drawDots(ratioX, ratioY, color);
    this.drawLines(ratioX, ratioY, color);
  }
}
