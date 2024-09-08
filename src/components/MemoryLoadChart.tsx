import { toPercent } from "@/lib/utils/math";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface CpuUsageChartProps {
  data: Array<{ timestamp: number; value: number }>;
}

export default function MemoryLoadChart({ data }: CpuUsageChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          max={100}
          tickFormatter={(value) => new Date(value).toLocaleTimeString()}
        />
        <YAxis amplitude={100} tickFormatter={toPercent} />
        <Area
          dataKey="value"
          isAnimationActive={false}
          type={"stepAfter"}
          fill="var(--color-chart-3)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
