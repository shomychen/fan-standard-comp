import React from "react";
import {Icon } from "antd";
import SpecIcon from "../SpecIconFont";
// 渲染图标展示
/*
*  params { String,ReactNode } icon: 图标支持传值为字符串，
*  当表示为String,且数据里面包含','区分两个参数,第一个参数代表图标类名前缀，第二个参数代表当前图标类名 ‘speci,plus’
*  当表示为Array时，必须包含两个参数，第一个参数代表图标类名前缀，第二个参数代表当前图标类名 ['speci','plus']
 */
const IconNode = (props) => {
  const { icon } = props
  if (!icon) return null
  if (typeof icon === 'string') {
    const iconArr = icon.split(',');
    if (iconArr.length > 1)  {
      return <SpecIcon prefix={iconArr.length > 1 ? iconArr[0] : 'speci'} name={iconArr.length > 1 ? iconArr[1] : icon}></SpecIcon>
    }
    return <Icon type={icon}></Icon>
  }
  if (Array.isArray(icon) && icon.length > 1) return <SpecIcon prefix={icon[0]} name={icon[1]}></SpecIcon> // 预留 Array ['speci','plus']
  return icon
}
export default IconNode
