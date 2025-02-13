import { RefObject, MouseEvent } from "react";
import { countMax } from "../../../lib/countMax";
import { countRatio } from "../../../lib/countRatio";

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
  ref: RefObject<HTMLCanvasElement>,
  coords: { x: number; y: number; color?: string }[],
  height: number,
  columnWidth: number, width: number
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

    const ctx = ref.current?.getContext("2d")

    for (let i = 0; i < rects.length; i++) {
      if (isInsideRect(mouseX, mouseY, rects[i])) {
        hoveredRect = rects[i];
        console.log(hoveredRect);
        
        break;
      }
    }

  }
};
