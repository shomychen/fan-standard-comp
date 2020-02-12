// 存储当页面中涉及多选择类型的表单的对应名称及值
export default {
  event_level: [
    {
      label: '一级',
      value: '1',
    },
    {
      label: '二级',
      value: '2',
    },
    {
      label: '三级',
      value: '3',
    },
    {
      label: '四级',
      value: '4',
    }],
  event_handle_status: [
    {
      label: '待分配',
      value: '0',
    },
    {
      label: '待处理',
      value: '1',
    },
    {
      label: '已处理',
      value: '2',
    },
  ],
  event_source: [
    {
      label: '手动添加',
      value: '0',
    },
    {
      label: '报警中心',
      value: '1',
    }],
  sys_platform: [
    {
      id: 'sp1',
      value: 'trip',
      label: '旅游管理平台',
    },
    {
      id: 'sp2',
      value: 'operation',
      label: '运营管理平台',
    },
    {
      id: 'sp3',
      value: 'ibms',
      label: 'IBMS运维管理',
    },
  ],
  yes_no: [
    {
      id: 'yn1',
      value: '1',
      label: '是',
    },
    {
      id: 'yn2',
      value: '0',
      label: '否',
    },
  ],
  delete_yes_no: [
    {
      id: 'ynd1',
      value: '1',
      label: '已删除',
    },
    {
      id: 'ynd2',
      value: '0',
      label: '未删除',
    },
  ],
  enable_disable: [
    {
      id: 'end1',
      value: '0',
      label: '停用',
    },
    {
      id: 'end2',
      value: '1',
      label: '启用',
    },
  ],
  sys_menu_type: [
    {
      id: 'end1',
      value: '0',
      label: '平台',
    },
    {
      id: 'end2',
      value: '1',
      label: '目录',
    },
    {
      id: 'end3',
      value: '2',
      label: '菜单',
    },
  ],
  alarm_category: [
    {
      id: 'end1',
      value: '0',
      label: '平台',
    },
    {
      id: 'end2',
      value: '1',
      label: '目录',
    },
    {
      id: 'end3',
      value: '2',
      label: '菜单',
    },
  ],
  alarm_status: [
    {
      id: 'as1',
      value: '1',
      label: '待处理',
    },

    {
      id: 'as2',
      value: '2',
      label: '处理中',
    },

    {
      id: 'as4',
      value: '4',
      label: '已恢复',
    },

    {
      id: 'as5',
      value: '5',
      label: '已忽略',
    },
  ],
}
