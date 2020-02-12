// 常量文件：保存各个子系统对应的设备系统类别
// 视频监控
export const VIDEO_MONTIOR = 'videoSurveillance';
export const DEMO_CAMERA = 'demoCamera'; // 半球摄像机
export const BOX_CAMERA = 'boxCamera'; // 枪机摄像机
export const SPEED_DEMO_CAMERA = 'speedDemoCamera'; // 球机摄像机

// 空调系统
export const AIR_CONDITIONER = 'airConditioner';
export const COMBINED_AIR_CONDITIONING_UNIT = 'combinedAirConditioningUnit'; // 组合式空调机组
export const FRESH_AIR_UNIT = 'freshAirUnit'; // 新风机组
export const HEAT_RECOVERY_FRESH_AIR_UNIT = 'heatRecoveryFreshAirUnit'; // 热回收新风机组
export const FANCOIL_UNIT = 'fanCoilUnit'; // 风机盘管
export const VAV_BOX = 'VAV-BOX'; // VAV-BOX

// 公共广播
export const PUBLIC_BROADCAST = 'publicBroadcasting';
export const BROADCAST_LOOP = 'roadcastLoop'; // 广播回路
export const BROADCAST_HORN = 'horn'; // 喇叭

// 公共照明
export const PUBLIC_LIGHTING = 'publicLighting';
export const PUBLIC_LIGHTING_LOOP = 'publicLigthingLoop '; // 公共照明回路
export const PUBLIC_DOWN_LIGHT = 'downlight '; // 筒灯

// 智能无线
export const WIRELESS_NETWORK = 'wirelessNetwork';
export const AP_DEVICE = 'APDevice'; // AP设备
export const AC_DEVICE = 'ACDevice'; // AC设备

// 夜景照明
export const NIGHTSCAPE_LIGHTING = 'nightLight';
export const NIGHTSCAPE_FACADE_LIGHTING = 'facadeLight'; // 夜景照明-外立面

// 泛光照明
export const FLOOD_LIGHTING = 'floodLighting';
export const FLOOD_LIGHTING_LOOP = 'floodLightingLoop'; // 泛光照明回路

// 入侵防盗
export const INTRUSION_ALARM = 'intrusionAlarm';
export const INTRUSION_DEFENSE_ZONE = 'intrusionDefenseZone'; // 入侵防盗-防区
export const INFRARED_RADIATION = 'infraredRadiation'; // 入侵防盗-设备(红外对射)

// 消防报警
export const FIRE_ALARM = 'fireFighting';
export const FIRE_ALARM_ZONE = 'fireDefenseZone'; // 消防报警-防区
export const SMOKE_ALARM = 'smokeAlarm'; // 烟感报警器

// 门禁系统 大类
export const ACCESS_CONTROL = 'accessControl';
export const ACCESS_CONTROLLER = 'accessController'; // 门禁系统 -- 门禁控制器
export const ACCESS_ELECTRO_MAGNETIC_LOCK = 'electromagneticLock'; // 门禁系统 -- 电磁锁

// 电梯管理大类
export const ELEVATOR = 'elevator';
export const ELEVATOR_FREIGHT = 'freightElevator'; // 电梯管理-货梯
export const ELEVATOR_PASSENGER = 'passengerElevator'; // 电梯管理-客梯

// 给水系统
export const WATER_SUPPLY = 'waterSupply';
export const LIVING_WATER_TANK = 'livingWaterTank'; // 生活水池（箱）
export const RECLAIMED_WATER_TANK = 'reclaimedWaterTank'; // 中水水池（箱）
export const WATER_PUMP = 'waterPump'; // 水泵

// 排水系统
export const SEWERAGE = 'sewerage';
export const DRAINAGE_PUMP = 'drainagePump'; // 排水泵
export const CATCHMENT_WELL = 'catchmentWell'; // 集水井

// 送风系统
export const SUPPLY_AIR_SYSTEM = 'supplyAirSystem';
export const BLOWER = 'blower'; // 送风机

// 排风系统
export const EXHAUST_SYSTEM = 'exhaustSystem';
export const EXHAUST_FAN = 'exhaustFan'; // 排风机
export const EXHAUST_SMOKE = 'exhaustSmoke'; // 排风机兼排烟

// 变配电系统
export const POWER_DISTRIBUTION = 'powerMonitoring';

// 环境监测
export const ENVIRONMENT_MONITOR = 'environmentalMonitoring';
export const AIR_Q_SENSOR = 'airQualitySensor'; // 空气质量传感器
export const TEMP_SENSOR = 'temperatureSensor'; // 温度传感器
export const HUMIDITY_SENSOR = 'humiditySensor'; // 湿度传感器
export const CO2_SENSOR = 'co2Sensor'; // 二氧化碳传感器
export const CO_SENSOR = 'coSensor'; // 一氧化碳传感器
export const PM25_SENSOR = 'pm25Sensor'; // PM25传感器

// 远程抄表
export const METER_READING = 'meterReadingSystem';
export const WATER_METER = 'watermeter'; // 水表
export const ELECTRIC_METER = 'electricmeter'; // 电表
export const GAS_METER = 'gasmeter'; // 气表

// 信息发布
export const INFORMATION_RELEASE = 'informationReleaseSystem';

// 紧急求救
export const SOS = 'emergencyAlarm';
export const SOS_HOST = 'emergencyAlarmHost';
export const SOS_BUTTON = 'emergencyAlarmButton';

// 冷源系统
export const COLD_SOURCE = 'coldSource';
export const COLLING_TOWER = 'coolingTower'; // 冷却塔
export const COLLING_PUMP = 'coolingPump'; // 冷却泵
export const PLATE_HEAT_EXCHANGER = 'plateHeatExchanger'; // 板式热交换器
export const CHILLER = 'chiller'; // 冷水机组
export const REFRIGERATION_PIMP = 'refrigerationPump'; // 冷冻泵

// 热源系统
export const HEAT_SOURCE = 'heatSource'

// 客流分析
export const PASSENGER_FLOW = 'passengerFlow';
export const PASSENGER_CAMERA = 'passengerCamera'; // 客流分析 -- 监控摄像机

// 停车场
export const PARKING = 'parking';
export const PARKING_SPACE = 'parkingSpace'; // 车位
export const PARKING_SPACE_DETECTOR = 'parkingSpaceDetector'; // 车位检测器

// 电子发布
export const PATROL_SYSTEM = 'patrolSystem';
