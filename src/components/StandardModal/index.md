---
title: 
  zh-CN: StandardModal
  subtitle: 弹窗
---

页面上使用的新增/编辑弹窗

## API

```html
<StandardModal 
title="新增设备管理"
type="form"
size="md"

></StandardFilter>
```
### StandardModal props
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| title | 弹窗标题 | String | - |- |
| size | 弹窗大小 | String | sm |可选:sm,md,lg |
| type | 弹窗类型 | String |normal |可选normal：普通弹窗, form: 配置表单弹窗 |
| onSubmit | 点击保存（确认）,type为form时，参数中才有fields |  Function([fields]) | - |- |
| onCancel | 取消 |  Function()| - |- |
| footerButtonGroup | 弹窗按钮组，自己定义配置底部按钮组 | Array\ReactNode  | Array数据参数值查看 footerBtnGroup API|
| hideFooter |  是否隐藏底部栏 | Boolean| false |- |
| formItemGroup | 表单组 | Array  | Array数据参数值查看 formItemGroup API|
| 弃用 footerRender | 渲染弹窗按钮底部 |  Function(modalSubmit, modalCancel, props)| - |- |
| formPrefix | 表单组前置结构 |  Function(modalForm, modalProps)| - |- |
| formPostfix | 表单组后置结构 |  Function(modalForm, modalProps)| - |- |
| confirmText | 保存按钮文本 | String | '取消' | |
| cancelText | 取消按钮文本 | String | '取消' | |




### formItemGroup Array
| 参数字段      | 说明  |   类型   |必选项| 参考值|
|----------|------|-------------|------|------|
| label | 标签名称/条件名称 | String 或 ReactNode | 是 |- |
| type | 控件类型 | String | 是 | 可以选择 input/select/textarea/checkbox/custom(自定义) |
| componentStyle | 表单域样式,可设置宽度等 | Object | 否 |  |
| extra | 跟在表单域后的结构 | Function ReactNode | 否 | - |
| filedName | 控件名称 | String | 是 |参考  [getFieldDecorator(id, options) 参数](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-参数) |
| filedOptions | 控件配置项 | String | 否 |参考  [getFieldDecorator(id, options) 参数](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-参数) |
| selectOptions | 选项列表 | Array | 否 | select/radio/checkbox等使用 ,选项值：{'label': 'xxx', value: 'xxx'}|
| customRender | 必须结合 type="custom"使用 | Function(itemForm,itemData) ReactNode | 否 | - |
| required | 可结合 type="custom"使用,自定义校验规则时，可在label标签前显示* | Boolean| 否 | - |
| isHide | 是否隐藏当前配置的组件 | Boolean| 否 | - |
| protoConfig | 原生的表单控件配置或者antd对应的配置参数,例如配置 protoConfig: { disabled: true }| Object| 否 | - |

### footerBtnGroup Array

| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| name | 按钮文本 | String | 是 |
| icon | 图标类名 | String | 否 |
| type | 按钮类型 | String | 否 |
| fn | 按钮点击事件 | Function | 否 |
