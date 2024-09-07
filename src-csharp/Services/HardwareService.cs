using Grpc.Core;
using TauriSharp.Monitor;

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
        string? cpu = request.Cpu ? _staticMonitor.GetCpuName() : null;
        string? memoryInfo = request.Memory ? _staticMonitor.GetMemoryName() : null;
        string? graphics = request.Graphics ? _staticMonitor.GetGpuName() : null;
        string? storage = request.Disks ? _staticMonitor.GetStorageName() : null;
        string? network = request.Network ? _staticMonitor.GetNetworkName() : null;

        StaticHardwareReply reply = new();
        if(cpu is not null)
            reply.Cpu = cpu;
        if(memoryInfo is not null)
            reply.Memory = memoryInfo;
        if(graphics is not null)
            reply.Graphics = graphics;
        if(storage is not null)
            reply.Disks = storage;
        if(network is not null)
            reply.Network = network;

        return Task.FromResult(reply);
    }

    public async override Task GetDynamicHardwareInfo(DynamicHardwareRequest request, IServerStreamWriter<DynamicHardwareReply> responseStream,
        ServerCallContext context)
    {
        while (!context.CancellationToken.IsCancellationRequested)
        {
            await Task.Delay(1000);
            
            float? cpuUsage = request.Cpu ? _dynamicMonitor.GetCpuUsage() : null;
            float? memoryUsage = request.Memory ? _dynamicMonitor.GetMemoryUsage() : null;
            float? gpuUsage = request.Gpu ? _dynamicMonitor.GetGpuUsage() : null;
            float? storageUsage = request.Disk ? _dynamicMonitor.GetStorageUsage() : null;
            float? networkUsage = request.Network ? _dynamicMonitor.GetNetworkUsage() : null;
            float? batteryLevel = request.Battery ? _dynamicMonitor.GetBatteryLevel() : null;
            
            DynamicHardwareReply reply = new();
            if(cpuUsage is not null)
                reply.CpuUsage = cpuUsage.Value;
            if(memoryUsage is not null)
                reply.MemoryUsage = memoryUsage.Value;
            if(gpuUsage is not null)
                reply.GpuUsage = gpuUsage.Value;
            if(storageUsage is not null)
                reply.DiskUsage = storageUsage.Value;
            if(networkUsage is not null)
                reply.NetworkUsage = networkUsage.Value;
            if(batteryLevel is not null)
                reply.BatteryLevel = batteryLevel.Value;
            
            await responseStream.WriteAsync(reply);
        }
    }
}