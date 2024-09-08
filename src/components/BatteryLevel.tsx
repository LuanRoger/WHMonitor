import { Battery, BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";

interface BatteryLevelProps {
  level: number;
}

export default function BatteryLevel({ level }: BatteryLevelProps) {
  const batteryLevel = level.toFixed(0);

  const batteryFull = <BatteryFull size={24} />;
  const batteryHalf = <BatteryMedium size={24} />;
  const batteryLow = <BatteryLow size={24} />;

  return (
    <div className="flex flex-row items-center gap-2 opacity-50 text-muted-foreground">
      {level > 75 ? batteryFull : level > 25 ? batteryHalf : batteryLow}
      <span>{batteryLevel}%</span>
    </div>
  );
}
