

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
  
  destroy(): void {
    // Cleanup logic
  }
}

