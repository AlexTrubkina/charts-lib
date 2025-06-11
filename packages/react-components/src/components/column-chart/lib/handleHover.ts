import { RefObject, MouseEvent } from "react";
import { countMax } from "../../../utils/countMax";
import { countRatio } from "../../../utils/countRatio";

export const isInsideRect = (
  mouseX: number,
  mouseY: number,
  rect: { x: number; y: number; width: number; height: number }
) => {
  return (
    mouseX >= rect.x &&
    mouseX <= rect.x + rect.width &&
    mouseY >= rect.y &&
    mouseY <= rect.y + rect.height
  );
};

export const handleMouseMove = (
  event: MouseEvent<HTMLCanvasElement>,
  ref: RefObject<HTMLCanvasElement | null>,
  coords: { x: number; y: number; color?: string }[],
  height: number,
  columnWidth: number,
  width: number
) => {
  const canvasRect = ref?.current?.getBoundingClientRect();
  if (canvasRect) {
    const mouseX = event.clientX - canvasRect.left;
    const mouseY = event.clientY - canvasRect.top;

    let hoveredRect = null;

    const maxOfY = countMax(coords, "y");
    const ratioY = countRatio(maxOfY, height - 30);

    const maxOfX = countMax(coords, "x");
    const ratioX = countRatio(maxOfX, width - 30);

    const rects = coords.map((item, index) => ({
      x: index * 15 * ratioX + 20,
      y: height - item.y * ratioY - 20,
      width: columnWidth,
      height: item.y * ratioY,
    }));

    const ctx = ref.current?.getContext("2d");

    for (let i = 0; i < rects.length; i++) {
      ctx?.clearRect(rects[i].x + 15, rects[i].y + 10, 100, 50);
      if (isInsideRect(mouseX, mouseY, rects[i])) {
        hoveredRect = rects[i];

        if (ctx) {
          drawTooltip(ctx, hoveredRect.x, hoveredRect.y);
        }
        break;
      }
    }
  }
};

const drawTooltip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.beginPath();
  ctx.fillStyle = "pink";
  ctx.strokeStyle = "pink";
  ctx.roundRect(x + 15, y + 10, 100, 50);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.font = "16px sans-serif";
  ctx.fillText("Hello world", x + 20, y + 40);
  
  ctx.fill();
  ctx.closePath();
};
