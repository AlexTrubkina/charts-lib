import { BaseChartRenderer } from "../core/BaseRenderer";
import type { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

interface ColumnRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ColumnChartRenderer extends BaseChartRenderer {

  private padding = this.options.padding || 10

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas, options);
    this.options = options;

    this.setupEventListeners();
  }

  drawColumn(
    coord: { x: number; y: number; color?: string },
    ratioX: number,
    maxY: number
  ): void {
    this.ctx.beginPath();
    if (coord.color) {
      this.ctx.fillStyle = coord.color;
      this.ctx.strokeStyle = coord.color;
    } else {
      this.ctx.fillStyle = this.options.columnColor || BASE_COLOR;
      this.ctx.strokeStyle = this.options.columnColor || BASE_COLOR;
    }
    const x1 = coord.x * ratioX - this.padding;
    const x2 =  (coord.x * ratioX - this.padding) + this.options.columnWidth;
    const y1 = this.options.height - (coord.y / maxY) * this.options.height;
    const y2 = this.options.height - this.padding * 2;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x1, y2)
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(x2, y1);
    this.ctx.lineTo(x1, y1);
    this.ctx.fill();
    this.ctx.closePath()
  }

  setUpAxes(): void {
    if (this.options.xAxis) {
      this.drawXAxis()
    }
    if (this.options.yAxis) {
      this.drawYAxis();
    }
  }

  isInsideRect(mouseX: number, mouseY: number, rect: ColumnRect) {
    return (
      mouseX >= rect.x &&
      mouseX <= rect.x + rect.width &&
      mouseY >= rect.y &&
      mouseY <= rect.y + rect.height
    );
  }

  private setupEventListeners(): void {
    // Mouse move for tooltips
    this.addEventListener("mousemove", (e: Event) => {
      if (e instanceof MouseEvent) {
        this.handleHoverColumn(e.clientX, e.clientY)
      }
    }
    );
  }

  handleHoverColumn(mouseX: number, mouseY: number) {
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
      this.render()
      if (
        this.isInsideRect(mouseXCtx, mouseYCtx, rects[i]) &&
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
    const width = this.options.width;
    const maxOfX = this.countMax("x");
    const maxOfY = this.countMax("y");
    const ratioX = this.countRatio(maxOfX, width - this.padding);
    this.ctx.clearRect;
    this.options.coords.forEach((coord) => {
      this.drawColumn(coord, ratioX, maxOfY);
    });
    this.setUpAxes();
  }
}
