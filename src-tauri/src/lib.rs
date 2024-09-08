use proto::{hardware_client::HardwareClient, DynamicHardwareRequest, StaticHardwareRequest};
use reponses::StaticHardwareInfo;
use tauri::{AppHandle, Emitter};
use tonic::transport::Channel;

pub mod connection;
pub mod proto;
pub mod reponses;

#[tauri::command]
async fn get_static_hardware_info() -> Result<StaticHardwareInfo, String> {
    let mut client = connect_using!(HardwareClient, None).await.unwrap();

    let request_data = StaticHardwareRequest {
        cpu: true,
        memory: true,
        network: true,
        graphics: true,
        disks: false,
    };
    let response = client.get_static_hardware_info(request_data).await;

    let result = match response {
        Ok(response) => {
            let reply = response.into_inner();
            let cpu_reply = reply.cpu.unwrap_or(String::new());
            let result = StaticHardwareInfo { cpu: cpu_reply };
            Ok(result)
        }
        Err(e) => Err(e.to_string().into()),
    };

    result
}

#[tauri::command]
async fn get_dynamic_hardware_info(app: AppHandle) {
    let mut client = connect_using!(HardwareClient, None).await.unwrap();

    let request = DynamicHardwareRequest {
        cpu: true,
        battery: true,
        memory: true,
        network: true,
        gpu: false,
        disk: false,
    };
    let streaming = client.get_dynamic_hardware_info(request).await.unwrap();

    let mut stream = streaming.into_inner();

    while let Some(response) = stream.message().await.unwrap() {
        let cpu = response.cpu_usage.unwrap_or(0.0);
        let battery_level = response.battery_level.unwrap_or(0.0);
        let memory = response.memory_usage.unwrap_or(0.0);
        let network = response.network_usage.unwrap_or(0.0);
        let data = reponses::DynamicHardwareInfo {
            cpu_usage: cpu,
            battery_level: battery_level,
            memory_usage: memory,
            network: network,
        };

        app.emit("dynamic-hardware-data", data).unwrap();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_static_hardware_info,
            get_dynamic_hardware_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
