import React from 'react';
import { Form, Modal, Button, Row } from 'antd';
import './index.less';
import { general } from '../../data';
import RenderItemGroup from '../FormComp/RenderItemGroup';
import filedsValueFormat from '../FormComp/filedsValueFormat.js';

class StandardModal extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { title, footer, footerRender, footerButtonGroup , hideFooter} = nextProps
    return {
      bodyMaxHeight: `${document.body.offsetHeight - (title ? 55 : 0) - ((footer || footerRender || footerButtonGroup) ? 55 : 0) - 80*2 - 32 + (hideFooter ? 55 : 0)}px`,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      // 160px代表上下空白间距， 32px为内容区内部的上下padding值
      bodyMaxHeight: `auto`,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.initBodyMaxHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.initBodyMaxHeight);
  }

  componentDidUpdate(prevProps) {
    const {hideFooter} = this.props;
    if (hideFooter !== prevProps.hideFooter) this.initBodyMaxHeight()
  }

  initBodyMaxHeight = () => {
    const { title, footer, footerRender, footerButtonGroup, hideFooter } = this.props
    this.setState({
      bodyMaxHeight: `${document.body.offsetHeight - (title ? 55 : 0) - ((footer || footerRender || footerButtonGroup) ? 55 : 0) - 160 - 32 +( hideFooter ? 55 : 0)}px`,
    })
  }
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
      fieldStatus = 'defalut', // 控件状态： defalut默认， disabled禁用全部， viewOnly：仅显示内容不显示控件
    } = this.props;
    const { bodyMaxHeight } = this.state;
    return <Modal
      className="standardModal"
      width={general.modalSize[size].width || general.modalSize.sm.width}
      maskClosable={false}
      afterClose={this.onAfterClose}
      footer={this.renderButtonGroup()}
      destroyOnClose
      style={{ top: '80px' }}
      bodyStyle={{ maxHeight: bodyMaxHeight, overflowY: 'scroll' }}
      {...this.props}
    >
      {this.props.children}
      {type === 'form' && (
        <Form onSubmit={onSubmit} className="modalForm">
          <Row type="flex">
            {formPrefix && formPrefix(form, this.props)}
            {
              formItemGroup && Array.isArray(formItemGroup) &&
              <RenderItemGroup getFormFields={getFormFields} size={size} {...this.props} itemGroup={formItemGroup} disabledAll={disabledAll || fieldStatus === 'disabled'} viewOnly={fieldStatus === 'viewOnly'}/>
            }
            {formPostfix && formPostfix(form, this.props)}
          </Row>
        </Form>
      )}
    </Modal>
  }
}

export default Form.create()(StandardModal);
