---
name: FieldComponent
---

# 配置类表单基础控件

常用于通用筛选表单及通用弹窗内

## API

```

import {FieldComponent} from '@/components/FormComp';

```
### StandardModal props
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| type | 表单控件类型 | String | - |- |
| value | 表单控件值 | String/Array | - |- |
| style | 表单控件样式 | Object | - |- |
| protoConfig | 表单控件原生属性配置,或antd对应组件的配置项 | Object | - |- |
| selectOptions | 用于'select'\'checkbox'等多选项数据源 | Array | - |- |
| selectOptionName | 指定'select'\'checkbox'结构的数据字段 | Object |  {  value: 'value', label: 'label', disabled: 'disabled'} |- |
| treeData | 'tree-select'数据源 | Array | - |- |
| treeOptionName | 指定'tree-select'结构的数据字段 | Object |  { title: 'title', value: 'value', children: 'children' } |- |
| onChange | 控件触发更新事件 | Function |   |- |

