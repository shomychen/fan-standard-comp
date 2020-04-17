import React from "react";
import {message, Row, Col, Radio} from "antd";
import styles from "./index.less";
// import {RefactorTree} from 'fan-standard-comp';
import {RefactorTree} from "../../../packages/src";

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {title: '0-0-0-0', key: '0-0-0-0'},
          {title: '0-0-0-1', key: '0-0-0-1'},
          {title: '0-0-0-2', key: '0-0-0-2'},
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {title: '0-0-1-0', key: '0-0-1-0'},
          {title: '0-0-1-1', key: '0-0-1-1'},
          {title: '0-0-1-2', key: '0-0-1-2'},
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {title: '0-1-0-0', key: '0-1-0-0'},
      {title: '0-1-0-1', key: '0-1-0-1'},
      {title: '0-1-0-2', key: '0-1-0-2'},
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

class App extends React.Component {
  state = {
    visible: false,
    treeCheckKeys: ["2-1", '2-2'],
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
    limitSelectedKeys: ['1-1'],
    mode: 'history', // 更改模式
  };
  // 树的选择
  handleTreeSelect = (key, e, data, selectedDatas) => {
    console.log('按钮点击', key, e, data, selectedDatas)
    this.setState({
      limitSelectedKeys: key
    })
    message.info('选择树节点ID：' + key.join(','))
  };

  handleTreeChecked = (keys, e, curentLeaf, allLeaf) => {
    console.log('点击选择', keys, e, curentLeaf, allLeaf)
    this.setState({
      treeCheckKeys: keys
    })
  }
  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({checkedKeys});
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({selectedKeys});
  };

  render() {
    return (
      <Row>
        <Col span={12}>
          <Radio.Group onChange={(e) => {
            if (e.target.value === 'current') {}
            this.setState({mode: e.target.value})
          }} value={this.state.mode}>
            <Radio value={'current'}>
              current
            </Radio>
            <Radio value={'history'}>
              history
            </Radio>
          </Radio.Group>
          <RefactorTree
            showLine
            checkable={this.state.mode === 'current'}
            checkStrictly
            selectedKeys={this.state.mode === 'history' ? this.state.limitSelectedKeys :['1-1-1']}
            onSelect={this.handleTreeSelect}
            onCheck={this.handleTreeChecked}
            checkedKeys={this.state.treeCheckKeys}
            // defaultCheckedKeys={this.state.treeCheckKeys}
            optionName={{key: 'id', title: 'name', children: 'items', disabled: 'unnormal'}}
            limitKey={this.state.mode === 'current' ? 'levelType' : null}
            selectable={this.state.mode === 'history'} // 设置为false时，selectedKeys不能更新
            treeData={[
              {
                name: '常规节点1',
                // unnormal: true,
                id: '1',
                levelType: 'level1',
                items: [
                  {
                    name: '常规节点1-1',
                    // unnormal: true,
                    id: '1-1',
                    levelType: 'level2',
                    items: [
                      {
                        name: '常规节点1-1-1',
                        // unnormal: true,
                        id: '1-1-1',
                        levelType: 'level3',
                        items: []
                      },
                      {
                        name: '常规节点1-1-2',
                        // unnormal: true,
                        id: '1-1-2',
                        levelType: 'level3',
                        items: []
                      }
                    ]
                  },
                  {
                    name: '常规节点1-2',
                    id: '1-2',
                    levelType: 'level2',
                    items: []
                  }
                ]
              },
              {
                name: '常规节点2',
                id: '2',
                levelType: 'level1',
                items: [
                  {
                    name: '常规节点2-1',
                    id: '2-1',
                    levelType: 'level2',
                    items: []
                  },
                  {
                    name: '常规节点2-2',
                    id: '2-2',
                    levelType: 'level2',
                    items: []
                  }
                ]
              },
              {
                name: '常规节点3',
                id: '3',
                levelType: 'level1',
                items: []
              }
            ]} />
        </Col>
        <Col span={12}>
          <RefactorTree
            checkable
            onExpand={this.onExpand}
            expandedKeys={this.state.expandedKeys}
            autoExpandParent={this.state.autoExpandParent}
            onCheck={this.onCheck}
            // checkedKeys={this.state.checkedKeys}
            onSelect={this.onSelect}
            selectedKeys={this.state.selectedKeys}
            treeData={treeData}
          >
          </RefactorTree>
        </Col>
      </Row>
    );
  }
}

export default () => (
  <div className="demo-container">
    <div id="components-modal-demo-basic">
      <App />
    </div>
  </div>
);
