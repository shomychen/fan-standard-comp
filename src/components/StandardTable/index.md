---
name: StandardTable
---


##  通用表格组件

## 基本用法

```
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
### StandardTable props
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| hideOrderNumber | 是否隐藏显示序号 | Boolean | false |- |
| data | 数据源 | Object | - |{list: [], pagination: {} } |
| columns |  表格列配置| Array | - |[{ title: '序号', key: 'orderNum', render: ()=> {} }] |
| onChange | 页码切换事件 |  Function(pagination)  | - |- |


