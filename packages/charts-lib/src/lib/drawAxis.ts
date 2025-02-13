import { RefObject } from "react";

export const drawAxis = (ref: RefObject<HTMLCanvasElement> | null, width: number, height: number, xAxis=true, yAxis=true) => {
    if (ref && ref.current) {
      const ctx = ref.current.getContext("2d");
      if (xAxis) {
        drawXAxis(ctx, height, width)
      }
      if (yAxis) {
        drawYAxis(ctx, height)
      }
      if (ctx) {
        ctx.strokeStyle = "#000";
        ctx?.stroke();
      }
      
    }
};

export const drawXAxis = (ctx: CanvasRenderingContext2D | null, height: number, width: number) => {
  if (ctx) {
    ctx.moveTo(10, height - 20);
    ctx.lineTo(width - 20, height - 20);
    ctx.strokeStyle = "#000";
    ctx?.stroke();
  }
}

export const drawYAxis = (ctx: CanvasRenderingContext2D | null, height: number) => {
  if (ctx) {
    ctx.moveTo(10, 10);
    ctx.lineTo(10, height - 20);
    
  }
}