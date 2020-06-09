import React, { useEffect } from 'react';
import _ from 'lodash';
import FieldComponent from '../FormComp/FieldComponent';
import filedsValueFormat from '../FormComp/filedsValueFormat.js';
import ButtonGroup from '../ButtonGroup/index.js';
import { funcCode, general } from '../../data';
import { Form, Button, Icon, Menu, Dropdown, Select, Checkbox } from 'antd';
import './index.less';
import RenderItemGroup from "../FormComp/RenderItemGroup";

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const StandardFilter = React.forwardRef((props, ref) => {
  const { form, buttonGroup, formItemGroup, onFilterSearch, onFilterReset, className, style, getFormFields,  min, codes, permissionCodes, } = props;
  const { getFieldDecorator } = form

  const handleSearch = (e) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const resultValues = filedsValueFormat(fieldsValue, formItemGroup)
      if (onFilterSearch) {
        onFilterSearch({ ...resultValues })
      }
    })
  }
  const handleReset = () => {
    const resetValues = form.getFieldsValue()
    Object.keys(resetValues).forEach((item) => {
      resetValues[item] = undefined
    })
    form.setFieldsValue({ ...resetValues }) // 直接清空表单的赋值
    // form.resetFields();
    if (onFilterReset) {
      onFilterReset(form.getFieldsValue())
    }
  }
  // 更新表单项目数据
  const updateFormFields = (newVal) => {
    if (newVal) form.setFieldsValue({ ...newVal })
    if (getFormFields) getFormFields(form.getFieldsValue(), form)
  }

  useEffect(() => {
    updateFormFields()
  }, [])

  // 表单列表组 formItemGroup 类型为数组或者React.Node
  const renderFormItemGroup = () => {
    if (Array.isArray(formItemGroup)) {
      return <>
        {
          formItemGroup.map((item, index) => {
            const { componentStyle } = item
            return (
              <FormItem key={item.filedName} label={item.label}>
                {
                  item.type === 'custom' && item.customRender ? item.customRender(form, { ...item }): <>
                    {getFieldDecorator(item.filedName, { ...item.filedOptions })(
                      <FieldComponent {...item}
                                      onChange={(val) => {
                                        updateFormFields({ [item.filedName]: val })
                                        if (item.onChange) item.onChange(val, form)
                                      }}
                                      onPanelChange={(val) => {
                                        updateFormFields({ [item.filedName]: val })
                                        if (item.onPanelChange) item.onPanelChange(val, form)
                                      }}
                                      style={{ width: item.type === 'checkbox' || item.type === 'radio' ? 'auto' : general.formItemStyle.xsm.width, ...componentStyle }} />
                    )}
                    </>
                }
              </FormItem>
            )
          })
        }
      </>
    }
    return formItemGroup
  }
  return (
    <Form layout="inline" onSubmit={(e) => handleSearch(e)} ref={ref} className={className} style={style}>
      <div className="filter-grid">
        <div className="filter-form">
          {formItemGroup ? <>
            {renderFormItemGroup()}
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
              {
                onFilterReset && <Button type="primary" style={{ marginLeft: 8 }} onClick={handleReset} ghost>重置</Button>
              }
            </FormItem>
          </> : null}
        </div>
        {
          buttonGroup && buttonGroup.length > 0 ? <div className="filter-btns"><ButtonGroup options={buttonGroup} min={min} codes={codes} permissionCodes={permissionCodes} /></div> : null
        }
      </div>
    </Form>)
})
export default Form.create()(StandardFilter);
