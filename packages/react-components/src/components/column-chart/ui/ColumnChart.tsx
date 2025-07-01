import { useEffect, useRef } from "react";
import type { ColumnChartProps } from "../types.ts";

import { ColumnChartRenderer } from "@charts-lib/renderer";
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
    console.count('[ColumnChart] ColumnChart useEffected')
    if (ref.current) {
      const columnChart = new ColumnChartRenderer(ref.current, {
        coords,
        xAxis,
        yAxis,
        chartName,
        width,
        height,
        columnColor: columnColor,
        columnWidth: columnWidth,
      });
      columnChart.render();
    }
  }, [chartName, columnColor, columnWidth, coords, height, ref, width, xAxis, yAxis]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
  
    ></canvas>
  );
};
