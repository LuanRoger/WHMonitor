using LibreHardwareMonitor.Hardware;

namespace TauriSharp.Monitor;

public class DynamicMonitor
{
    private readonly Computer _computer;
    private readonly IHardware? _cpu;
    private readonly IHardware? _memory;
    private readonly IHardware? _gpu;
    private readonly IHardware? _storage;
    private readonly IHardware? _network;
    
    public DynamicMonitor(Computer computer)
    {
        _computer = computer;
        _cpu = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Cpu);
        _memory = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Memory);
        _gpu = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType is 
                HardwareType.GpuNvidia or 
                HardwareType.GpuAmd or 
                HardwareType.GpuIntel);
        _storage = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Storage);
        _network = _computer.Hardware.FirstOrDefault(network => network.Name == "Wi-Fi") ?? 
                   _computer.Hardware.FirstOrDefault(network => network.HardwareType == HardwareType.Network);
    }
    
    public float? GetCpuUsage()
    {
        if (_cpu is null)
            return null;

        _cpu.Update();

        float? usage = _cpu.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
    
    public float? GetMemoryUsage()
    {
        if (_memory is null)
            return null;

        _memory.Update();

        float? usage = _memory.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
    
    public float? GetGpuUsage()
    {
        if (_gpu is null)
            return null;

        _gpu.Update();

        float? usage = _gpu.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
    
    public float? GetStorageUsage()
    {
        if (_storage is null)
            return null;

        _storage.Update();

        float? usage = _storage.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
    
    public float? GetNetworkUsage()
    {
        if (_network is null)
            return null;

        _network.Update();

        float? usage = _network.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
    
    public float? GetBatteryLevel()
    {
        IHardware? battery = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Battery);
        if (battery is null)
            return null;
        
        battery.Update();

        float? level = battery.Sensors
            .First(s => s.SensorType == SensorType.Level)
            .Value;
            
        return level;
    }
}