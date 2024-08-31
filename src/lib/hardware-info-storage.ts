import { DynamicHardwareInfo } from "./types/dynamic-hardware-info";
import { HardwareInfo } from "./types/hardware-info";

export class HardwareInfoStorage {
    //TODO: Made this a context
  private static instance: HardwareInfoStorage | undefined;
  static getInstance(): HardwareInfoStorage {
    if (!HardwareInfoStorage.instance) {
      HardwareInfoStorage.instance = new HardwareInfoStorage();
    }
    return HardwareInfoStorage.instance;
  }

  public info: Array<HardwareInfo>;
  private limit: number;

  constructor(limit: number = 60) {
    this.info = new Array();
    this.info.push({ info: { cpuUsage: 12 }, timestamp: Date.now() });
    this.limit = limit;
  }

  public addInfo(info: DynamicHardwareInfo) {
    this.info.push({ info, timestamp: Date.now() });
    if (this.info.length > this.limit) {
      this.info.shift();
    }
  }
}
