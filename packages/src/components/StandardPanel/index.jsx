import React from 'react';
import classNames from 'classnames';
import {Radio, Popover} from 'antd';
import './index.less';
//
// export interface StandardPanelProps {
//     children?: React.ReactNode;
//     style?: React.CSSProperties;
//     className?: string;
//     height?: Boolean;
//     title?: any;
//     badges?: badgesList[];
//     cateConfig?: GroupList[];
//     buttonConfig?: GroupList[];
//     type?: string;
//     postfix?: React.ReactNode;
// }
// export interface GroupList {
//     activeKey?: string;
//     list?: string[] | any;
//     onChange?: () => void;
//     className?: string;
// }
//
// export interface badgesList {
//     value?: string;
//     label?: string[] | any;
//     color?: string;
// }

const StandardPanel = props => {
    const {
        className,
        style,
        height,
        children,
        title,
        badges,
        cateConfig,
        buttonConfig,
        type,
        postfix,
    } = props;


    const RenderGroupList = (values) => {
        const {list, activeKey, onChange, className} = values;
        const handleChange = (e) => {
            if (onChange) {
                onChange(e.target.value)
            }
        }
        return <div className={className}>
            <Radio.Group defaultValue={activeKey} buttonStyle="solid" onChange={handleChange}>
                {
                    list && Array.isArray(list) && list.map((item) =>
                        <Radio.Button key={item.value} value={item.value}>{item.label}</Radio.Button>)
                }
            </Radio.Group>
        </div>
    }

    // 是否显示提示框
    const popoverShow = () => {
        return (
            title.content ?
                (<Popover content={title.content} placement={title.placement}> {title.label} </Popover>) :
                title
        )
    };

    return (<div className={classNames('spec-panel', className, type === 'reverse' ? 'spec-panel-reverse' : '', type === 'border' ? 'spec-panel-border' : '')} style={{...style, height: `${height}px`}}>
            <div className="spec-panel-header">
                <div className="spec-panel-title">
                    <div className={classNames(type === 'border' ? 'sub-header-line' : 'sub-header-base')}>
                        <span>{popoverShow()}</span>
                    </div>
                </div>
                <div className="spec-panel-inner">
                    {/* 显示标识区域 */}
                    {
                        badges && Array.isArray(badges) && <span className="badges">
          {
              badges.map((item) =>
                  <span className="badges-item" key={item.value}>
              <i style={item.color ? {background: item.color} : {}}></i>{item.label}
            </span>)
          }
        </span>
                    }
                </div>
                {cateConfig && <RenderGroupList className="spec-panel-cate" {...cateConfig} />}
                {buttonConfig && <RenderGroupList className="spec-panel-buttons" {...buttonConfig} />}
                {
                    postfix && <div className="spec-panel-extra">{postfix}</div>
                }
            </div>
            <div className="spec-panel-body">
                {children}
            </div>
        </div>
    );
};

export default StandardPanel;
