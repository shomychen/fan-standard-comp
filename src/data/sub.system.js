/*
子系统类别
*/
export default [
  {
    name: 'accessControl',
    title: '门禁管理',
    theme: '-', // 配置颜色
    deviceTypes: [
      {
        name: 'accessController',
        title: '门禁控制器',
      },
      {
        name: 'electromagneticLock',
        title: '电磁锁',
      },
    ],
  },
  {
    name: 'passengerFlow',
    title: '门禁管理',
    deviceTypes: [
      {
        name: 'passengerCamera',
        title: '客流分析监控摄像机',
      },
    ],
  },
  {
    name: 'intrusionAlarm',
    title: '入侵报警',
    deviceTypes: [
      {
        name: 'intrusionDefenseZone',
        title: '报警防区',
      },
      {
        name: 'infraredRadiation',
        title: '红外对射',
      },
      {
        name: '-',
        title: '报警主机',
      },
      {
        name: '-',
        title: '报警按钮',
      },
    ],
  },
  {
    name: 'videoSurveillance',
    title: '视频监控',
    deviceTypes: [
      {
        name: 'demoCamera',
        title: '半球摄像机',
      },
      {
        name: 'boxCamera',
        title: '枪机摄像机',
      },
      {
        name: 'speedDemoCamera',
        title: '球机摄像机',
      },
    ],
  },
  {
    name: 'parking',
    title: '停车场',
    deviceTypes: [
      {
        name: 'parkingSpace',
        title: '车位',
      },
      {
        name: 'parkingSpaceDetector',
        title: '车位检测器',
      },
    ],
  },
  {
    name: 'elevator',
    title: '电梯',
    deviceTypes: [
      {
        name: '客梯',
        title: 'passengerElevator',
      },
      {
        name: '货梯',
        title: 'freightElevator',
      },
    ],
  },
  {
    name: 'wirelessNetwork',
    title: '无线网络',
    deviceTypes: [
      {
        name: 'APDevice',
        title: 'AP设备',
      },
      {
        name: 'ACDevice',
        title: 'AC设备',
      },
    ],
  },
  {
    name: 'publicBroadcasting',
    title: '背景音乐/公共广播',
    deviceTypes: [
      {
        name: 'broadcastLoop',
        title: '广播回路',
      },
      {
        name: 'horn',
        title: '喇叭',
      },
      {
        name: '-',
        title: '音柱',
      },
    ],
  },
  {
    name: 'fireFighting',
    title: '消防系统',
    deviceTypes: [
      {
        name: 'fireDefenseZone',
        title: '消防防区',
      },
      {
        name: 'smokeAlarm',
        title: '烟感报警器',
      },
      {
        name: '-',
        title: '报警主机',
      },
      {
        name: '-',
        title: '消火栓按钮',
      },
      {
        name: '-',
        title: '手动火灾报警按钮',
      },
      {
        name: '-',
        title: '点型感温火灾探测器',
      },
      {
        name: '-',
        title: '点型感烟火灾探测器',
      },
      {
        name: '-',
        title: '自动喷淋',
      },
      {
        name: '-',
        title: '消防广播',
      },
    ],
  },
]
