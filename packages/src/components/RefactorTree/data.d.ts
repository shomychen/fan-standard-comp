import PropTypes from 'prop-types';
export interface RefactorTree {
  treeData: PropTypes.ReactNodeArray,
  rootName: String; // 是否指定名称显示一个根节点
  rootKey: String; //
  emptyDescription: String;
}
