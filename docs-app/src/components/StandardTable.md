---
name: StandardTable 表格
menu: 通用组件
---


#  通用表格组件

## 基础用法

```
import { StandardTable } from 'fan-standard-comp'
<StandardTable
title="新增设备管理"
type="form"
size="md"
rowKey='id'
 loading={queryLoading}
                data={roleData}
                columns={this.columns}
                onChange={(pagination) => refreshFetching(
                  Object.assign({
                    page: pagination.current,
                    size: pagination.pageSize
                  }, parentId ? { parentId } : {})
                )}
></StandardTable>
```
## API
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| hideOrderNumber | 是否隐藏“序号”列 | Boolean | false |- |
| orderNumber | 配置“序号列”相关参数，如{fixed: 'left'}等 | Object | {} |- |
| data | 数据源 | Object | - |{list: [], pagination: {} } |
| columns |  表格列配置| Array | - | [Column参数](https://3x.ant.design/components/table-cn/#Column) |
| onChange | 页码切换事件 |  Function(pagination)  | - |- |


## columns 列参数配置 API
| 参数字段      | 说明  |   类型   |必选项| 参考值|
|----------|------|-------------|------|------|
| title | 表头标题 | String 或 ReactNode | 是 |- |
| key | 当前列的键值 | String | 是 |  |
| dataIndex | 当前列值与数据匹配的字段名 | String | 否 |  |
| align | 	设置列的对齐方式 | String | 否 |  |
| render | 可自定义行内显示结构 | Function ReactNode | 否 | - |
| 扩展：type | 可配置当前列属于“操作列” | String | 否 | 'action' |
| 扩展：buttonGroup | 操作列的按钮配置 | Array or ReactNode or Function(参数同render, 返回值为数组) | 否 | - |

