import { ChartState } from '../core/ChartState';
import { ChartOptions, HoveredItem } from '../types';

export class TooltipRenderer {
  private ctx: CanvasRenderingContext2D;
  private state: ChartState;
  private options: ChartOptions;
  private padding: number;

  constructor(ctx: CanvasRenderingContext2D, state: ChartState, options: ChartOptions) {
    this.ctx = ctx;
    this.state = state;
    this.options = options;
    this.padding = this.options.padding || 10;
  }

  removeTooltip (): void {
    const hoveredItem: HoveredItem | null = this.state.interaction.hoveredItem;
    if (!hoveredItem) return;
    const { position } = hoveredItem;
    const tooltipWidth = 120;
    const tooltipHeight = 40;

    let x = position.x + 10;
    let y = position.y - tooltipHeight - 10;
    if (x + tooltipWidth > this.options.width) {
      x = this.options.width - tooltipWidth - 5;
    }
    if (y < 5) {
      y = position.y + 20;
    }
    this.ctx.clearRect(
      x - 1,
      y - 1,
      tooltipWidth + 2,
      tooltipHeight + 2
    );
    this.state.setHoveredItem(null)
  }

  draw(): void {
    const hoveredItem: HoveredItem | null = this.state.interaction.hoveredItem;
    if (!hoveredItem) return;

    const { position, value } = hoveredItem;
    const tooltipWidth = 120;
    const tooltipHeight = 40;

    // Draw tooltip box
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;
    
    // Calculate position (avoid going off canvas)
    let x = position.x + 10;
    let y = position.y - tooltipHeight - 10;
    
    if (x + tooltipWidth > this.options.width) {
      x = this.options.width - tooltipWidth - 5;
      console.log("x2: ", x);
      
    }
    if (y < 5) {
      y = position.y + 20;
    }

    // Draw rounded rectangle
    this._drawRoundedRect(x, y, tooltipWidth, tooltipHeight, 4);
    
    // Draw text
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Value: ${value.toFixed(2)}`, x + this.padding, y + this.padding * 2);
  }

  private _drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}