using LibreHardwareMonitor.Hardware;

namespace TauriSharp;

public static class Di
{
    public static void AddStaticHardwareMonitoring(this IServiceCollection services)
    {
        services.AddSingleton<Computer>(_ =>
        {
            Computer computer = new()
            {
                IsCpuEnabled = true
            };
            computer.Open();
            return computer;
        });

        services.AddScoped<StaticMonitor>();
        services.AddScoped<DynamicMonitor>();
    }
}