---
name: tree 树
menu: 数据展示
---


# 树组件

常用于页面栅格结构的左侧树

## 基本用法

```
import { RefactorTree } from 'fan-standard-comp';
const handleTreeSelect = (key) => {
    message.info('选择树节点ID：' + key.join(','))
}
const setTreeOptionName =  {key: 'id', title: 'name', children: 'items', disabled: 'unnormal'}
const setTreeData =  [
                       {
                         name: '常规节点1',
                         unnormal: true,
                         id: '1',
                         items: [
                           {
                             name: '常规节点1-1',
                             unnormal: true,
                             id: '1-1',
                             items: []
                           },
                           {
                             name: '常规节点1-2',
                             id: '1-2',
                             items: []
                           }
                         ]
                       },
                         {
                           name: '常规节点2',
                           id: '2',
                           items: [
                             {
                               name: '常规节点2-1',
                               id: '2-1',
                               items: []
                             },
                             {
                               name: '常规节点2-2',
                               id: '2-2',
                               items: []
                             }
                           ]
                         }
                     ]
<RefactorTree onSelect={handleTreeSelect}
          defaultSelectedKeys={['1-2']}
          optionName={setTreeOptionName}
          treeData={setTreeData}/>
```
## API
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| treeData | 树数组 | Array | - |- |
| emptyDescription | 数据为空时显示的提示语 | String | '暂无数据' |
| rootName | 是否指定显示根节点名称 | String | - |
| rootKey | 指定根节点的key值 | String | - |
| optionName | 指定用于显示节点的字段名称 | Object | { key: 'key', title: 'title', children: 'children' } |
| onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}, selectedData) |  |
| 其他配置 | 参考  [Tree props](https://ant.design/components/tree-cn/)  | - |-|
