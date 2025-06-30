import { BaseChartRenderer } from "../core/BaseRenderer";
import { ChartOptions } from "../types";

const BASE_COLOR = "#6FC6E8";

interface ColumnRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class ColumnChartRenderer extends BaseChartRenderer {
  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    super(canvas, options);
    this.options = options;

    this.setupEventListeners();
  }

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
    //@ts-ignore
    this.addEventListener("mousemove", (e: MouseEvent) =>
      this.handleHoverColumn(e.clientX, e.clientY)
    );
  }

  handleHoverColumn(mouseX: number, mouseY: number) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const mouseXCtx = mouseX - canvasRect.left;
    const mouseYCtx = mouseY - canvasRect.top;

    const maxOfY = this.countMax("y");
    const ratioY = this.countRatio(maxOfY, this.options.height - 30);

    const maxOfX = this.countMax("x");
    const ratioX = this.countRatio(maxOfX, this.options.width - 30);

    const rects = this.options.coords.map((item, index) => ({
      x: index * 15 * ratioX + 20,
      y: this.options.height - item.y * ratioY - 20,
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
          value: rects[i].y,
        });

        this.tooltip.draw();
        return;
      }
    }
  }

  render(): void {
    this.setResolution();
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
    this.drawAxis();
  }
}
