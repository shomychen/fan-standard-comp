import React, { useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { Table, Card, Menu, Divider, Popconfirm, Icon, Dropdown } from 'antd';
import ButtonGroup from '../ButtonGroup'
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

  const {
    data = {}, rowKey, rowSelection, columns, hideOrderNumber, orderNumber = {}, className, emptyText,
    codes,
    permissionCodes, ...rest
  } = props;
  let resetColumns = [{
    width: 58,
    align: 'center',
    title: '序号',
    key: 'orderNum',
    // fixed: 'left',
    // render: (text, o, index) => pagination ?  (pagination.current - 1) * pagination.pageSize + index + 1 : index + 1,
    render: (text, record, index) => index + 1,
    ...orderNumber,
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
        colItem.width = colItem.width || (colItem.buttonGroup.length > 1 ? 120 : 80)
        colItem.align = 'center'
        colItem.title = colItem.title || '操作'
        colItem.key = 'control'
        // colItem.fixed = colItem.fixed || 'right'
        colItem.render = (text, record, rowIndex) => {
          // 按钮列表组
          const renderTableButtonGroup = (buttonGroup) => {
            if (!buttonGroup) return '-'
            let recombinationGroup = [] // 重组数据
            // 类型为数组
            if (Array.isArray(buttonGroup)) recombinationGroup = buttonGroup
            // 类型为方法
            if (typeof buttonGroup === 'function') recombinationGroup = buttonGroup(text, record, rowIndex) // 方法返回数组结构
            // 判断是否是数组且长度大于0时 ？{如下结构渲染} ： {按buttonGroup返回的node渲染}
            if (Array.isArray(buttonGroup) || typeof buttonGroup === 'function') {
              if (recombinationGroup.length === 0) return '-'
              return <ButtonGroup type="text"
                                  min={colItem.min || 2} // 配置按钮展示最少数量，其他的将会被折叠
                                  options={recombinationGroup}
                                  codes={codes}
                                  permissionCodes={permissionCodes}
                                  rowParams={{ text, record, rowIndex }} />
            }
          }
          return <>
            {renderTableButtonGroup(colItem.buttonGroup)}
          </>
        }
      } else if (!colItem.render) {
        // 若未配置render，则给加个默认的返回方法
        colItem.render = (text, record, rowIndex) => (text || text === 0) ? text : '-';
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
