import React from "react";
import moment from 'moment'
// 设置纯展示模式下的级联选择显示值

const setCascaderValue = (value, props) => {
  const { selectOptions, defaultProps } = props
  if (!value || value.length === 0 || !selectOptions) return '-'; // 无值情况 下
  let matchNode = undefined
  const matchValueItems = []
  value.forEach((valKey) => {
    let matchValue
    // 第一个值使用  ‘selectOptions’查找，后面使用上一次匹配到的父节点查找 matchNode
    if (matchNode && matchNode.children) {
      matchValue = matchNode.children.filter((seItem) => seItem.value === valKey)
    } else {
      matchValue = selectOptions.filter((seItem) => seItem.value === valKey)
    }
    if (matchValue.length > 0) {
      matchNode = matchValue[0]
      matchValueItems.push(matchValue[0])
    }
  })
  // 如果自定义"选择后展示的渲染函数"则直接返回此选择方法
  if (defaultProps.displayRender) return defaultProps.displayRender(matchValueItems.map(item => item.label), matchValueItems)
  return matchValueItems.map(item => item.label).join('/')
}
// 设置纯展示模式下的下拉、单选、多选表单值
const setSelectValue = (value, props) => {
  const { selectOptions, selectOptionRender, defaultProps, type } = props
  const { labelInValue } = defaultProps;
  if ((!value && value !== 0) || !selectOptions) return '-'; // 无值情况 下
  // 数组情况
  if (Array.isArray(value)) {
    // 返回是数组
    const matchValues = []
    value.forEach((valKey) => {
      const matchValue = selectOptions.filter((seItem) => seItem.value ===  (labelInValue ? valKey.value : valKey))
      if (matchValue.length > 0) {
        matchValues.push(matchValue[0].label)
      }
    })
    return matchValues.join(',')
  } else {
    // 如select配置labelInValue则value返回数据是对象{key: 'xxx'}
    const matchValue = selectOptions.filter((seItem) => seItem.value === (labelInValue ? value.value : value))
    // 如果 select 配置选项展示内容，则直接使用其配置值展示当前只读信息
    if (selectOptionRender) {
      return matchValue.length > 0 ? selectOptionRender(matchValue[0]) : '-'
    }
    return matchValue.length > 0 ? matchValue[0].label : '-'
  }
}
// 设置纯展示模式下的日期控件值
const setDatePickerValue = (value, props) => {
  const { type, protoConfig, } = props
  if (!value && value !== 0) return '-'; // 无值情况 下
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

// 设置纯展示模式下的时间控件值
const setTimePickerValue = (value, props) => {
  const { type, protoConfig, } = props
  if (!value && value !== 0) return '-'; // 无值情况 下
  switch (type) {
    case 'timePicker':
      return moment(value).format((protoConfig && protoConfig.format) || 'HH:mm:ss');
      break;
    case 'timePickerRange':
      return `${moment(value[0]).format(protoConfig && protoConfig.format || 'HH:mm:ss')} - ${moment(value[1]).format(protoConfig && protoConfig.format || 'HH:mm:ss')}`
      break;
    default:
      return '-'
      break;
  }
}
// 设置纯展示模式下上传控件显示值
const setUploaderValue = (value, props) => {
  if (!value && value !== 0) return '-'; // 无值情况 下
  return <div className="spec-uploader-viewonly">
    {
      value.map((item, index) => <div key={index} className="spec-uploader-viewonly-item">
        {item.downloadUrl ? <img className="ant-upload-list-item-image" src={item.downloadUrl} alt=''/> : '暂无图片'}
      </div>)
    }
  </div>
}

const setInputNumberValue =(value) =>{
  if (!value && value !== 0) return '-'; // 无值情况 下
  return value
}
export {
  setCascaderValue, setSelectValue, setDatePickerValue,  setTimePickerValue, setUploaderValue, setInputNumberValue
}
