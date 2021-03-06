import React, { useEffect } from "react";
import { Col, Tooltip, Icon, Form } from "antd";
// import styles from "../../StandardComp/StandardModal/index.less";
import { general } from '../../../data';
import FieldComponent from '../FieldComponent';

const FormItem = Form.Item

const RenderItemGroup = (props) => {
  const { form, itemGroup, size = 'md', fieldStatus = 'default', disabledAll = false, getFormFields, colSpan, displayLayout } = props
  const setColSpan = (display, modalSize) => {
    if (typeof display === 'object' || display === 'block' || modalSize === 'xs' || modalSize === 'sm') {
      return 24
    }
    if (modalSize === 'lg' || modalSize === 'xlg') {
      return 8
    }
    return 12
  }

  const updateFormFields = (newVal) => {
    if (newVal) form.setFieldsValue({ ...newVal })
    if (getFormFields) getFormFields(form.getFieldsValue(), form)
  }

  useEffect(() => {
    updateFormFields()
  }, [])

  // 渲染隐藏指定控件
  const itemIsHide = (isHide) => {
    if (!isHide) return false
    if (typeof isHide === 'function') {
      return isHide(form ? form.getFieldsValue() : {}, form, fieldStatus)
    }
    return isHide
  }


  if (itemGroup && Array.isArray(itemGroup)) {
    return <>
      {
        itemGroup.map((item, index) => {
          const { label, description, isHide, type, customRender, filedName, filedOptions, componentStyle, extra, preExtra, display = 'side'  } = item; // 当前可传参的配置值
          if (itemIsHide(isHide)) return null
          let formLayout = item.display === 'block' ? general.modalSize[size].formBlockLayout : general.modalSize[size].formLayout
          if (typeof display === 'string') {
            formLayout = display === 'block' ? general.modalSize[size].formBlockLayout : general.modalSize[size].formLayout
          } else {
            formLayout = item.display // 对象类型传值如： {labelCol: {span: 3},wrapperCol: {span: 8}}
          }
          if (displayLayout) {
            // 如果未配置，则使用以下配置值
            formLayout = { ...displayLayout }
          }
          if (type === 'title' || type === 'html') {
            return (<Col key={index} span={item.colSpan || 24}>
              {type === 'title' ? <h3 className="modalPanelTitle">{label}</h3> : label}
            </Col>)
          }
          return (
            <Col key={index} span={item.colSpan || setColSpan(item.display, size)}>
              <FormItem
                className={fieldStatus === 'viewOnly' ? 'form-item-view-only' : ''}
                label={description ? (<span>{label}&nbsp;<Tooltip title={description}><Icon type="info-circle" /></Tooltip></span>) : label}
                {...formLayout}
                {...item.protoFormItem}
                required={item.required}
              >
                {
                    type === 'custom' && customRender ? customRender(props.form, { ...item }, fieldStatus === 'disabled' || disabledAll, fieldStatus) : (<>
                    {preExtra && preExtra()} {/* 定义表单前内容结构 */}
                    {form.getFieldDecorator(filedName, filedOptions)(
                      <FieldComponent {...item}
                                      disabledAll={fieldStatus === 'disabled' || disabledAll}
                                      fieldStatus={fieldStatus}
                                      onChange={(val) => {
                                        updateFormFields({ [item.filedName]: val })
                                        if (item.onChange) item.onChange(val, form)
                                      }}
                                      onPanelChange={(val) => {
                                        updateFormFields({ [item.filedName]: val })
                                        if (item.onPanelChange) item.onPanelChange(val, form)
                                      }}
                                      style={componentStyle || { ...general.formItemStyle.wide }}
                        // style={{ 'width': item.extra ? '90%' : '100%' } || { ...display ? general.formItemStyle.wide : general.formItemStyle.sm }}
                      />,
                    )}
                    {extra && extra()} {/* 定义表单后前内容结构 */}
                  </>)
                }

              </FormItem>
            </Col>
          )
        })
      }
    </>
  }
  return itemGroup
  /* 如果是ReactNode则直接返回 */
}
export default RenderItemGroup;
