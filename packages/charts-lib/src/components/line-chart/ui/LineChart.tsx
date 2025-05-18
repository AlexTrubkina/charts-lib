import { useEffect, useRef } from "react";
import { LineChartProps } from "../types";
import { drawAxis } from "../../../utils/drawAxis";
import { drawChart } from "../lib/drawChart";
import {setResolution} from "../../../utils/setResolution.ts";

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
    setResolution(ref);
    drawAxis(ref, height, width, xAxis, yAxis);
    drawChart(ref, coords, width, height);
  }, []);

  return <canvas ref={ref} width={width} height={height}></canvas>;
};

