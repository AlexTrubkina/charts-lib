import { BaseChartRenderer } from "../core/BaseRenderer";
import type { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

export class LineChartRenderer extends BaseChartRenderer {
  private maxOfY = this.countMax("y");
  private padding = this.options.padding || 10;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas, options);
    this.options = options;

    this.setupEventListeners();
  }

  drawDots(ratioX: number, color = BASE_COLOR) {
    this.options.coords.forEach((coord) => {
      this.ctx.beginPath();
      this.ctx.arc(
        coord.x * ratioX,
        this.options.height - (coord.y / this.maxOfY) * this.options.height,
        3,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.strokeStyle = color;
    });
  }

  drawLines(ratioX: number, color = BASE_COLOR) {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.options.coords[0].x * ratioX,
      this.options.height -
        (this.options.coords[0].y / this.maxOfY) * this.options.height
    );
    this.options.coords.forEach((coord) => {
      this.ctx.lineTo(
        coord.x * ratioX,
        this.options.height - (coord.y / this.maxOfY) * this.options.height
      );
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

  private setupEventListeners(): void {
    // Mouse move for tooltips
    this.addEventListener("mousemove", (e: Event) => {
      if (e instanceof MouseEvent) {
        this.handleHoverPoint(e.clientX, e.clientY);
      }
    });
  }

  private isOnPoint(
    mouseX: number,
    mouseY: number,
    rect: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ) {
    return (
      mouseX >= rect.x &&
      mouseX <= rect.x + rect.width &&
      mouseY >= rect.y &&
      mouseY <= rect.y + rect.height
    );
  }

  handleHoverPoint(mouseX: number, mouseY: number) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const mouseXCtx = mouseX - canvasRect.left;
    const mouseYCtx = mouseY - canvasRect.top;

    const maxOfY = this.countMax("y");
    const ratioY = this.countRatio(maxOfY, this.options.height - this.padding);

    const maxOfX = this.countMax("x");
    const ratioX = this.countRatio(maxOfX, this.options.width - this.padding);

    const rects = this.options.coords.map((item) => ({
      x: item.x * ratioX - this.padding,
      y: this.options.height - (item.y / maxOfY) * this.options.height,
      width: this.options.columnWidth,
      height: item.y * ratioY,
    }));

    for (let i = 0; i < rects.length; i++) {
      this.tooltip.removeTooltip();
      this.render();
      if (
        this.isOnPoint(mouseXCtx, mouseYCtx, rects[i]) &&
        this.state.interaction.hoveredItem?.position.x !== rects[i].x
      ) {
        this.state.setHoveredItem({
          position: {
            x: rects[i].x,
            y: rects[i].y,
          },
          value: this.options.coords[i].y,
        });

        this.tooltip.draw();
        return;
      }
    }
  }

  render(): void {
    this.setResolution();
    const width = this.options.width || 300;
    const color = this.options.columnColor || BASE_COLOR;
    const maxOfX = this.countMax("x");
    const ratioX = this.countRatio(maxOfX, width - this.padding);
    this.ctx.clearRect;
    this.setUpAxes();
    this.drawDots(ratioX, color);
    this.drawLines(ratioX, color);
  }
}
