use serde::Serialize;

#[derive(serde::Serialize)]
pub struct StaticHardwareInfo {
    pub cpu: String,
    pub memory: String,
    pub network: String,
    pub graphics: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DynamicHardwareInfo {
    pub cpu_usage: f32,
    pub battery_level: f32,
    pub memory_usage: f32,
    pub gpu_usage: f32,
    pub network: f32,
}