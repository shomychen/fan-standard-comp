---
name: ButtonGroup 按钮组
menu: 通用组件
---

# 按钮组

> 用于通用表格、筛选组件内的按钮组，展示超出指定个数后进行折叠


## API
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| type | 展示为按钮或文本 | String | button | 可选值 button,text|
| options | 按钮组列表，数据字段参考[group API] |  Array<{ name: string, code: string, disabled?: boolean , isHide?: boolean }> | - |- |
| codes | 功能权限数据| Array | - | - |
| permissionCodes | 当前有权限的按钮code值组合 | Array | - | `["codeBtnDetail", "codeBtnDetail"]` |
| min | 最小可展示按钮数量 | Number | 3 | 不得低于1 |
        

## options API

| 参数字段      | 说明  |   类型   |必选项| 参考值|
|----------|------|-------------|------|------|
| name |  名称 | String | 是 | |
| code | 指定按钮权限code | String | 否 | -|
| exName | 优先与code与name 默认匹配名称 | String | 否 | |
| isHide | 是否隐藏 | Boolean/Function()| 否 | 表格操作列的Function参数是(text,record,index) |
| children | 是否显示成多级层级数据 | Array| 否 |  |
| icon | 指定按钮图标 | String(antd内有的图标类名)/ReactNode（可使用SpecIcon图标结构） | 否 | -|


