import React, { useEffect } from "react";
import { Col, Tooltip, Icon, Form } from "antd";
// import styles from "../../StandardComp/StandardModal/index.less";
import { general } from '../../../data';
import FieldComponent from '../FieldComponent';

const FormItem = Form.Item

const RenderItemGroup = (props) => {
  const { form, itemGroup, size = 'md', disabledAll = false,  viewOnly = false ,getFormFields, colSpan, displayLayout } = props
  const setColSpan = (display, modalSize) => {
    if (display === 'block' || modalSize === 'xs') {
      return 24
    }
    if (modalSize === 'lg') {
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
  if (itemGroup && Array.isArray(itemGroup)) {
    return <>
      {
        itemGroup.map((item, index) => {
          const { label, description, isHide, type, customRender, filedName, filedOptions, componentStyle, extra, preExtra } = item; // 当前可传参的配置值
          if (isHide) return null
          let formLayout = item.display === 'block' ? general.modalSize[size].formBlockLayout : general.modalSize[size].formLayout
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
                className={viewOnly ? 'no-margin-bottom' : ''}
                label={description ? (<span>{label}&nbsp;<Tooltip title={description}><Icon type="info-circle" /></Tooltip></span>) : label}
                {...formLayout}
                {...item.protoFormItem}
                required={item.required}
              >
                {
                  type === 'custom' && customRender ? customRender(props.form, { ...item }, disabledAll, viewOnly) : (<>
                    {preExtra && preExtra() } {/* 定义表单前内容结构 */}
                    {form.getFieldDecorator(filedName, filedOptions)(
                      <FieldComponent {...item}
                                      disabledAll={disabledAll}
                                      viewOnly={viewOnly}
                                      onChange={(val) => {
                                        updateFormFields({ [item.filedName]: val })
                                        if (item.onChange) item.onChange(val, form)
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
