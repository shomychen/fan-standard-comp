import React, { useState, useEffect, useMemo } from "react";
import { Button, Divider, Dropdown, Menu, Popconfirm, Icon } from "antd";
import IconNode from "./IconNode";
import SpecIcon from "../SpecIconFont/index";
import { funcCode } from "../../data/index";
import { removeNoPermission, btnIsDisabled } from '../utils/filterPermission.js';
import './index.less'

const ButtonGroup = (props) => {
  const { type = 'button', rowParams = { text: undefined, record: undefined, rowIndex: undefined }, codes = funcCode.btnFuncCodes, permissionCodes } = props;
  let { options = [], min = 3 } = props; // 最小展示长度不能小于2
  if (!options) return null // 没有配置list返回null
  const [popVisibleIndex, setPopVisibleIndex] = useState(false)
  const [popRow, setPopRow] = useState({})
  const [resetList, setResetList] = useState([])
  useEffect(() => {
    // 重组选项options集合数据，排除：无权限（有配置code,并且不包含permissionCodes内）的数据及，isHide 为true的数据
    setResetList([...removeNoPermission(options, permissionCodes, codes, rowParams)] || [])
    return () => {
      setResetList([])
    }
  }, [options, codes, permissionCodes])
  useEffect(() => {
    setPopVisibleIndex(false)
  }, [rowParams])

  // 渲染按钮多层级形式 (用于筛选)
  const buttonMenu = (group) => {
    return (<Menu>
      {
        group.map((item, index) => {
          if (item.children) {
            return <Menu.SubMenu title={item.exName || item.name} key={index}>
              {
                item.children.map((child, childIndex) => <Menu.Item key={childIndex}>
                  <a onClick={child.fn ? () => child.fn(child) : null}><IconNode icon={child.icon} /> {child.exName || child.name}</a>
                </Menu.Item>)
              }
            </Menu.SubMenu>
          }
          return (
            <Menu.Item key={index}>
              <a onClick={item.fn ? () => item.fn(item) : null}><IconNode icon={item.icon} /> {item.exName || item.name}</a>
            </Menu.Item>
          )
        })
      }
    </Menu>)
  };
  // 渲染按钮形式 (用于筛选)
  const RenderButtonList = (item) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      return <Dropdown overlay={buttonMenu(item.children)} placement="bottomRight">
        <Button type="primary">
          {item.exName || item.name} <SpecIcon name="down" />
        </Button>
      </Dropdown>
    }
    return <Button
      type={item.type ? item.type : 'primary'}
      danger={item.danger}
      disabled={btnIsDisabled(item.disabled, rowParams)}
      onClick={item.fn ? () => item.fn(item) : null}
    >
      <IconNode icon={item.icon} /> {item.exName || item.name}
    </Button>

  }

  // 渲染文本形式多级菜单列表（用于表格）
  const textMenu = (group) => {
    return (
      <Menu className="spec-button-text-dropdown">
        {
          group.map((gItem, gIndex) => {

            if (gItem.children) {
              return <Menu.SubMenu title={gItem.exName || gItem.name} key={gItem}>
                {
                  gItem.children.map((child, childIndex) => <Menu.Item key={childIndex}>
                    <a onClick={child.fn ? () => child.fn(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : null}>
                      {child.render ? child.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (child.exName || child.name)}
                    </a>
                  </Menu.Item>)
                }
              </Menu.SubMenu>
            }
            return <Menu.Item key={gIndex}
                              disabled={btnIsDisabled(gItem.disabled, rowParams)}>
              {
                gItem.hasOwnProperty('confirmText') ? <a disabled={btnIsDisabled(gItem.disabled, rowParams)}
                                                         onClick={gItem.fn ? () => {
                                                           setPopVisibleIndex(rowParams.rowIndex)
                                                           setPopRow(gItem)
                                                         } : null}>
                    {gItem.render ? gItem.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (gItem.exName || gItem.name)}
                  </a>
                  : <a className="spec-button-group-text" onClick={gItem.fn ? () => gItem.fn(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : null}
                       disabled={btnIsDisabled(gItem.disabled, rowParams)}>
                    {gItem.render ? gItem.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (gItem.exName || gItem.name)}
                  </a>
              }
            </Menu.Item>
          })
        }
      </Menu>
    )
  };
  // 渲染文本形式 列表（用于表格）
  const RenderTextList = (item) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      return <Dropdown overlay={textMenu(item.children)} placement="bottomRight">
        <a className="spec-button-group-text">
          {item.render ? item.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (item.exName || item.name)}
          <SpecIcon name="down" />
        </a>
      </Dropdown>
    }
    return <>
      {
        item.hasOwnProperty('confirmText') ?
          <Popconfirm
            placement="topRight"
            title={item.confirmText ? item.confirmText(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : ''}
            icon={<Icon type={"question-circle-o"} />}
            // icon={<QuestionCircleOutlined />}
            onConfirm={item.fn ? () => item.fn(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : null}
          >
            <a className="spec-button-group-text" key={item.index}
               title={item.exName || item.name}
               disabled={btnIsDisabled(item.disabled, rowParams)}
            > {item.render ? item.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (item.exName || item.name)}
            </a>
          </Popconfirm>
          : <a
            className="spec-button-group-text"
            title={item.exName || item.name}
            key={item.index}
            disabled={btnIsDisabled(item.disabled, rowParams)}
            onClick={item.fn ? () => item.fn(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : null}
          >
            {item.render ? item.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : (item.exName || item.name)}
          </a>
      }
    </>
  }
  // 渲染展示的按钮列表
  const renderDisplayButton = (item, index) => {
    if (item.render) {
      return typeof item.render === 'function' ? item.render(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : item.render
    }
    if (type === 'button') {
      /*渲染按钮形式*/
      return <RenderButtonList key={index} {...item}></RenderButtonList>
    }
    /*渲染文本形式*/
    return <RenderTextList key={index} {...item}></RenderTextList>
    /* return <span key={index}>
       {
         // index !== 0 && <Divider type="vertical" />
       }
       <RenderTextList index={index} {...item}></RenderTextList></span>*/
  };
  if (min < 2) min = 2
  if (resetList.length === 0) return (type !== 'button' ? '-' : null)
  if (resetList.length > min) {
    const forGroup = resetList.slice(0, min - 1)
    const forDrop = resetList.slice(min - 1)
    return (
      <span className="spec-button-group">
        {forGroup.map((item, index) => (index < (min - 1)) ? renderDisplayButton(item, index) : null)}
        {
          type === 'button' ? <Dropdown overlay={buttonMenu(forDrop)} placement="bottomRight">
            <Button type="primary">
              更多 <Icon type="down" />
            </Button>
          </Dropdown> : <Popconfirm
            placement="topRight"
            visible={popVisibleIndex === rowParams.rowIndex}
            onCancel={() => setPopVisibleIndex(false)}
            icon={<Icon type={"question-circle-o"} />}
            title={popRow.confirmText ? popRow.confirmText(...Object.keys(rowParams).map((pItem) => rowParams[pItem])) : ''}
            onConfirm={popRow.fn ? () => {
              popRow.fn(...Object.keys(rowParams).map((pItem) => rowParams[pItem]))
              setPopVisibleIndex('')
            } : null}
            trigger="click"
          >
            <Dropdown overlay={textMenu(forDrop)} placement="bottomRight">
              <a className="spec-button-group-text">更多 <Icon type={'down'} />
              </a>
            </Dropdown>
          </Popconfirm>
        }
      </span>);
  }
  return (
    <span className="spec-button-group">
      {
        resetList.map((item, index) => renderDisplayButton(item, index))
      }
    </span>
  )
}
export default ButtonGroup
