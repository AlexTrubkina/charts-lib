import { BaseChartRenderer } from "../core/BaseRenderer";
import { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

export class LineChartRenderer extends BaseChartRenderer {

  #maxOfY = this.countMax("y");
  #padding = this.options.padding || 10

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas, options);
    this.options = options;
  }

  drawDots(ratioX: number, color = BASE_COLOR) {
    this.options.coords.forEach((coord) => {
      this.ctx.beginPath();
      this.ctx.arc(coord.x * ratioX, this.options.height - (coord.y / this.#maxOfY) * this.options.height, 3, 0, Math.PI * 2, true);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.strokeStyle = color;
    });
  }

  drawLines(ratioX: number, color = BASE_COLOR) {
 
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.options.coords[0].x * ratioX,
      this.options.height - (this.options.coords[0].y / this.#maxOfY) * this.options.height
    );
    this.options.coords.forEach((coord) => {
      this.ctx.lineTo(coord.x * ratioX, this.options.height - (coord.y / this.#maxOfY) * this.options.height);
    });

    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  setUpAxes(): void {
    if (this.options.xAxis) {
      this.drawXAxis();
    }
    if (this.options.yAxis) {
      this.drawYAxis();
    }
  }

  render(): void {
    const width = this.options.width || 300;
    const color = this.options.columnColor || BASE_COLOR;
    const maxOfX = this.countMax("x");
    const ratioX = this.countRatio(maxOfX, width - this.#padding);
    this.setUpAxes();
    this.drawDots(ratioX,  color);
    this.drawLines(ratioX, color);
  }
}
