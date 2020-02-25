---
menu: 通用组件
name: StandardTable
---

import { Button , Divider} from 'antd';
import { Playground } from 'docz';
import { StandardPanel, StandardTable } from "fan-standard-comp";

#  通用表格组件
##  基础用法
<Playground>
 {() => {
    const [counter, setCounter] = React.useState(0)
  const columns = [
    {
      title: '功能名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '功能代码',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: '启用',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (text) => text === 'Y' ? '是' : '否',
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      render: (text, record, index) => (
        <>
          <a onClick={() => handleControlType('edit', text, index)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleControlType('delete', text, index)}>删除</a>
        </>
      ),
    },
  ];
  const tableData =  [
                        {
                          "id": "func0",
                          "name": "删除",
                          "code": "btnDelete",
                          "funcUrl": "/system/menu",
                          "status": "Y",
                          "sorts": "0",
                          "isIn": "N",
                          "isShow": "N",
                          "progress": "ing"
                        },
                        {
                          "id": "func1",
                          "name": "新增",
                          "code": "btnAdd",
                          "funcUrl": "/system/menu",
                          "status": "N",
                          "sorts": "0",
                          "isIn": "Y",
                          "isShow": "N",
                          "progress": "fail"
                        }
                      ]
    return (
     <>
  <Button scale="small" type="primary">Click me</Button>
  <StandardTable  columns={columns} data={{list: tableData}}></StandardTable>
     </>
    )
  }}
</Playground>

## 基本用法

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
| hideOrderNumber | 是否隐藏显示序号 | Boolean | false |- |
| data | 数据源 | Object | - |{list: [], pagination: {} } |
| columns |  表格列配置| Array | - |[{ title: '序号', key: 'orderNum', render: ()=> {} }] |
| onChange | 页码切换事件 |  Function(pagination)  | - |- |


