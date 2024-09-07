using LibreHardwareMonitor.Hardware;
using TauriSharp.Monitor;

namespace TauriSharp;

public static class Di
{
    public static void AddStaticHardwareMonitoring(this IServiceCollection services)
    {
        services.AddSingleton<Computer>(_ =>
        {
            Computer computer = new()
            {
                IsCpuEnabled = true,
                IsMemoryEnabled = true,
                IsBatteryEnabled = true,
                IsNetworkEnabled = true,
                IsStorageEnabled = true,
                IsGpuEnabled = true
            };
            computer.Open();
            return computer;
        });

        services.AddScoped<StaticMonitor>();
        services.AddScoped<DynamicMonitor>();
    }
}