import { useEffect, useMemo, useState } from "react";
import { fetchStaticHardwareInfo } from "./lib/services/static-info";
import { StaticHardwareInfo } from "./lib/types/static-hardware-info";
import { listen } from "@tauri-apps/api/event";
import { DynamicHardwareInfo } from "./lib/types/dynamic-hardware-info";
import { HardwareInfoStorage } from "./lib/hardware-info-storage";
import CpuUsageCard from "./components/CpuUsageCard";

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
      setLastUpdate(event.payload as DynamicHardwareInfo);
      HardwareInfoStorage.getInstance().addInfo(
        event.payload as DynamicHardwareInfo
      );
    }).catch(console.log);
    fetchStaticHardwareInfo()
      .then(setInfo)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="p-2">
      <CpuUsageCard
        className="w-96"
        cpuName={info?.cpu ?? "Desconhecido"}
        hardwareInfo={hardwareInfo}
      />
    </div>
  );
}

export default App;
