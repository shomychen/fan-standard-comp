import React from 'react';
import { Form, Modal, Button, Row } from 'antd';
import styles from './index.less';
import { general } from '../../data';
import { filedsValueFormat, RenderItemGroup } from '../FormComp';

class StandardModal extends React.Component {
  handleSubmit = (e) => {
    const { type, form, onSubmit, formItemGroup } = this.props;
    if (type === 'form') {
      e.preventDefault();
      form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const resultValues = filedsValueFormat(fieldsValue, formItemGroup)
        if (onSubmit) {
          onSubmit({ ...resultValues })
        }
      })
    } else {
      // 没有表单数组 formItemGroup 配置
      onSubmit && onSubmit()
    }
  }

  handleCancel = () => {
    const { type, form, onCancel } = this.props;
    if (type === 'form') form.resetFields()
    if (onCancel) onCancel()
  }

  onAfterClose = () => {
    const { type, form, afterClose } = this.props;
    if (type === 'form') form.resetFields()
    if (afterClose) afterClose()
  }

  // 按钮列表组
  renderButtonGroup = () => {
    const { disabledAll, form, hideFooter = false, footerButtonGroup, footerRender, confirmLoading, cancelText = '取消', confirmText = '保存', } = this.props;
    if (disabledAll) return null // 弹窗配置 disableAll 时，隐藏底部栏
    if (hideFooter) return null
    if (footerButtonGroup) {
      if (Array.isArray(footerButtonGroup)) {
        if (footerButtonGroup.length === 0) return null
        return <>
          {
            footerButtonGroup.map((item) => (<Button
              key={item.name}
              type={item.type ? item.type : 'primary'}
              icon={item.icon}
              ghost={item.ghost}
              disabled={item.disabled}
              loading={item.loading}
              onClick={item.fn ? (e) => item.fn(item, form, e) : null}
            >
              {item.name}
            </Button>))
          }
        </>;
      } else {
        return footerButtonGroup
      }
    }
    if (footerRender) return footerRender(this.handleSubmit, this.handleCancel, this.props)
    return <>
      <Button key="submit" type="primary" loading={confirmLoading} onClick={this.handleSubmit}>{confirmText}</Button>
      <Button key="back" onClick={this.handleCancel}>{cancelText}</Button>
    </>;
  }

  render() {
    const {
      size = 'md',
      type,
      formItemGroup,
      form,
      onSubmit,
      formPrefix,
      formPostfix,
      disabledAll = false,
      getFormFields,
    } = this.props;
    return <Modal
      className={styles.standardModal}
      width={general.modalSize[size].width || general.modalSize.sm.width}
      maskClosable={false}
      afterClose={this.onAfterClose}
      footer={this.renderButtonGroup()}
      destroyOnClose
      {...this.props}
    >
      {this.props.children}
      {type === 'form' && (
        <Form onSubmit={onSubmit} className={styles.modalForm}>
          <Row type="flex">
            {formPrefix && formPrefix(form, this.props)}
            {
              formItemGroup && Array.isArray(formItemGroup) &&
              <RenderItemGroup getFormFields={getFormFields} size={size} {...this.props} itemGroup={formItemGroup} disabledAll={disabledAll}/>
            }
            {formPostfix && formPostfix(form, this.props)}
          </Row>
        </Form>
      )}
    </Modal>
  }
}

export default Form.create()(StandardModal);
