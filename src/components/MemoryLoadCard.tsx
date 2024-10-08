import { Cpu, MemoryStick } from "lucide-react";
import UsageChart from "./UsageChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HardwareInfo } from "@/lib/types/hardware-info";

interface MemoryLoadCardProps {
  memoryName: string;
  hardwareInfo: HardwareInfo[];
  className?: string;
}

export default function MemoryLoadCard({
  memoryName,
  hardwareInfo,
  className,
}: MemoryLoadCardProps) {
  const lastInfo = hardwareInfo[hardwareInfo.length - 1];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <h1>RAM</h1>
          <MemoryStick />
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
          {memoryName}
          <span className="text-2xl text-foreground font-bold">
            {lastInfo.info.memoryUsage.toFixed(0)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsageChart
          data={hardwareInfo.map((info) => ({
            timestamp: info.timestamp,
            value: info.info.memoryUsage,
          }))}
        />
      </CardContent>
    </Card>
  );
}
