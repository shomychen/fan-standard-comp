import React from "react";
import './index.less'
import classNames from 'classnames'

// 图标库文件及对应字形图标根据项目引入
const SpecIcon = props => {
  const {
    type,
    name,
    size,
    status, // normal,outline,error,warning,success
    round, // 图标 状态是否是圆形
    onClick,
    style,
    className,
    prefix = 'speci',
    ...otherProps
  } = props;
  let extraClassName = ''
  if (status) extraClassName += ` is-${status}`
  let fontStyle = {}
  if (size) {
    fontStyle = { fontSize: `${size}px` }
  }
  const renderIconFont = () => {
    if (round) extraClassName += ` is-round`
    return <i className={classNames(`spec-icon`, `${prefix}font`, `${prefix}-${name}`, extraClassName, name === 'loading' ? 'anticon-spin' : '')} onClick={onClick}
              style={{...fontStyle, ...style}} {...otherProps}/>
  }
  const renderIconSvg = () => {
    const baseElement = () => (<i className={classNames( `specicon anticon`, !round && extraClassName, className)}
                                  style={{...fontStyle, ...style}} onClick={onClick}
                                  {...otherProps}>
      <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" className={name === 'loading' ? 'anticon-spin' : ''}>
        <use xlinkHref={`#${prefix}-${name}`}></use>
      </svg>
    </i>)
    return round ? <span className={classNames('specicon-round', status && ` is-${status}`)}>
      {baseElement()}
  </span> : baseElement()
  }
  return type && type === 'colour' ? renderIconSvg() : renderIconFont()
}

export default SpecIcon;
