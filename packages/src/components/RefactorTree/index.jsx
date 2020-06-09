// 重构树控件，可直接配置数据
import React, { useEffect, useState, } from 'react';
import { Icon, Tree, Empty, Popconfirm } from 'antd';

const { TreeNode } = Tree;
import './index.less'

const RefactorTree = props => {
  const {
    treeData, rootName, rootKey, rootIcon, emptyDescription,
    optionName = { key: 'key', title: 'title', children: 'children', disabled: 'disabled' },
    defaultSelectedKeys,
    nodeItemReset, // 针对将当前节点的值进行更新，如图标或disabled状态
    nodeExtra,
    selectable = true,
    nodeControl, // 是否显示操作按钮组
    limitKey,
    checkedKeys,
    checkStrictly,
    ...otherProps
  } = props;
  // 重新组合指定数据源字段 （limitKey：用于限制只能选择指定同一层级的数据）
  const { title, key, children, disabled } = Object.assign({ key: 'key', title: 'title', children: 'children', disabled: 'disabled' }, optionName)
  const [dataList, setDataList] = useState([])
  // 限制节点选中条件下更新列表数据
  const resetDataWithLimit = (hasKeys, list, resultList) => {
    // 利用ID匹配对应选中的完整节点数据
    const filterCheckedNode = (ids, preList, matchList) => {
      if (Array.isArray(preList) && preList.length > 0) {
        preList.forEach((item, i) => {
          if (ids.includes(item[key])) {
            matchList.push({
              ...item
            })
          }
          filterCheckedNode(ids, item[children], matchList);
        })
      }
    }

    // 筛选同一层级可选择，其他层级数据不可选择（限制按指定字段名的层级数据）
    const filterResetSameLevel = (preList, resData, matchData) => {
      if (Array.isArray(preList) && preList.length > 0) {
        preList.forEach((item, i) => {
          resData[i] = {
            ...item
          };
          resData[i].isLimit = item[limitKey] !== matchData// [limitKey];
          const newDeepArr = [];
          filterResetSameLevel(item[children], newDeepArr, matchData);
          resData[i][children] = newDeepArr;
        })
      }
    }
    const matchItems = []
    filterCheckedNode(hasKeys, list, matchItems) // 先筛选出来选中节点的数据，取其中的 level 层级的值(数据必须保证同级类型值一致)
    if (matchItems.length > 0) {
      filterResetSameLevel(list, resultList, matchItems[0][limitKey])
    }
  }

  useEffect(() => {
    // 有配置limitKey指定限制同级节点时，添加判断节点选择限制(在父子节点不相关联条件下使用checkStrictly=true)
    if (checkStrictly && limitKey && checkedKeys) {
      if (Array.isArray(checkedKeys) && checkedKeys.length > 0 || Array.isArray(checkedKeys.checked) && checkedKeys.checked.length > 0) {
        const resetList = []
        resetDataWithLimit(checkedKeys.checked || checkedKeys, treeData, resetList)
        setDataList(resetList)
      } else {
        setDataList(treeData || [])
      }
    } else {
      setDataList(treeData || []) // 默认状态直接赋值传进来的数据
    }
  }, [treeData, checkedKeys])

  const handleToSelectTreeNode = (key, e) => {
    const { onSelect } = props;
    const multiSelectedData = [];
    e.selectedNodes.map(item => multiSelectedData.push(item.props.dataRef)) // 多选条件下,当前选中所有节点数据
    onSelect && onSelect(key, e, e.node.props.dataRef, multiSelectedData)
  }


  const handleToCheckTreeNode = (keys, e) => {
    const { onCheck } = props;
    const currentDate = e.node.props.dataRef;
    const multiCheckedData = [];
    e.checkedNodes.map(item => multiCheckedData.push(item.props.dataRef)) // 多选条件下,当前选中所有节点数据
    onCheck && onCheck(keys, e, currentDate, multiCheckedData)
  }

  const handleNodeControl = (e, type, nodeData) => {
    e.stopPropagation()
    const { onEdit, onDelete } = nodeControl;
    if (type === 'edit') {
      onEdit && onEdit(nodeData)
    }
    if (type === 'delete') {
      onDelete && onDelete(nodeData)
    }
  }
  // const <Icon type={selected ? 'frown' : 'frown-o'} />
  const renderNodeTitle = (item) => {
    return <>
      {(nodeItemReset && nodeItemReset(item).icon) || (item.icon ? <Icon type={item.icon}></Icon> : null)} {item[title]}
      {
        nodeControl ? <span className="treeControl">
         <a onClick={(e) => {
           handleNodeControl(e, 'edit', item)
         }}><Icon type={'edit'} /></a>
          <Popconfirm
            placement={'top'}
            title={`确定要删除：${item[title]}吗？`}
            icon={<Icon type="question-circle-o" />}
            onConfirm={(e) => {
              handleNodeControl(e, 'delete', item)
            }}
          >
         <a onClick={(e) => e.stopPropagation()}><Icon type={'delete'} /></a>
          </Popconfirm>
        </span> : null
      }
      {nodeExtra && nodeExtra}
    </>
  }
  const renderTreeNodes = data => data.map((item) => {
    if (item[children]) {
      return (
        <TreeNode {...item}
                  title={renderNodeTitle(item)} key={item[key]}
                  className={selectable ? '' : "notPointer"}
                  disabled={item.isLimit || (nodeItemReset && nodeItemReset(item).disabled) || item[disabled]}
                  dataRef={item}
        >
          {renderTreeNodes(item[children])}
        </TreeNode>
      );
    }
    return <TreeNode {...item}
                     title={renderNodeTitle(item)} key={item[key]}
                     className={selectable ? '' : "notPointer"}
                     disabled={item.isLimit || (nodeItemReset && nodeItemReset(item).disabled) || item[disabled]}
                     dataRef={item} />;
  });

  if (dataList.length == 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDescription} />
  let defExpand = []
  if (defaultSelectedKeys && defaultSelectedKeys.length > 0) {
    defExpand = defaultSelectedKeys
  } else {
    defExpand = rootKey ? [rootKey] : ['0']
  }
  return (
    <Tree
      // switcherIcon={<Icon type="down" />}
      defaultExpandedKeys={defExpand}
      defaultSelectedKeys={defaultSelectedKeys}
      selectable={selectable}
      checkedKeys={checkedKeys}
      checkStrictly={checkStrictly}
      {...otherProps}
      onSelect={handleToSelectTreeNode}
      onCheck={handleToCheckTreeNode}
    >
      {
        rootName ? (<TreeNode title={rootName} key={rootKey || '0'}
                              className={selectable ? '' : "notPointer"}
                              icon={rootIcon || null}>
            {renderTreeNodes(dataList)}
          </TreeNode>)
          : renderTreeNodes(dataList)
      }

    </Tree>
  )
};

export default RefactorTree;
