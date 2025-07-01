import { XAxis } from "../axes/XAxis";
import { YAxis } from "../axes/YAxis";
import { TooltipRenderer } from "../plugins/TooltipRenderer";
import { ChartOptions } from "../types";
import { ChartState } from "./ChartState";

// In your renderer package
interface IChartRenderer {
  render(): void;
  resize(width: number, height: number): void;
  destroy(): void;
}

export abstract class BaseChartRenderer implements IChartRenderer {
  protected canvas: HTMLCanvasElement;
  protected ctx: CanvasRenderingContext2D;
  protected state: ChartState;
  protected options: ChartOptions;
  protected tooltip: TooltipRenderer;
  private _eventListeners: Array<[string, any]> = [];
  protected XAxis: XAxis;
  protected YAxis: YAxis

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.state = new ChartState(options);
    this.options = options;
    this.tooltip = new TooltipRenderer(this.ctx, this.state);
    this.XAxis = new XAxis(
      this.ctx,
      this.options,
      this.options.coords.map((i) => i.x)
    );
    this.YAxis = new YAxis(
      this.ctx,
      this.options,
      this.options.coords.map((i) => i.y)
    )
  }

  countMax(coord: "x" | "y") {
    const coordsArray = this.options.coords.map((item) => item[coord]);
    return Math.max.apply(null, coordsArray);
  }

  countRatio = (maxCoord: number, graphSize: number) => {
    return graphSize / maxCoord;
  };

  abstract render(): void;

  resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.render();
  }

  setResolution(): void {
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

  protected addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions
  ): void {
    this.canvas.addEventListener(type, listener, options);
    this._eventListeners.push([type, listener]);
  }

  drawXAxis(): void {
      const maxX = this.countMax("x") 
      const ratioX = this.countRatio(maxX, this.options.width - 10);
      this.XAxis.draw(ratioX, maxX);
  }

  drawYAxis(): void {
    const maxY = this.countMax("y") 
    const ratioY = this.countRatio(maxY, this.options.height + 10);
    this.YAxis.draw(ratioY, maxY);
  }

  public update(options?: ChartOptions): void {
    if (options) this.state.setOptions(options);
    this.render();
  }

  destroy(): void {
    // Cleanup logic
  }
}
