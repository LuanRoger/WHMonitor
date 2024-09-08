import { useEffect, useMemo, useState } from "react";
import { fetchStaticHardwareInfo } from "./lib/services/static-info";
import { StaticHardwareInfo } from "./lib/types/static-hardware-info";
import { listen } from "@tauri-apps/api/event";
import { DynamicHardwareInfo } from "./lib/types/dynamic-hardware-info";
import { HardwareInfoStorage } from "./lib/hardware-info-storage";
import CpuUsageCard from "./components/CpuUsageCard";
import { invoke } from "@tauri-apps/api/core";
import { Separator } from "./components/ui/separator";
import BatteryLevel from "./components/BatteryLevel";

function App() {
  const [info, setInfo] = useState<StaticHardwareInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<DynamicHardwareInfo | undefined>(
    undefined
  );
  const hardwareInfo = useMemo(() => {
    return HardwareInfoStorage.getInstance().info;
  }, [lastUpdate]);

  useEffect(() => {
    listen("dynamic-hardware-data", (event) => {
      console.log("Received dynamic hardware data", event.payload);
      setLastUpdate(event.payload as DynamicHardwareInfo);
      HardwareInfoStorage.getInstance().addInfo(
        event.payload as DynamicHardwareInfo
      );
    }).catch(console.log);
    if (!info) {
      invoke("get_dynamic_hardware_info")
    }

    fetchStaticHardwareInfo()
      .then(setInfo)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-2">
      <div className="flex flex-row-reverse w-full">
        <BatteryLevel level={lastUpdate?.batteryLevel ?? 0} />
      </div>
      <CpuUsageCard
        className="w-96"
        cpuName={info?.cpu ?? "Desconhecido"}
        hardwareInfo={hardwareInfo}
      />
    </div>
  );
}

export default App;
