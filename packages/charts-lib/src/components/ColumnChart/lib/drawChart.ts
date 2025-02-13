import { RefObject } from "react";
import { countMax } from "../../../lib/countMax";
import { countRatio } from "../../../lib/countRatio";
import { ColumnChartCoords } from "../types";

export const drawChart = (
  ref: RefObject<HTMLCanvasElement> | null,
  coords: ColumnChartCoords,
  width: number,
  height: number,
  columnWidth = 5,
  columnColor = "#6FC6E8"
) => {
  const maxOfX = countMax(coords, "x");
  const maxOfY = countMax(coords, "y");
  const ratioX = countRatio(maxOfX, width - 30);
  const ratioY = countRatio(maxOfY, height - 30);
  if (ref && ref.current) {
    const ctx = ref.current.getContext("2d");
    ctx?.clearRect;
    coords.forEach((coord, index) => {
      if (ctx) {
        drawColumn(
          ctx,
          index,
          ratioX,
          ratioY,
          coord,
          height,
          columnWidth,
          columnColor
        );
      }
    });
  }
};

const drawColumn = (
  ctx: CanvasRenderingContext2D,
  index: number,
  ratioX: number,
  ratioY: number,
  coord: { x: number; y: number; color?: string },
  height: number,
  columnWidth: number,
  columnColor: string
) => {
  ctx.beginPath()
  if (coord.color) {
    ctx.fillStyle = coord.color;
    ctx.strokeStyle = coord.color
  } else {
    ctx.fillStyle = columnColor;
    ctx.strokeStyle = columnColor;
  }
  ctx.roundRect(
    index * 15 * ratioX + 20,
    height - coord.y * ratioY - 20,
    columnWidth,
    coord.y * ratioY
  );
  ctx.fill();
  
};
