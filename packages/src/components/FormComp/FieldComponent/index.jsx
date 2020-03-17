import React from "react";
import moment from 'moment'
import { Input, Select, Checkbox, InputNumber, TreeSelect, DatePicker, Radio, Upload, Icon, Button } from "antd";
import Uploader from '../Uploader'

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
    viewOnly = false, // 是否纯展示
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
  // 设置纯展示模式下的下拉、单选、多选表单值
  const setSelectValue = (value) => {
    if (!value || !selectOptions) return '-'; // 无值情况 下
    // 数组情况
    if (Array.isArray(value)) {
      const matchValues = []
      value.forEach((valKey) => {
        const matchValue = selectOptions.filter((seItem) => seItem.value === valKey)
        if (matchValue.length > 0) {
          matchValues.push(matchValue[0].label)
        }
      })
      return matchValues.join(',')
    } else {
      const matchValue = selectOptions.filter((seItem) => seItem.value === value)
      return matchValue.length > 0 ? matchValue[0].label : '-'
    }
  }
  // 设置纯展示模式下的日期控件值
  const setDatePickerValue = (value) => {
    if (!value) return '-'; // 无值情况 下
    // 数组情况 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
    switch (type) {
      case 'datePicker':
        return moment(value).format((protoConfig && protoConfig.format) || 'YYYY-MM-DD');
        break;
      case 'dateTimePicker':
        return moment(value).format(protoConfig && protoConfig.format || 'YYYY-MM-DD HH:mm:ss');
        break;
      case 'rangePicker':
        return `${moment(value[0]).format(protoConfig && protoConfig.format || 'YYYY-MM-DD')} - ${moment(value[1]).format(protoConfig && protoConfig.format || 'YYYY-MM-DD')}`
        break;
      case 'rangeTimePicker':
        return `${moment(value[0]).format(protoConfig && protoConfig.format|| 'YYYY-MM-DD  HH:mm:ss')} - ${moment(value[1]).format(protoConfig && protoConfig.format || 'YYYY-MM-DD  HH:mm:ss')}`
        break;
      case 'monthPicker':
        return moment(value).format(protoConfig && protoConfig.format || 'MM月');
        break;
      default:
        return '-'
        break;
    }
  }
  // 设置纯展示模式下的“下拉树”控件返回值

  switch (type) {
    case 'input':
      compContent = viewOnly ? (value || '-') : (<Input {...defaultProps} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请输入')} maxLength={defaultProps.maxLength || 50} />)
      break;
    case 'password':
      compContent = viewOnly ? (value || '-') : (
        <Password {...defaultProps} autoComplete="new-password" placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请输入')} maxLength={defaultProps.maxLength || 50} />)
      break;
    case 'textarea':
      compContent = viewOnly ? (value || '-') : (
        <TextArea {...defaultProps} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请输入')} maxLength={defaultProps.maxLength || 500} />)
      break;
    case 'inputNumber':
      compContent = viewOnly ? (value || 0) : (<InputNumber {...defaultProps} {...sortLimitRule} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请输入数字')} />)
      break;
    case 'select':
      compContent = viewOnly ? setSelectValue(value) : (
        <Select {...defaultProps} allowClear placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || `${defaultProps.showSearch ? '请输入选择' : '请选择'}`)}
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
        <TreeSelect {...defaultProps} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请选择')}>
          {renderTreeNode(treeData, treeOptionName)}
        </TreeSelect>)
      break;
    case 'checkbox':
      compContent = viewOnly ? setSelectValue(value) : <Checkbox.Group options={selectOptions} {...defaultProps} style={{ width: 'auto' }} />
      break;
    case 'radio':
      compContent = viewOnly ? setSelectValue(value) : <Radio.Group options={selectOptions} {...defaultProps} style={{ width: 'auto' }} />
      break;
    case 'datePicker':
    case 'dateTimePicker':
      compContent = viewOnly ? setDatePickerValue(value) : <DatePicker {...defaultProps} showTime={type === 'dateTimePicker'} style={{ ...defaultProps.style, 'minWidth': 'auto' }}
        // format={type === 'dateTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                                                       placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请选择')} />
      break;
    case 'monthPicker':
      compContent =  viewOnly ? setDatePickerValue(value) : <MonthPicker {...defaultProps} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请选择')} />
      break;
    case 'rangePicker':
    case 'rangeTimePicker':
      compContent = viewOnly ? setDatePickerValue(value) : <RangePicker {...defaultProps} showTime={type === 'rangeTimePicker'}
                                                                        format={type === 'rangeTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                                                        style={{ width: type === 'rangeTimePicker' ? 'auto' : '100%' }} />
      break;
    case 'weekPicker ':
      compContent = <WeekPicker {...defaultProps} placeholder={disabledAll ? '' : (defaultProps.placeholder || placeholder || '请选择')} />
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
    case 'uploader':
      compContent = <Uploader {...defaultProps}></Uploader>
      break;
    default:
      compContent = null
      break;
  }
  return compContent
});

export default FieldComponent;
