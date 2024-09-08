import { HardwareInfo } from "@/lib/types/hardware-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MemoryStick, Network } from "lucide-react";
import UsageChart from "./UsageChart";

interface NetworkCardProps {
  networkName: string;
  hardwareInfo: HardwareInfo[];
  className?: string;
}

export default function NetworkCard({
  networkName,
  hardwareInfo,
  className,
}: NetworkCardProps) {
  const lastInfo = hardwareInfo[hardwareInfo.length - 1];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          <h1>Network</h1>
          <Network />
        </CardTitle>
        <CardDescription className="flex flex-row justify-between">
          {networkName}
          <span className="text-2xl text-foreground font-bold">
            {lastInfo.info.network.toFixed(0)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsageChart
          data={hardwareInfo.map((info) => ({
            timestamp: info.timestamp,
            value: info.info.network,
          }))}
        />
      </CardContent>
    </Card>
  );
}
