import type { ChartOptions } from "../types";


export abstract class AxisBase {
  protected ctx: CanvasRenderingContext2D;
  protected options: ChartOptions;

  constructor(
    ctx: CanvasRenderingContext2D,
    options: ChartOptions,
  ) {
    this.ctx = ctx;
    this.options = options;
  }


  protected drawLine(
    start: { x: number; y: number },
    end: { x: number; y: number }
  ): void {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  protected drawLabel(
    text: string,
    position: { x: number; y: number },
    rotation: number = 0
  ): void {
    this.ctx.save();
    this.ctx.translate(position.x, position.y);
    this.ctx.rotate((rotation * Math.PI) / 180);
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#000";
    this.ctx.font = `${12}px`;
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }

  protected findStep(args: number[]): number {
    let x = args[0]
    for ( let i = 1; i < args.length; i++) {
      let y = args[i];
      while (x && y) {
        x > y ? (x %= y) : (y %= x);
      }
      x += y;
    }
    return x;
  }


}
