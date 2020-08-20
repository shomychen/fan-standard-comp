import React from "react";
import moment from 'moment'
import { Input, Select, Checkbox, InputNumber, TreeSelect, DatePicker, Radio, Upload, Icon, Button } from "antd";
import Uploader from '../Uploader'
import RefactorTreeSelect from './RefactorTreeSelect.js'
import { setInputNumberValue } from './setReadonlyValues.js'

const { TextArea, Password } = Input;
const Option = Select.Option;
const { TreeNode } = TreeSelect;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const renderTreeNode = (data, dataOptionName, nodeProps) => data.map((item) => {
  if (item[dataOptionName.children] && item[dataOptionName.children].length > 0) {
    return (
      <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]} {...nodeProps}>
        {renderTreeNode(item[dataOptionName.children], dataOptionName)}
      </TreeNode>
    );
  }
  return <TreeNode title={item[dataOptionName.title]} key={item[dataOptionName.value]} value={item[dataOptionName.value]}  {...nodeProps} />;
});
// 表单组件类型
const FieldComponent = React.forwardRef((props, ref) => {
  const {
    type, onChange, value, style, placeholder, protoConfig, treeData = [],
    filedName,
    selectOptionName = { value: 'value', label: 'label', disabled: 'disabled' },
    treeOptionName = { title: 'title', value: 'value', children: 'children' },
    fieldStatus = 'default',
    disabledAll = false,
    onPanelChange,
    showFullLevel,// tree-select 是否显示完整层级名称
    separator,// tree-select 是否显示完整层级名称的分割符号
    selectOptionRender, // select 控件配置选项展示内容
  } = props;
  let { selectOptions } = props
  let compContent;
  if (selectOptionName && selectOptions) {
    // 将传值的数据进行转换
    selectOptions = selectOptions.map((item) => {
      return {
        ...item,
        value: item[selectOptionName.value || 'value'],
        label: item[selectOptionName.label || 'label'],
        disabled: item[selectOptionName.disabled || 'disabled']
      }
    })
  }
  const defaultProps = {
    style, onChange, value, ref, ...protoConfig
  }
  // 针对日历
  if (protoConfig && protoConfig.mode && type !== 'select') {
    defaultProps.onPanelChange = onPanelChange
  }
  if (fieldStatus === 'disabled' || disabledAll) {
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
    console.log('设置纯展示', filedName, value)
    const { labelInValue } = defaultProps;
    if (!value || !selectOptions) return '-'; // 无值情况 下
    // 数组情况
    if (Array.isArray(value)) {
      const matchValues = []
      value.forEach((valKey) => {
        const matchValue = selectOptions.filter((seItem) => seItem[selectOptionName.value] === valKey)
        if (matchValue.length > 0) {
          matchValues.push(matchValue[0].label)
        }
      })
      return matchValues.join(',')
    } else {
      // 如select配置labelInValue则value返回数据是对象{key: 'xxx'}
      const matchValue = selectOptions.filter((seItem) => seItem[selectOptionName.value] === (labelInValue ? value.key : value))
      if (selectOptionRender) {
        return matchValue.length > 0 ? selectOptionRender(matchValue[0]) : '-'
      }
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
        return `${moment(value[0]).format(protoConfig && protoConfig.format || 'YYYY-MM-DD  HH:mm:ss')} - ${moment(value[1]).format(protoConfig && protoConfig.format || 'YYYY-MM-DD  HH:mm:ss')}`
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
  let viewOnly = fieldStatus === 'viewOnly' // 是否纯展示
  switch (type) {
    case 'input':
      compContent = viewOnly ? (value || '-') : (<Input placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请输入')}
                                                        maxLength={defaultProps.maxLength || 50} {...defaultProps} />)
      break;
    case 'password':
      compContent = viewOnly ? (value || '-') : (
        <Password autoComplete="new-password" placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请输入')}
                  maxLength={defaultProps.maxLength || 50}
                  {...defaultProps} />)
      break;
    case 'textarea':
      compContent = viewOnly ? (value || '-') : (
        <TextArea placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请输入')} maxLength={defaultProps.maxLength || 500}  {...defaultProps} />)
      break;
    case 'inputNumber':
      compContent = viewOnly ? setInputNumberValue(value) : (<InputNumber placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请输入数字')} {...sortLimitRule} {...defaultProps} />)
      break;
    case 'select':
      // 重置返回完整字段值
      const resetResultOption = (Option) => {
        if (!Option) return Option
        if (Array.isArray(Option)) return selectOptions.filter(childOpt => Option.filter(optItem => childOpt.value === optItem.value).length > 0) // 数据为数组
        return { ...Option, ...selectOptions.filter(childOpt => childOpt.value === Option.value)[0] }
      }
      compContent = viewOnly ? setSelectValue(value) : (
        <Select allowClear placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || `${defaultProps.showSearch ? '请输入选择' : '请选择'}`)}
                filterOption={(input, option) => defaultProps.showSearch ? option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false}
                {...defaultProps}
          // onChange返回参数：累加当前选中包括其他字段值的数据
                onChange={(value, Option) => onChange(value, resetResultOption(Option))}
        >
          {selectOptions.map((val) =>
            <Option value={val.value}
                    key={val.value}
                    disabled={val.disabled}>{selectOptionRender ? selectOptionRender(val) : val.label}</Option>
          )}
        </Select>)
      break;
    case 'tree-select':
      compContent = (<RefactorTreeSelect treeData={treeData}
                                         treeOptionName={treeOptionName}
                                         allowClear
                                         showFullLevel={showFullLevel}
                                         separator={separator}
                                         placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请选择')}
                                         protoTreeNode={(protoConfig && protoConfig.TreeNode) || {}}
                                         fieldStatus={fieldStatus}
                                         {...defaultProps} />)

      /*compContent = (
        <TreeSelect placeholder={(fieldStatus === 'disabled' || disabledAll) ? '' : (defaultProps.placeholder || placeholder || '请选择')} {...defaultProps} >
          {renderTreeNode(treeData, treeOptionName,(protoConfig && protoConfig.TreeNode) || {})}
        </TreeSelect>)*/
      break;
    case 'checkbox':
      compContent = viewOnly ? setSelectValue(value) : <Checkbox.Group options={selectOptions}  {...defaultProps} style={{ width: 'auto', ...defaultProps.style }} />
      break;
    case 'radio':
      compContent = viewOnly ? setSelectValue(value) : <Radio.Group options={selectOptions}  {...defaultProps} style={{ width: 'auto', ...defaultProps.style }} />
      break;
    case 'datePicker':
    case 'dateTimePicker':
      compContent = viewOnly ? setDatePickerValue(value) : <DatePicker showTime={defaultProps.showTime || type === 'dateTimePicker'}
        // format={type === 'dateTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                                                                       placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请选择')}
                                                                       {...defaultProps}
                                                                       style={{ 'minWidth': 'auto', ...defaultProps.style }} />
      break;
    case 'monthPicker':
      compContent = viewOnly ? setDatePickerValue(value) : <MonthPicker placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请选择')}
                                                                        {...defaultProps} />
      break;
    case 'rangePicker':
    case 'rangeTimePicker':
      if (fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) defaultProps.placeholder = ''  // 禁用时，placeHolder不显示
      compContent = viewOnly ? setDatePickerValue(value) : <RangePicker showTime={defaultProps.showTime || type === 'rangeTimePicker'}
                                                                        format={defaultProps.format || (type === 'rangeTimePicker' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}
                                                                        {...defaultProps}
                                                                        style={{ width: type === 'rangeTimePicker' ? 'auto' : '100%', ...defaultProps.style }} />
      break;
    case 'weekPicker ':
      compContent = <WeekPicker placeholder={(fieldStatus === 'disabled' || disabledAll || defaultProps.disabled) ? '' : (defaultProps.placeholder || placeholder || '请选择')} {...defaultProps} />
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
