import { Icon } from 'antd';
import React from "react";
import './index.less'
import classNames from 'classnames'
import './fonts/iconfont'
import './fontsSub/iconfont'
// import { iconfontUrl as scriptUrl } from '@/components/BasicLayout/defaultSettings';

// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
// export default Icon.createFromIconfontCN({ scriptUrl });

const SpecIcon = props => {
  const {
    type,
    name,
    size,
    status, // normal,outline,error,warning,success
    round, // 图标 状态是否是圆形
    title,
    onClick,
    style,
    prefix = 'speci',
  } = props;
  let extraClassName = ''
  if (status) extraClassName += ` is-${status}`
  const renderIconFont = () => {
    if (round) extraClassName += ` is-round`
    return <i className={classNames(`spec-icon`, `${prefix}font`, `${prefix}-${name}`, extraClassName, name === 'loading' ? 'anticon-spin' : '')} title={title} onClick={onClick} style={size ? { fontSize: `${size}px` } : {}} />
  }
  const renderIconSvg = () => {
    const baseElement = () => (<i className={classNames( `specicon anticon`, !round && extraClassName)}
                                  style={size ? { fontSize: `${size}px` } : {}} title={title} onClick={onClick}>
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
