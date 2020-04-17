import React, { useEffect } from 'react';
import _ from 'lodash';
import FieldComponent from '../FormComp/FieldComponent';
import filedsValueFormat from '../FormComp/filedsValueFormat.js';
import { funcCode, general } from '../../data';
import { Form, Button, Icon, Menu, Dropdown, Select, Checkbox } from 'antd';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const StandardFilter = React.forwardRef((props, ref) => {
  const { form, buttonGroup, formItemGroup, onFilterSearch, onFilterReset, className, style } = props;
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
  const updateFormFields = (newVal) => {
    if (newVal) form.setFieldsValue({ ...newVal })
    if (form.getFormFields) form.getFormFields(form.getFieldsValue(), form)
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
                    // ...{item.type === 'checkbox' ? }general.formItemStyle.xsm
                                  style={{ width: item.type === 'checkbox' || item.type === 'radio' ? 'auto' : general.formItemStyle.xsm.width, ...componentStyle }} />
                )}
              </FormItem>
            )
          })
        }
      </>
    }
    return formItemGroup
  }
  // 按钮列表组
  const renderButtonGroup = () => {
    const { getFieldsValue } = form;
    const fields = getFieldsValue();
    const btn = (item, index) => {
      if (item.render) return item.render;
      if (item.code && _.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === item.code) !== -1) {
        // 如果有配置code，则使用func.code.js里面配置的名称
        item = Object.assign(item, funcCode.btnFuncCodes[_.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === item.code)])
      }
      return (
        <Button
          key={item.name}
          type={item.type ? item.type : 'primary'}
          icon={item.icon ? item.icon : ''}
          disabled={item.disabled}
          onClick={item.fn ? (e) => item.fn(item, fields, e) : null}
        >
          {item.exName || item.name}
        </Button>);
    };
    const menu = (group) => {
      return (<Menu>
        {
          group.map((item) => {
            if (item.code && _.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === item.code) !== -1) {
              // 如果有配置code，则使用func.code.js里面配置的名称
              item = Object.assign(item, funcCode.btnFuncCodes[_.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === item.code)])
            }
            return (
              <Menu.Item key={item.name}>
                <a onClick={item.fn ? () => item.fn(item) : null}>{item.exName || item.name}</a>
              </Menu.Item>
            )
          })
        }
      </Menu>)
    };
    // 判断是否是数组且长度大于0时 ？{如下结构渲染} ： {按buttonGroup返回的node渲染}
    if (Array.isArray(buttonGroup)) {
      // 判断提供数据长度是否大于3，如果超过3个，则后面从第4个开始会在dropdown组件中渲染
      if (buttonGroup.length > 3) {
        const forGroup = buttonGroup.slice(0, 2)
        const forDrop = buttonGroup.slice(2)
        return (
          <>
            {forGroup.map((item, index) => (index < 2) ? btn(item, index) : null)}
            <Dropdown overlay={menu(forDrop)}>
              <Button type="primary">
                更多 <Icon type="down" />
              </Button>
            </Dropdown>
          </>);
      }
      return (
        <>
          {buttonGroup.map((item, index) => btn(item, index))}
        </>);
    }
    return buttonGroup;
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
          buttonGroup ? <div className="filter-btns">{renderButtonGroup()}</div> : null
        }
      </div>
    </Form>)
})
export default Form.create()(StandardFilter);
