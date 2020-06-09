---
name: RefactorTree 组件树
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


## 限制选择同一层级数据（可以跨节点）

```
import React,{ useState } from "react";
import { RefactorTree } from 'fan-standard-comp';

const LimitTreeDemo = props => {
    const [treeCheckKeys, setTreeCheckKeys] = useState([]);
    const setTreeOptionName =  {key: 'id', title: 'name', children: 'items', disabled: 'unnormal'}
    const setLimitTreeData =  [ {
                                         name: '常规节点1',
                                         id: '1',
                                         levelType: 'level1',
                                         items: [
                                           {
                                             name: '常规节点1-1',
                                             id: '1-1',
                                             levelType: 'level2',
                                             items: [
                                               {
                                                 name: '常规节点1-1-1',
                                                 id: '1-1-1',
                                                 levelType: 'level3',
                                                 items: []
                                               },
                                               {
                                                 name: '常规节点1-1-2',
                                                 id: '1-1-2',
                                                 levelType: 'level3',
                                                 items: []
                                               }
                                             ]
                                           },
                                           {
                                             name: '常规节点1-2',
                                             id: '1-2',
                                             levelType: 'level2',
                                             items: []
                                           }
                                         ]
                                       },
                                       {
                                         name: '常规节点2',
                                         id: '2',
                                         levelType: 'level1',
                                         items: [
                                           {
                                             name: '常规节点2-1',
                                             id: '2-1',
                                             levelType: 'level2',
                                             items: []
                                           },
                                           {
                                             name: '常规节点2-2',
                                             id: '2-2',
                                             levelType: 'level2',
                                             items: []
                                           }
                                         ]
                                       },
                                       {
                                         name: '常规节点3',
                                         id: '3',
                                         levelType: 'level1',
                                         items: []
                                       }
                                     ]
     const handleTreeChecked = (checkedkeys)=> {
       setTreeCheckKeys(checkedkeys.checked);
     }
     return <RefactorTree
                showLine
                checkable
                checkStrictly
                onCheck={handleTreeChecked}
                checkedKeys={treeCheckKeys}
                optionName={{key: 'id', title: 'name', children: 'items'}}
                limitKey={'levelType'} // 指定levelType字段作为限制层级字段
                treeData={setLimitTreeData} />
};

export default LimitTreeDemo;
```



## API
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| treeData | 树数组 | Array | - |- |
| emptyDescription | 数据为空时显示的提示语 | String | '暂无数据' |
| rootName | 是否指定显示根节点名称 | String | - |
| rootKey | 指定根节点的key值 | String | - |
| optionName | 指定用于显示节点的字段名称 | Object | { key: 'key', title: 'title', children: 'children' } |
| onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}, selectedData, selectedDatas) |  |
| 其他配置 | 参考  [Tree props](https://ant.design/components/tree-cn/)  | - |-|
| limitKey | 指定树节点只允许勾选同一层级（在父子节点不相关联条件下checkStrictly=true有效）  | - |-|
