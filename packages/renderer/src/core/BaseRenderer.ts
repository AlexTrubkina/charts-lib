

// In your renderer package
interface IChartRenderer {
  render(): void;
  resize(width: number, height: number): void;
  destroy(): void;
}

export abstract class BaseChartRenderer implements IChartRenderer {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }
  
  abstract render(): void;
  
  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.render();
  }

  setResolution (): void {
    const scale = Math.max(2, window.devicePixelRatio);
    const rect = this.canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    this.canvas.width = rect.width * scale;
    this.canvas.height = rect.height * scale;

    // Scale the context to ensure correct drawing operations
    this.ctx.scale(scale, scale);

    // Set the "drawn" size of the canvas
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  drawXAxis (height: number, width: number): void {
    this.ctx.moveTo(10, height - 20);
    this.ctx.lineTo(width - 20, height - 20);
    this.ctx.strokeStyle = "#000";
    this.ctx.stroke();
  }

  drawYAxis (height: number): void {
    this.ctx.moveTo(10, 10);
    this.ctx.lineTo(10, height - 20);
  }

  
  destroy(): void {
    // Cleanup logic
  }
}

