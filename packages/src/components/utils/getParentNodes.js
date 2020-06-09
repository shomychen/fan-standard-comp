/**
 * @description  递归查看父级节点数据集合及当前节点数据
 * @params {Array}  list 当前需要过滤查看的数据集合、
 * @params {String} nodeKey 当前用于查找匹配数据的标识值
 * @params {Object} params 指定当前数据中，筛选对应子集合字段名及匹配标识值字段名
 *                         （childrenParam：指当前子集合数据字段名（字符串表示单个，数组表示当前多个子集合字段名），keyParam： 指当前匹配标识值字段名）
 *
 * @result {Array} nodeParent  当前传入nodeKey值所有上级别父级数据对象数组集合（倒序排列，根节点在最后一条）
 * @result {Array} parentKeys  当前传入nodeKey值所有上级别父级数据关键字数据集合(keyParam)（倒序排列，根节点在最后一条）
 * @result {Array} matchNode   当前传入nodeKey值所在的数据对象集合
 * */
const getParentNodes = (list, nodeKey, params = { childrenParam: 'children', keyParam: 'id' }) => {
  // const childrenParams = ['menuItems', 'menuFuncItems', 'items']
  const matchNode = [];
  const parentKeys = []; // 存储查找到的节点的父节点数据
  const nodeParent = []; // 存储查找到的节点的父节点数据
  // 移除上一次累加的数据
  const removePrevIndex = (array, item) => {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i].id === item.id) {
        return i;
      }
    }
    return null;
  };
  const deepFind = (array, nodeId) => {
    for (let i = 0; i < array.length; i += 1) {
      const node = array[i];
      if (node[params.keyParam] === nodeId) {
        matchNode.splice(0, 1, node); // 查找到则赋值，且跳出循环
        break;
      }
      // 如果是单个
      if (node[params.childrenParam] && node[params.childrenParam].length > 0) {
        deepFind(node[params.childrenParam] || node[params.childrenParam], nodeId);
        nodeParent.push(node); // 将当前节点数据存储到父节点数据中
        if (matchNode.length > 0) {
          break; // 在子节点查找到了，需要跳出
        } else {
          nodeParent.splice(removePrevIndex(nodeParent, node), 1); // 如果在子节点没有查找到，则将原来添加的父节点数据移除
        }
      }
      // 其他条件
      /* else if (node.menuFuncItems && node.menuFuncItems.length > 0) {
        deepFind(node.menuFuncItems, nodeId);
        nodeParent.push(node); // 将当前节点数据存储到父节点数据中
        if (matchNode.length > 0) {
          break; // 在子节点查找到了，需要跳出
        } else {
          nodeParent.splice(removePrevIndex(nodeParent, node), 1); // 如果在子节点没有查找到，则将原来添加的父节点数据移除
        }
      } else if (node.items && node.items.length > 0) {
        // 数据权限的子菜单集合 items
        deepFind(node.items, nodeId);
        nodeParent.push(node); // 将当前节点数据存储到父节点数据中
        if (matchNode.length > 0) {
          break; // 在子节点查找到了，需要跳出
        } else {
          nodeParent.splice(removePrevIndex(nodeParent, node), 1); // 如果在子节点没有查找到，则将原来添加的父节点数据移除
        }
      } else if (node.dataScopeList && node.dataScopeList.length > 0) {
        // 数据权限的子菜单集合 dataScopeList
        deepFind(node.dataScopeList, nodeId);
        nodeParent.push(node); // 将当前节点数据存储到父节点数据中
        if (matchNode.length > 0) {
          break; // 在子节点查找到了，需要跳出
        } else {
          nodeParent.splice(removePrevIndex(nodeParent, node), 1); // 如果在子节点没有查找到，则将原来添加的父节点数据移除
        }
      }*/
    }
    return matchNode; // 返回查找到的节点数据（格式为数组）
  };
  deepFind(list, nodeKey);
  nodeParent.forEach((par) => parentKeys.push(par[params.keyParam])) // 将所有父节点的关键值（keyParam指定字段名）的数据集合在数组内
  return { nodeParent, parentKeys, matchNode }; // 最终查找到的父节点数组 // nodeParent.concat(result || []);
}
export default getParentNodes;
