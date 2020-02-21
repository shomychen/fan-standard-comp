"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var classnames_1 = require("classnames");
var antd_1 = require("antd");
require("./index.less");
var StandardPanel = function (props) {
    var className = props.className, style = props.style, height = props.height, children = props.children, title = props.title, badges = props.badges, cateConfig = props.cateConfig, buttonConfig = props.buttonConfig, type = props.type, postfix = props.postfix;
    var RenderGroupList = function (values) {
        var list = values.list, activeKey = values.activeKey, onChange = values.onChange, className = values.className;
        var handleChange = function (e) {
            if (onChange) {
                onChange(e.target.value);
            }
        };
        return <div className={className}>
            <antd_1.Radio.Group defaultValue={activeKey} buttonStyle="solid" onChange={handleChange}>
                {list && Array.isArray(list) && list.map(function (item) {
            return <antd_1.Radio.Button key={item.value} value={item.value}>{item.label}</antd_1.Radio.Button>;
        })}
            </antd_1.Radio.Group>
        </div>;
    };
    // 是否显示提示框
    var popoverShow = function () {
        return (title.content ?
            (<antd_1.Popover content={title.content} placement={title.placement}> {title.label} </antd_1.Popover>) :
            title);
    };
    return (<div className={classnames_1.default('spec-panel', className, type === 'reverse' ? 'spec-panel-reverse' : '', type === 'border' ? 'spec-panel-border' : '')} style={__assign({}, style, { height: height + "px" })}>
            <div className="spec-panel-header">
                <div className="spec-panel-title">
                    <div className={classnames_1.default(type === 'border' ? 'sub-header-line' : 'sub-header-base')}>
                        <span>{popoverShow()}</span>
                    </div>
                </div>
                <div className="spec-panel-inner">
                    
                    {badges && Array.isArray(badges) && <span className="badges">
          {badges.map(function (item) {
        return <span className="badges-item" key={item.value}>
              <i style={item.color ? { background: item.color } : {}}></i>{item.label}
            </span>;
    })}
        </span>}
                </div>
                {cateConfig && <RenderGroupList className="spec-panel-cate" {...cateConfig}/>}
                {buttonConfig && <RenderGroupList className="spec-panel-buttons" {...buttonConfig}/>}
                {postfix && <div className="spec-panel-extra">{postfix}</div>}
            </div>
            <div className="spec-panel-body">
                {children}
            </div>
        </div>);
};
exports.default = StandardPanel;
