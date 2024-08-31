import { invoke } from "@tauri-apps/api/core";
import { StaticHardwareInfo } from "../types/static-hardware-info";

const getStaticHardwareInfoKey: string = "get_static_hardware_info"

export async function fetchStaticHardwareInfo(): Promise<StaticHardwareInfo> {
  const result = await invoke(getStaticHardwareInfoKey);
  return result as StaticHardwareInfo;
}