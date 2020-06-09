import _ from "lodash";
// 按钮方法
const btnClickFunc = (fn, params = {}) => {
  if (!fn) return null
  const paramsArr = []
  if (typeof params === 'object') {
    Object.keys(params).map((item) => {
      paramsArr.push(params[item])
    })
  }
  if (typeof fn === 'function') {
    return fn(...paramsArr) // 表格列返回的是方法
  }
  return fn
}
// 按钮是否隐藏
const btnIsDisabled = (isDisabled, params = {}) => {
  if (!isDisabled) return false
  const paramsArr = []
  if (typeof params === 'object') {
    Object.keys(params).map((item) => {
      paramsArr.push(params[item])
    })
  }
  if (typeof isDisabled === 'function') {
    return isDisabled(...paramsArr) // 表格列返回的是方法
  }
  return isDisabled
}
// 按钮是否隐藏
const btnIsHide = (isHide, params = {}) => {
  if (!isHide) return false
  const paramsArr = []
  if (typeof params === 'object') {
    Object.keys(params).map((item) => {
      paramsArr.push(params[item])
    })
  }
  if (typeof isHide === 'function') {
    return isHide(...paramsArr) // 表格列返回的是方法
  }
  return isHide
}
// 重新组合数据(排除不包含在permissionCodes内及isHide数据
const removeNoPermission = (array, permissionCodes, codes, params) => {
  return Array.isArray(array) && array.filter((item) => {
    if (item.children) {
      item.children = removeNoPermission(item.children, permissionCodes, codes, params)
    }
    // permissionCodes未定义，则直接返回不进行过滤
    if (item.hasOwnProperty('code') && permissionCodes) {
      // if (!permissionCodes) return true //  permissionCodes未定义，则直接返回不进行过滤
      // 判断是否包含 'code'字段，如果包含则先过滤有在 permissionCodes内的(permissionCodes数组为0时，也不返回数据)
      // 并用是不隐藏的条件
      return permissionCodes.length !== 0 && permissionCodes.includes(item.code) && !btnIsHide(item.isHide, params)
    }
    if (item.hasOwnProperty('isHide')) {
      // 判断是否包含 'isHide'字段，如果包含则先过滤 isHide 为false
      return !btnIsHide(item.isHide, params);
    }
    return true
  }).map((resultItem) => {
    // 与codes进行对比，相应的 code匹配以对应的name,icon,code返回
    // 如果有配置code，则使用func.code.js里面配置的名称
    if (codes && resultItem.code) {
      const matchIndex = _.findIndex(codes, (btnItem) => btnItem.code === resultItem.code)
      if (matchIndex !== -1) {
        // 如果有配置code，则使用func.code.js里面配置的名称
        resultItem = { ...resultItem, ...codes[matchIndex] }
      }
    }
    return resultItem
  })
}
export { removeNoPermission, btnIsHide, btnIsDisabled, btnClickFunc }
