/*
* 工具类： 表单组控件值格式转换工具
* @params {Object} fieldsValue: 表单组内的控件值
* @params {Array} formItemGroup: 表单组
* */
const filedsValueFormat = (fieldsValue, formItemGroup)=> {
  formItemGroup && formItemGroup.forEach((item) => {
    if (!fieldsValue[item.filedName]) return
    if (item.type === 'datePicker' || item.type === 'dateTimePicker') {
      fieldsValue[item.filedName] = fieldsValue[item.filedName].format((item.protoConfig && item.protoConfig.format) || (item.type === 'datePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'))
    }
    if (item.type === 'monthPicker') {
      fieldsValue[item.filedName] = fieldsValue[item.filedName].format((item.protoConfig && item.protoConfig.format) || 'YYYY-MM')
    }
    if (item.type === 'rangePicker' || item.type === 'rangeTimePicker') {
      fieldsValue[item.filedName] = [
        fieldsValue[item.filedName][0].format((item.protoConfig && item.protoConfig.format) || (item.type === 'rangePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')),
        fieldsValue[item.filedName][1].format((item.protoConfig && item.protoConfig.format) || (item.type === 'rangePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')),
      ]
    }
  })
  return fieldsValue
}

export default filedsValueFormat;
