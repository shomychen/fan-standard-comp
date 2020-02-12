import React from 'react';
import PropTypes from 'prop-types';
export interface StandardModalProps {
  children: React.ReactNode;
  title: String;
  type: String;
  size: String;
  formItemGroup: PropTypes.ReactNodeArray,
  formPrefix: () => void,
  formPostfix: () => void,
  confirmText: String,
  cancelText: String,
  onSubmit: () => void,
  onCancel: () => void,
  hideFooter: Boolean // 是否隐藏底部按钮
  // footerRender: ()=> void, // 渲染弹窗底部按钮
  footerButtonGroup: PropTypes.ReactNodeArray,
}
