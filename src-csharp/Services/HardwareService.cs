using Grpc.Core;

namespace TauriSharp.Services;

public class HardwareService : Hardware.HardwareBase
{
    private readonly StaticMonitor _staticMonitor;
    private readonly DynamicMonitor _dynamicMonitor;

    public HardwareService(StaticMonitor staticMonitor, DynamicMonitor dynamicMonitor)
    {
        _staticMonitor = staticMonitor;
        _dynamicMonitor = dynamicMonitor;
    }
    
    public override Task<StaticHardwareReply> GetStaticHardwareInfo(StaticHardwareRequest request, ServerCallContext context)
    {
        string? cpu = _staticMonitor.GetCpuName();

        StaticHardwareReply reply = new()
        {
            Cpu = cpu
        };

        return Task.FromResult(reply);
    }

    public async override Task GetDynamicHardwareInfo(DynamicHardwareRequest request, IServerStreamWriter<DynamicHardwareReply> responseStream,
        ServerCallContext context)
    {
        while (!context.CancellationToken.IsCancellationRequested)
        {
            await Task.Delay(1000);
            float usage = _dynamicMonitor.StreamCpuUsage();
            DynamicHardwareReply reply = new()
            {
                CpuUsage = usage
            };
            await responseStream.WriteAsync(reply);
        }
    }
}