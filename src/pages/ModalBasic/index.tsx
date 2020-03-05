import React from "react";
import styles from "./index.less";
import {Modal, Button, Tooltip, Icon} from "antd";
import {StandardModal,} from "../../../packages/src";
import {StandardFilter} from 'fan-standard-comp';

class App extends React.Component {
  state = {visible: false};

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  // 条件搜索
  handleFilterSearch = (fileds) => {
    console.log('搜索', fileds)
  };
  // 按钮
  handleControlType = (type) => {
    console.log('按钮点击', type)
  };

  render() {

    const controlBtn = [
      {
        name: '导入',
        icon: 'plus',
        code: 'codeBtnImport', // 导入 直接配置code可不用配置 name 与 icon
        fn: () => this.handleControlType('edit'),
      },
      {
        name: '无code按钮',
        icon: 'plus',
        fn: () => this.handleControlType('add'),
      },
      {
        name: '按钮3',
        icon: 'plus',
        fn: () => this.handleControlType('add'),
      }
    ]
    const controlFilters = [
      {
        label: (<span>是否系统内置&nbsp;
          <Tooltip title="只有超管可以选择“是”，其他角色默认选择“否”"><Icon type="info-circle" /></Tooltip>
              </span>),
        type: 'input',
        filedName: 'name',
        componentStyle: {
          width: '300px'
        },
        protoConfig: {
          maxLength: 2,
          type: 'password',
          prefix: <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
        },
        filedOptions: {
          rules: []
        },
        selectOptions: []
      },
      {
        label: '部门序号',
        type: 'inputNumber',
        filedName: 'partNo',
        protoConfig: {
          max: 10
        },
        filedOptions: {
          rules: []
        },
        selectOptions: []
      },
      {
        label: '部门编码',
        type: 'input',
        filedName: 'code',
        protoConfig: {
          // disabled: true,
        },
        filedOptions: {
          rules: []
        },
        selectOptions: []
      },
      {
        label: '选项类型',
        type: 'checkbox',
        filedName: 'check',
        filedOptions: {
          rules: []
        },
        // selectOptionName: {
        //   label: 'name',
        //   value: 'key'
        // },
        selectOptions: [
          {
            label: '正常',
            value: '0',
            key: '0'
          },
          {
            label: '删除',
            value: '1',
            key: '1'
          },
          {
            label: '停用',
            value: '2',
            key: '2'
          }
        ]
      },
      {
        label: '状态',
        type: 'radio',
        filedName: 'statusRadio',
        filedOptions: {
          rules: []
        },
        // selectOptionName: {
        //   label: 'name',
        //   value: 'key'
        // },
        selectOptions: [
          {
            label: '启用',
            value: '0',
          },
          {
            label: '停用',
            value: '1',
          }
        ]
      },

      {
        label: '用户状态',
        type: 'select',
        filedName: 'status',
        filedOptions: {
          rules: []
        },
        selectOptionName: {
          label: 'title',
          value: 'id'
        },
        selectOptions: [
          {
            title: '正常',
            id: '0'
          },
          {
            title: '删除',
            id: '1'
          },
          {
            title: '停用',
            id: '2'
          }
        ]
      }
    ]
    return (
      <div>
        <StandardFilter buttonGroup={controlBtn}
                        formItemGroup={controlFilters}
                        onFilterSearch={this.handleFilterSearch} />
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <StandardModal
          title="弹窗基础用法"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </StandardModal>
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
