import React from "react";

import { Input, Select, Checkbox, InputNumber, TreeSelect, DatePicker, Radio, Upload, Icon, Button } from "antd";

const { TextArea, Password } = Input;
const Option = Select.Option;
const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const renderTreeNode = (data, dataOptionName) => data.map((item) => {
  if (item[dataOptionName.children] && item[dataOptionName.children].length > 0) {
    return (
      <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]}>
        {renderTreeNode(item[dataOptionName.children], dataOptionName)}
      </TreeNode>
    );
  }
  return <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]} />;
});
// 表单组件类型
const FieldComponent = React.forwardRef((props, ref) => {
  const {
    type, onChange, value, style, placeholder, protoConfig, treeData = [],
    filedName,
    selectOptionName = { value: 'value', label: 'label', disabled: 'disabled' },
    treeOptionName = { title: 'title', value: 'value', children: 'children' },
    disabledAll = false,
  } = props;
  let { selectOptions } = props
  let compContent;
  if (selectOptionName && selectOptions) {
    // 将传值的数据进行转换
    selectOptions = selectOptions.map((item) => {
      return {
        value: item[selectOptionName.value || 'value'],
        label: item[selectOptionName.label || 'label'],
        disabled: item[selectOptionName.disabled || 'disabled']
      }
    })
  }
  const defaultProps = {
    style, onChange, value, ...protoConfig, ref,
  }
  if (disabledAll) {
    defaultProps.disabled = true // 父级配置disabledAll时，所有表单都为false
  }
  let sortLimitRule = {} // 排序字段长度限制
  if (filedName === 'sorts' || filedName === 'sort' || filedName === 'indexSort' || filedName === 'sorta' || filedName === 'categorySort') {
    sortLimitRule = {
      min: 0,
      max: 999999999
    }
  }
  switch (type) {
    case 'input':
      compContent = (<Input {...defaultProps} placeholder={defaultProps.placeholder || placeholder || '请输入'} maxLength={defaultProps.maxLength || 50} />)
      break;
    case 'password':
      compContent = (
        <Password {...defaultProps} autoComplete="new-password" placeholder={defaultProps.placeholder || placeholder || '请输入'} maxLength={defaultProps.maxLength || 50} />)
      break;
    case 'textarea':
      compContent = (
        <TextArea {...defaultProps} placeholder={defaultProps.placeholder || placeholder || '请输入'} maxLength={defaultProps.maxLength || 500} />)
      break;
    case 'inputNumber':
      compContent = (<InputNumber {...defaultProps} {...sortLimitRule} placeholder={defaultProps.placeholder || placeholder || '请输入数字'} />)
      break;
    case 'select':
      compContent = (
        <Select {...defaultProps} allowClear placeholder={defaultProps.placeholder || placeholder || `${defaultProps.showSearch ? '请输入选择' : '请选择'}`}
                filterOption={(input, option) => defaultProps.showSearch ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false}
        >
          {selectOptions.map((val) =>
            <Option value={val.value}
                    key={val.value}
                    disabled={val.disabled}>{val.label}</Option>
          )}
        </Select>)
      break;
    case 'tree-select':
      compContent = (
        <TreeSelect {...defaultProps} placeholder={defaultProps.placeholder || placeholder || '请选择'}>
          {renderTreeNode(treeData, treeOptionName)}
        </TreeSelect>)
      break;
    case 'checkbox':
      compContent =
        <Checkbox.Group options={selectOptions} {...defaultProps} style={{ width: 'auto' }} />
      break;
    case 'radio':
      compContent =
        <Radio.Group options={selectOptions} {...defaultProps} style={{ width: 'auto' }} />
      break;
    case 'datePicker':
    case 'dateTimePicker':
      compContent = <DatePicker {...defaultProps} showTime={type === 'dateTimePicker'} style={{ ...defaultProps.style, 'minWidth': 'auto' }}
        // format={type === 'dateTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                placeholder={defaultProps.placeholder || placeholder || '请选择'} />
      break;
    case 'monthPicker':
      compContent = <MonthPicker {...defaultProps} placeholder={defaultProps.placeholder || placeholder || '请选择'} />
      break;
    case 'rangePicker':
    case 'rangeTimePicker':
      compContent = <RangePicker {...defaultProps} showTime={type === 'rangeTimePicker'}
                                 format={type === 'rangeTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                 style={{ width: type === 'rangeTimePicker' ? 'auto' : '100%' }} />
      break;
    case 'weekPicker ':
      compContent = <WeekPicker {...defaultProps} placeholder={defaultProps.placeholder || placeholder || '请选择'} />
      break;
    // case 'custom':
    //   compContent = customRender && customRender(props) || null
    //   break;
    case 'upload':
      compContent = <Upload {...defaultProps}>
        {
          (defaultProps.fileList && defaultProps.fileList.length >= 1) || (defaultProps.defaultFileList && defaultProps.defaultFileList.length >= 1) ? null :
            <Button>
              <Icon type="upload" /> 点击上传
            </Button>
        }
      </Upload>
      break;
    default:
      compContent = null
      break;
  }
  return compContent
});

export default FieldComponent;
