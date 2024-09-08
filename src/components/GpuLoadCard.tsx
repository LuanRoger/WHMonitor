import { Box } from "lucide-react";
import UsageChart from "./UsageChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HardwareInfo } from "@/lib/types/hardware-info";

interface GpuLoadCardProps {
  gpuName: string;
  hardwareInfo: HardwareInfo[];
  className?: string;
}

export default function GpuLoadCard({
  gpuName,
  hardwareInfo,
  className,
}: GpuLoadCardProps) {
  const lastInfo = hardwareInfo[hardwareInfo.length - 1];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <h1>GPU</h1>
          <Box />
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
          {gpuName}
          <span className="text-2xl text-foreground font-bold">
            {lastInfo.info.gpuUsage.toFixed(0)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsageChart
          data={hardwareInfo.map((info) => ({
            timestamp: info.timestamp,
            value: info.info.gpuUsage,
          }))}
        />
      </CardContent>
    </Card>
  );
}
