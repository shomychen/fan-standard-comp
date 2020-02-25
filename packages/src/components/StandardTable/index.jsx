import React, { useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Table, Card, Menu, Divider, Popconfirm, Icon, Dropdown } from 'antd';
import { funcCode } from '../../data';
import './index.less';

const StandardTable = React.forwardRef((props, ref) => {


  const [popVisibleIndex, setPopVisibleIndex] = useState(false)
  const [popRow, setPopRow] = useState({})
  const handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  const { data = {}, rowKey, rowSelection, columns, hideOrderNumber, className, emptyText, ...rest } = props;
  let resetColumns = [{
    width: 58,
    align: 'center',
    title: '序号',
    key: 'orderNum',
    // render: (text, o, index) => pagination ?  (pagination.current - 1) * pagination.pageSize + index + 1 : index + 1,
    render: (text, record, index) => index + 1,
  }]
  const { list = [], pagination } = data;

  const paginationProps = {
    // showQuickJumper: true,
    className: 'spec-pagination',
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '15', '20', '30', '50'],
    showTotal: (total, range) => `${range[0]}-${range[1]}条 共${total}条`,
    ...pagination,
  };


  if (columns) {
    columns.map((colItem) => {
      if (colItem.type === 'action') {
        colItem.width = colItem.width || (colItem.buttonGroup.length > 1 ? 110 : 80)
        colItem.align = 'center'
        colItem.title = '操作'
        colItem.key = 'control'
        colItem.render = (text, record, rowIndex) => {
          const btnIsHide = (isHide) => {
            if (!isHide) return false
            if (typeof isHide === 'function') {
              return isHide(text, record, rowIndex)
            }
            return isHide
          }
          // 按钮列表组
          const renderButtonGroup = (buttonGroup) => {
            const btn = (bItem, index) => {
              if (bItem.render) return bItem.render;
              if (bItem.code && _.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === bItem.code) !== -1) {
                // 如果有配置code，则使用func.code.js里面配置的名称
                bItem = Object.assign(bItem, funcCode.btnFuncCodes[_.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === bItem.code)])
              }
              return (
                <span key={bItem.code}>
                  {
                    index !== 0 && <Divider type="vertical" />
                  }
                  {
                    bItem.code === 'codeBtnDelete' ?
                      <Popconfirm
                        placement="topRight"
                        title={bItem.confirmText ? bItem.confirmText(text, record, rowIndex) : ''}
                        icon={<Icon type="question-circle-o" />}
                        onConfirm={bItem.fn ? () => bItem.fn(text, record, rowIndex) : null}
                      >
                        <a key={bItem.code}
                           type={bItem.type ? bItem.type : 'primary'}
                           icon={bItem.icon ? bItem.icon : ''}
                           disabled={bItem.disabled}>{bItem.exName || bItem.name}</a>
                      </Popconfirm>
                      : <a
                        key={bItem.code}
                        type={bItem.type ? bItem.type : 'primary'}
                        icon={bItem.icon ? bItem.icon : ''}
                        disabled={bItem.disabled}
                        style={btnIsHide(bItem.isHide) ? { display: 'none' } : {}}
                        onClick={bItem.fn ? () => bItem.fn(text, record, rowIndex) : null}
                      >
                        {bItem.exName || bItem.name}
                      </a>
                  }
                </span>);
            };
            const menu = (group) => {
              return (
                <Menu className="spec-table-dropdown">
                  {
                    group.map((gItem) => {
                      if (gItem.code && _.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === gItem.code) !== -1) {
                        // 如果有配置code，则使用func.code.js里面配置的名称
                        gItem = Object.assign(gItem, funcCode.btnFuncCodes[_.findIndex(funcCode.btnFuncCodes, (btnItem) => btnItem.code === gItem.code)])
                      }
                      return (
                        <Menu.Item key={gItem.code} disabled={gItem.disabled}
                                   style={btnIsHide(gItem.isHide) ? { display: 'none' } : {}}>
                          {
                            gItem.code === 'codeBtnDelete' ? <a disabled={gItem.disabled}
                                                                onClick={gItem.fn ? () => {
                                setPopVisibleIndex(rowIndex)
                                setPopRow(gItem)
                              } : null}>{gItem.exName || gItem.name}</a>
                              : <a onClick={gItem.fn ? () => gItem.fn(text, record, rowIndex) : null}
                                   disabled={gItem.disabled}>{gItem.exName || gItem.name}</a>
                          }
                        </Menu.Item>
                      )
                    })
                  }
                </Menu>
              )
            };
            // 判断是否是数组且长度大于0时 ？{如下结构渲染} ： {按buttonGroup返回的node渲染}
            if (Array.isArray(buttonGroup)) {
              // 判断提供数据长度是否大于3，如果超过3个，则后面从第4个开始会在dropdown组件中渲染
              if (buttonGroup.length > 2) {
                const forGroup = buttonGroup.slice(0, 1)
                const forDrop = buttonGroup.slice(1)
                return (
                  <>
                    {forGroup.map((fItem, index) => (index < 1) ? btn(fItem, index) : null)}
                    {
                      <Divider type="vertical" />
                    }

                    <Popconfirm
                      placement="topRight"
                      visible={popVisibleIndex === rowIndex}
                      onCancel={() => setPopVisibleIndex('')}
                      icon={<Icon type="question-circle-o" />}
                      title={popRow.confirmText ? popRow.confirmText(text, record, rowIndex) : ''}
                      onConfirm={popRow.fn ? () => {
                        popRow.fn(text, record, rowIndex)
                        setPopVisibleIndex('')
                      } : null}
                      trigger="click"
                    >
                      <Dropdown overlay={menu(forDrop)} placement="bottomRight">
                        <a type="primary">更多<Icon type="down" /></a>
                      </Dropdown>
                    </Popconfirm>
                  </>);
              }
              return (
                <>
                  {buttonGroup.map((bgItem, index) => btn(bgItem, index))}
                </>);
            }
            return buttonGroup;
          }
          return <>
            {renderButtonGroup(colItem.buttonGroup)}
          </>
        }
      } else if (!colItem.render) {
        // 若未配置render，则给加个默认的返回方法
        colItem.render = (text, record, rowIndex) => text || '-';
        return colItem;
      }
      return colItem
    })
    resetColumns = hideOrderNumber ? columns : resetColumns.concat(columns)
  }

  return (
    <Card className={classNames('standard-table', className)} bordered={false} ref={ref}>
      <Table
        rowKey={rowKey || 'id'}
        rowSelection={rowSelection ? { ...rowSelection, columnWidth: 30 } : rowSelection}
        dataSource={list}
        pagination={paginationProps}
        onChange={handleTableChange}
        columns={resetColumns}
        locale={{
          filterConfirm: '确定',
          filterReset: '重置',
          emptyText: emptyText || '暂无数据',
        }}
        {...rest}
      />
    </Card>
  );
})

export default StandardTable;
