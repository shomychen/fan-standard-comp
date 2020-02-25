import React from 'react';
import PropTypes from 'prop-types';

export interface FieldComponentProps {
  selectOptions: PropTypes.ReactNodeArray;
  selectOptionName: Object;
  type: String; // 表单控件类型
  protoConfig: Object; // 表单控件原生属性配置
  treeData: PropTypes.ReactNodeArray; // 下拉树数据列表
  treeOptionName: Object; // 指定下拉树结构的数据字段
}

export default class FieldComponent extends React.Component<FieldComponentProps, any> {}
