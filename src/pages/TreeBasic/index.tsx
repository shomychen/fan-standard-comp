import React from "react";
import {message} from "antd";
import styles from "./index.less";
import {RefactorTree} from 'fan-standard-comp';

class App extends React.Component {
  state = {visible: false};
  // 树的选择
  handleTreeSelect = (key, e, data, selectedDatas) => {
    console.log('按钮点击', key, e, data, selectedDatas)
    message.info('选择树节点ID：' + key.join(','))
  };

  render() {
    return (
      <div>
        <RefactorTree
          onSelect={this.handleTreeSelect}
          defaultSelectedKeys={['1-2']}
          optionName={{key: 'id', title: 'name', children: 'items', disabled: 'unnormal'}}
          treeData={[
            {
              name: '常规节点1',
              unnormal: true,
              id: '1',
              items: [
                {
                  name: '常规节点1-1',
                  unnormal: true,
                  id: '1-1',
                  items: []
                },
                {
                  name: '常规节点1-2',
                  id: '1-2',
                  items: []
                }
              ]
            },
            {
              name: '常规节点2',
              id: '2',
              items: [
                {
                  name: '常规节点2-1',
                  id: '2-1',
                  items: []
                },
                {
                  name: '常规节点2-2',
                  id: '2-2',
                  items: []
                }
              ]
            }
          ]} />
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-modal-demo-basic">
      <App />
    </div>
  </div>
);
