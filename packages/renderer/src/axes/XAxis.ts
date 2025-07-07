// packages/renderer/src/axes/XAxis.ts
import type { ChartOptions } from "../types";
import { AxisBase } from "./AxisBase";

export class XAxis extends AxisBase {
  private xData: number[];

  constructor(
    ctx: CanvasRenderingContext2D,
    options: ChartOptions,
    xData: number[]
  ) {
    super(ctx, options);
    this.xData = xData;
  }

  protected drawTick(position: { x: number; y: number }, length: number): void {
    const tickColor = "#000";

    this.ctx.beginPath();
    this.ctx.moveTo(position.x, position.y);
    this.ctx.lineTo(position.x, position.y + length);
    this.ctx.strokeStyle = tickColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  drawGrid(position: { x: number; y: number }): void {
    const gridColor = "#f4f4f4";

    this.ctx.beginPath();
    this.ctx.moveTo(position.x, position.y);
    this.ctx.lineTo(position.x , 0);
    this.ctx.strokeStyle = gridColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  draw(ratioX: number, maxX: number): void {
    const width = this.options.width;
    const height = this.options.height;
    const padding = this.options.padding || 10;

    const minX = 5;

    this.drawLine(
      {
        x: padding + padding,
        y: height - padding - 10,
      },
      {
        x: width - padding,
        y: height - padding - 10,
      }
    );

    const step = this.findStep(this.xData);

    const length = Math.floor((maxX - minX) / step) + 1;

    const labels = Array.from({ length }, (_, i) => minX + i * step);
    labels.forEach((label) => {
      this.drawTick({ x: label * ratioX, y: height - padding * 2 }, 5);
      this.drawGrid({ x: label * ratioX, y: height - padding * 2 })
      this.drawLabel(label.toString(), {
        x: label * ratioX,
        y: height - padding,
      });
    });
  }
}
