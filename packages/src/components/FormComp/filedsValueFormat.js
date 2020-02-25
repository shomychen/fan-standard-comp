const filedsValueFormat = (fieldsValue, formItemGroup)=> {
  formItemGroup && formItemGroup.forEach((item) => {
    if (!fieldsValue[item.filedName]) return
    if (item.type === 'datePicker' || item.type === 'dateTimePicker') {
      fieldsValue[item.filedName] = fieldsValue[item.filedName].format(item.type === 'datePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')
    }
    if (item.type === 'monthPicker') {
      fieldsValue[item.filedName] = fieldsValue[item.filedName].format(item.protoConfig && item.protoConfig.format || 'YYYY-MM')
    }
    if (item.type === 'rangePicker' || item.type === 'rangeTimePicker') {
      fieldsValue[item.filedName] = [
        fieldsValue[item.filedName][0].format(item.type === 'rangePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'),
        fieldsValue[item.filedName][1].format(item.type === 'rangePicker' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'),
      ]
    }
  })
  return fieldsValue
}

export default filedsValueFormat;
