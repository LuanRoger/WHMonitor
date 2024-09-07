using LibreHardwareMonitor.Hardware;

namespace TauriSharp.Monitor;

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

    public string? GetMemoryName()
    {
        IHardware? memory = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Memory);
        if(memory is null)
            return null;
        
        memory.Update();
        
        return memory.Name;
    }

    public string? GetStorageName()
    {
        IHardware? storage = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType == HardwareType.Storage);
        if(storage is null)
            return null;
        
        storage.Update();

        return storage.Name;
    }

    public string? GetNetworkName()
    {
        var networks = _computer.Hardware
            .Where(h => h.HardwareType == HardwareType.Network);
        IEnumerable<IHardware> networksList = networks.ToList();

        IHardware? network = networksList.FirstOrDefault(network => network.Name == "Wi-Fi") ?? 
                             networksList.FirstOrDefault(network => network.HardwareType == HardwareType.Network);
        if(network is null)
            return null;
        
        network.Update();
        
        return network.Name;
    }
    
    public string? GetGpuName()
    {
        IHardware? gpu = _computer.Hardware
            .FirstOrDefault(h => h.HardwareType is 
                HardwareType.GpuNvidia or 
                HardwareType.GpuAmd or 
                HardwareType.GpuIntel);
        if(gpu is null)
            return null;
        
        gpu.Update();
        
        return gpu.Name;
    }
}