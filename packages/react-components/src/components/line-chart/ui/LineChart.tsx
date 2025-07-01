import { useEffect, useRef } from "react";
import type { LineChartProps } from "../types";
import {LineChartRenderer} from '@charts-lib/renderer'


export const LineChart = ({
  coords = [{ x: 0, y: 0 }],
  xAxis = true,
  yAxis = true,
  chartName = "",
  width = 300,
  height = 300,
  color="#6FC6E8"
}: LineChartProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.count('[LineChart] LineChart useEffected')
    if (ref.current) {
      const lineChart = new LineChartRenderer(ref.current, {
        coords, 
        xAxis,
        yAxis,
        chartName,
        width,
        height,
        columnColor: color,
        columnWidth: 10
      })
      lineChart.render()
    }
    
  }, [ref, coords, xAxis, yAxis, chartName, width, height, color]);

  return <canvas ref={ref} width={width} height={height}></canvas>;
};

