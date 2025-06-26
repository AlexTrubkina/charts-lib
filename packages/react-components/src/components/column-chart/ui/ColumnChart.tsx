import { useEffect, useRef } from "react";
import { ColumnChartProps } from "../types.ts";

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
  }, [ref, ref.current]);

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
  
    ></canvas>
  );
};
