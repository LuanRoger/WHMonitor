use serde::Serialize;

#[derive(serde::Serialize)]
pub struct StaticHardwareInfo {
    pub cpu: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DynamicHardwareInfo {
    pub cpu_usage: f32,
}