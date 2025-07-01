// packages/renderer/src/axes/XAxis.ts
import { ChartOptions } from "../types";
import { AxisBase } from "./AxisBase";

export class YAxis extends AxisBase {
  private xData: number[]

  constructor(
    ctx: CanvasRenderingContext2D,
    options: ChartOptions,
    xData: number[]
  ) {
    super(ctx, options);
    this.xData = xData;
  }

  protected drawTick(
    position: { x: number; y: number },
    length: number,
  ): void {
    const tickColor = "#000"

    this.ctx.beginPath();
    this.ctx.moveTo(position.x, position.y);
    this.ctx.lineTo(position.x + length, position.y );
    this.ctx.strokeStyle = tickColor || "#000";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  draw( maxY: number): void {
    const height = this.options.height;
    const padding = this.options.padding || 10;

    const minY = padding;

    this.drawLine(
      {
        x: padding * 2,
        y: height - padding * 2,
      },
      {
        x: padding * 2,
        y: 0,
      }
    );

    const step = this.findStep(this.xData);

    const length = Math.floor((maxY - minY) / step) + 1;

    const labels = Array.from({ length }, (_, i) => minY + i * step);

    labels.forEach((label) => {    
        const yPos =( height - (label / maxY) * height);
        this.drawTick({x: padding * 2, y: yPos + padding }, 5)
        this.drawLabel(label.toString(), {x: 7, y: yPos + padding})
    })
  }
}
