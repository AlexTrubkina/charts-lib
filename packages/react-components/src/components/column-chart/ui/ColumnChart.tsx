import { MouseEvent, useEffect, useRef } from "react";
import { drawAxis } from "../../../utils/drawAxis.ts";
import { drawChart } from "../lib/drawChart.ts";
import { ColumnChartProps } from "../types.ts";
import { handleMouseMove } from "../lib/handleHover.ts";
import {setResolution} from "../../../utils/setResolution.ts";
export const ColumnChart = ({
  width = 300,
  height = 300,
  columnWidth = 10,
  xAxis = true,
  yAxis = true,
  coords = [{ x: 0, y: 0 }],
  chartName = "",
  columnColor = "#6FC6E8",
}: ColumnChartProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setResolution(ref);
    drawAxis(ref, height, width, xAxis, yAxis);
    drawChart(ref, coords, height, width, columnWidth, columnColor);
  }, []);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      onMouseMove={(event: MouseEvent<HTMLCanvasElement>) =>
        handleMouseMove(event, ref, coords, height, columnWidth, width)
      }
    ></canvas>
  );
};
