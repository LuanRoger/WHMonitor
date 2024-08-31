import { Cpu } from "lucide-react";
import CpuUsageChart from "./CpuUsageChart";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { HardwareInfo } from "@/lib/types/hardware-info";

interface CpuUsageCardProps {
    cpuName: string;
    hardwareInfo: HardwareInfo[];
    className?: string;
}

export default function CpuUsageCard({ cpuName, hardwareInfo, className }: CpuUsageCardProps) {
    const lastInfo = hardwareInfo[hardwareInfo.length - 1];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <h1>CPU</h1>
          <Cpu />
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
        {cpuName}
        <span className="text-2xl text-foreground font-bold">{lastInfo.info.cpuUsage.toFixed(0)}%</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CpuUsageChart
          data={hardwareInfo.map((info) => ({
            timestamp: info.timestamp,
            value: info.info.cpuUsage,
          }))}
        />
      </CardContent>
    </Card>
  );
}
