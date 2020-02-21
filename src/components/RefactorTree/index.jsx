import React from 'react';
import { Icon, Tree, Empty, Popconfirm } from 'antd';

const { TreeNode } = Tree;
import styles from './index.less'

const RefactorTree = props => {
  const {
    treeData, rootName, rootKey, rootIcon, emptyDescription,
    optionName = { key: 'key', title: 'title', children: 'children', disabled: 'disabled' },
    defaultSelectedKeys,
    nodeItemReset, // 针对将当前节点的值进行更新，如图标或disabled状态
    nodeExtra,
    selectable = true,
    nodeControl, // 是否显示操作按钮组
    ...otherProps
  } = props;
  // 重新组合指定数据源字段
  const { title, key, children, disabled } = Object.assign({ key: 'key', title: 'title', children: 'children', disabled: 'disabled' }, optionName)
  const handleToSelectTreeNode = (key) => {
    const { onSelect } = props;
    onSelect && onSelect(key)
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
        <TreeNode title={renderNodeTitle(item)} key={item[key]}
                  className={selectable ? '' : styles.notPointer}
                  disabled={(nodeItemReset && nodeItemReset(item).disabled) || item[disabled]}
                  dataRef={item}
        >
          {renderTreeNodes(item[children])}
        </TreeNode>
      );
    }
    return <TreeNode title={renderNodeTitle(item)} key={item[key]}
                     className={selectable ? '' : styles.notPointer}
                     disabled={(nodeItemReset && nodeItemReset(item).disabled) || item[disabled]}
                     dataRef={item} />;
  });

  if (!treeData || treeData.length == 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyDescription} />
  let defExpand = []
  if (defaultSelectedKeys && defaultSelectedKeys.length > 0) {
    defExpand = defaultSelectedKeys
  } else {
    defExpand = rootKey ? [rootKey] : ['0']
  }
  return (
    <Tree
      onSelect={handleToSelectTreeNode}
      switcherIcon={<Icon type="down" />}
      defaultExpandedKeys={defExpand}
      defaultSelectedKeys={defaultSelectedKeys}
      selectable={selectable}
      {...otherProps}
    >
      {
        rootName ? (<TreeNode title={rootName} key={rootKey || '0'}
                              className={selectable ? '' : styles.notPointer}
                              icon={rootIcon || null}>
            {renderTreeNodes(treeData)}
          </TreeNode>)
          : renderTreeNodes(treeData)
      }

    </Tree>
  )
};

export default RefactorTree;
