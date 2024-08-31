using LibreHardwareMonitor.Hardware;

namespace TauriSharp;

public class DynamicMonitor
{
    private readonly Computer _computer;
    private readonly IHardware? _cpu;
    
    public DynamicMonitor(Computer computer)
    {
        _computer = computer;
        _cpu = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Cpu);
    }
    
    public float StreamCpuUsage()
    {
        if (_cpu is null)
            throw new InvalidOperationException("CPU hardware not found");

        _cpu.Update();

        float? usage = _cpu.Sensors
            .First(s => s.SensorType == SensorType.Load)
            .Value;
            
        return usage ?? 0f;
    }
}