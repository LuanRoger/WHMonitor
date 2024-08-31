using LibreHardwareMonitor.Hardware;

namespace TauriSharp;

public class StaticMonitor
{
    private readonly Computer _computer;
    
    public StaticMonitor(Computer computer)
    {
        _computer = computer;
    }

    public string? GetCpuName()
    {
        IHardware? cpu = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Cpu);
        if (cpu is null)
            return null;
        
        cpu.Update();

        return cpu.Name;
    }
}