# WHMonitor

![demo image](https://raw.githubusercontent.com/LuanRoger/WHMonitor/main/images/demo.png)

WHMonitor (Web Hardware Monitor) is a desktop application that allows you to monitor your hardware, made with Web technologies. This project is more a proof of concept, testing the capabilities of Web technologies to integrate with native systems.

> In case you don't notice, it's very inspired by [HWMonitor](https://www.cpuid.com/softwares/hwmonitor.html).

This was implemented using the [tauri-sharp](https://github.com/LuanRoger/tauri-sharp) template, that uses [Tauri](https://v2.tauri.app) to create the desktop application (Web + Rust) and C# (ASP.NET) with a gRPC server to communicate with the Tauri layer.

> [!WARNING]
> This project is just for demo purposes, it will not be actively maintained.

## Features

- Monitor CPU, GPU, RAM.
- Monitor battery status.

## Technologies

- [Tauri 2](https://v2.tauri.app)
- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
- [gRPC](https://grpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [LibreHardwareMonitor](https://github.com/LibreHardwareMonitor/LibreHardwareMonitor)
- [React](https://react.dev)
- [Recharts](https://recharts.org/en-US)

## How to run

### Requirements

Check the requirements on the [tauri-sharp](https://github.com/LuanRoger/tauri-sharp#pre-requisites) repository.

### Running

1. Clone the repository (SSH recommended):

```bash
git clone git@github.com:LuanRoger/WHMonitor.git
```

2. Install the dependencies:

```bash
cd WHMonitor
npm install
```

3. Run the application:

```bash
npm run tauri dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/LuanRoger/WHMonitor/blob/main/LICENSE) file for details.