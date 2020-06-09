import React, { useRef, useState, useEffect } from "react";
import { TreeSelect, } from "antd";
import './index.less'
import { getParentNodes } from '../../utils'

const { TreeNode } = TreeSelect;


const RefactorTreeSelect = React.forwardRef((props, ref) => {
  const {
    treeData = [], value,
    showFullLevel, // 显示完整的层级名称
    separator = '/', // 用于分割层级名称分割符
    disabled,
    fieldStatus, // 是否只显示文本
    treeOptionName = { title: 'title', value: 'value', children: 'children' },
    placeholder, protoTreeNode, onSelect, ...otherProps
  } = props;
  const [fullLevelName, setFullLevelName] = useState(null)
  const renderTreeNode = (data, dataOptionName, nodeProps) => data.map((item) => {
    if (item[dataOptionName.children] && item[dataOptionName.children].length > 0) {
      return (
        <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]} {...nodeProps}>
          {renderTreeNode(item[dataOptionName.children], dataOptionName)}
        </TreeNode>
      );
    }
    return <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]}  {...nodeProps} />;
  });
  useEffect(() => {
    if (value) {
      // 获取选中节点相关数据：包括当前完整数据值、当前父节点以上层层级节点数据集合及id集合
      const nodeInfo = getParentNodes(treeData, value, { childrenParam: treeOptionName.children, keyParam: treeOptionName.value })
      setFullLevelName(renderParenName(nodeInfo))
    } else {
      // value，无值时
      setFullLevelName(null)
    }
  }, [value, treeData])
  const renderParenName = (selectNodeInfo) => {
    if (selectNodeInfo.nodeParent.length > 0) {
      let parentItems = selectNodeInfo.nodeParent;
      // 当前查找到的父级节点拼合当前节点的标题字段值进行显示
      return parentItems.reverse().map((item) => item[treeOptionName.title]).concat(selectNodeInfo.matchNode[0][treeOptionName.title]).join(separator)
    }
    return selectNodeInfo.matchNode.length > 0 && selectNodeInfo.matchNode[0][treeOptionName.title]
  }
  const renderTreeSelectNode = () => {
    return <TreeSelect placeholder={placeholder}
                       value={value}
                       {...otherProps}
                       disabled={disabled}
                       onSelect={(value, node, extra) => {
                         const newNodeInfo = getParentNodes(treeData, value, { childrenParam: treeOptionName.children, keyParam: treeOptionName.value })
                         setFullLevelName(renderParenName(newNodeInfo))
                         if (onSelect) onSelect(value, node, extra)
                       }}
    >
      {renderTreeNode(treeData, treeOptionName, protoTreeNode || {})}
    </TreeSelect>
  }

  if (fieldStatus === 'viewOnly') return fullLevelName || '-' // 只读显示时，只返回文本
  return <>
    {
      showFullLevel ? <div className={`refactor-tree-select ${disabled ? 'refactor-disabled' : ''}`} title={fullLevelName || ''}>
        {
          renderTreeSelectNode()
        }
        <span className="refactor-tree-select-extra">{fullLevelName}</span>
      </div> : renderTreeSelectNode()
    }
  </>
})


export default RefactorTreeSelect;
