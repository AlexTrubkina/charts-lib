import { RefObject } from "react";
import { countMax } from "../../../lib/countMax";
import { countRatio } from "../../../lib/countRatio";

export const drawChart = (
  ref: RefObject<HTMLCanvasElement> | null,
  coords: { x: number; y: number }[],
  width: number,
  height: number,
  color = "#6FC6E8"
) => {
  const maxOfX = countMax(coords, "x");
  const maxOfY = countMax(coords, "y");
  const ratioX = countRatio(maxOfX, width - 30);
  const ratioY = countRatio(maxOfY, height - 30);
  if (ref && ref.current) {
    const ctx = ref.current.getContext("2d");
    drawDots(ctx, coords, ratioX, ratioY, color);
    drawLines(ctx, coords, ratioX, ratioY, color);
  }
};

const drawDots = (
  ctx: CanvasRenderingContext2D | null,
  coords: { x: number; y: number }[],
  ratioX: number,
  ratioY: number,
  color="#6FC6E8"
) => {
  if (ctx) {
    coords.forEach((coord) => {
      ctx.beginPath();
      ctx.arc(coord.x * ratioX, coord.y * ratioY, 3, 0, Math.PI * 2, true);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = color;
    });
  }
};

const drawLines = (
  ctx: CanvasRenderingContext2D | null,
  coords: { x: number; y: number }[],
  ratioX: number,
  ratioY: number,
  color="#6FC6E8"
) => {
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(coords[0].x * ratioX, coords[0].y * ratioY);
    coords.forEach((coord) => {
      ctx.lineTo(coord.x * ratioX, coord.y * ratioY);
    });

    ctx.strokeStyle = color;
    ctx.stroke();
  }
};
