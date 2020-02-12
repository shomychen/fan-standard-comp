import React from 'react';
import ReactDOM from 'react-dom';

import AutoSuggest from './components/Autosuggest';
import StandardTable from './components/StandardTable/index.jsx';

const suggestions = ['C', 'C++', 'Python', 'Java', 'Javascript', 'PHP'];
const handleSelect = selection => alert(`You selected ${selection}`);

// 表格列
const columns = [
  {
    title: '功能名称',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: '功能代码',
    key: 'code',
    dataIndex: 'code',
  },
  {
    title: '启用',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    render: (text) => text === 'Y' ? '是' : '否',
  },
  {
    title: '操作',
    width: 120,
    align: 'center',
    render: (text, record, index) => (
      <>
        <a onClick={() => handleControlType('edit', text, index)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleControlType('delete', text, index)}>删除</a>
      </>
    ),
  },
];
ReactDOM.render(<div>
  <AutoSuggest suggestions={suggestions} onSelect={handleSelect}/>
  <StandardTable
    columns={columns}></StandardTable>
</div>, document.getElementById('app'));
