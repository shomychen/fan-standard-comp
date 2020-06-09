---
menu: 配置化表单
name: RenderItemGroup 表单组
---

# 配置类表单组

> 用于通用弹窗内配置表单组

## API

```
import {RenderItemGroup} from 'fan-standard-comp';
```
### API
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| itemGroup | 表单控件配置项组 | Array | - |- |
| size | 栅格下label与控件布局比例 | String | md |可选:xs,sm,md,lg,lg |
| displayLayout | 自定义标签与控件栅格值 | Object |  |{labelCol: { span: 7 },  wrapperCol: { span: 15 },} |
| disabledAll(将弃用，使用 fieldStatus='disabled'替换)| 控件是否禁用 | Boolean | false | |
| fieldStatus | 配置化表单展示状态：“viewOnly 只显示值不显示控件”或者"disabled:控件禁用" | String | 'defalut' | |
      

### itemGroup API

| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| label | 标签显示值 | String | 是 |
| description | 描述 | String | 是 |
| type | 当前控件类型（基础类型：input\password\select等，自定义：custom，仅显示标题：title\html） | String | 是 |
| isHide | 当前控件是否显示 | Boolean | 否 |
| customRender | 自定义表单控件结构(必须配合type="custom"使用) | Function(form,item,disabledAll) | 否 
| display | 显示模式，与其他控件并列展示或者独占一行(block) | String | 否 |
