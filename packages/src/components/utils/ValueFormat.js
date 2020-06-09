/*
* 工具类： 表单组控件值格式转换工具
* @params {Object} fieldsValue: 表单组内的控件值
* @params {Array} formItemGroup: 表单组
* */
const UtilValueFormat = (fieldsValue, formItemGroup) => {
  formItemGroup && formItemGroup.forEach((item) => {
    if (!fieldsValue[item.filedName]) return
    switch (item.type) {
      case 'datePicker':
      case 'dateTimePicker':
      case 'rangePicker':
      case 'rangeTimePicker':
        let pickerFormatNew;
        if (item.protoConfig && item.protoConfig.picker) {
          switch (item.protoConfig.picker) {
            case 'week':
              pickerFormatNew = 'YYYY-wo'
              break
            case 'month':
              pickerFormatNew = 'MM月'
              break
            case 'year':
              pickerFormatNew = 'YYYY'
              break
            default:
              break;
          }
        } else {
          pickerFormatNew = (item.type === 'datePicker' || item.type === 'rangePicker') ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
        }
        fieldsValue[item.filedName] = item.type === 'datePicker' || item.type === 'dateTimePicker'
          ? fieldsValue[item.filedName].format((item.protoConfig && item.protoConfig.format) || pickerFormatNew)
          : [
            fieldsValue[item.filedName][0].format((item.protoConfig && item.protoConfig.format) || pickerFormatNew),
            fieldsValue[item.filedName][1].format((item.protoConfig && item.protoConfig.format) || pickerFormatNew),
          ]
        break
      default:
        break;
    }
  })
  return fieldsValue
}

export default UtilValueFormat;
