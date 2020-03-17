import React, {useState, Fragment} from "react";
import {Icon, Divider, Form, Input, Col, Row, Button, Card, Tooltip, message, Badge, Popconfirm, Tabs} from 'antd';
import styles from './index.less';
import {StandardModal} from 'fan-standard-comp';
import staticData from './data/staticData.json';
import {general} from '../../../packages/src/data';
import {StandardTable} from '../../../packages/src/';

const FormItem = Form.Item;
const {TextArea} = Input;
const {TabPane} = Tabs;

const TableBiscDemo = (props) => {
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
      title: '是否系统内置',
      key: 'isIn',
      dataIndex: 'isIn',
      width: 140,
      align: 'center',
      render: (text) => text === 'Y' ? <Badge status="success" text="是" /> : <Badge status="default" text="否" />,
    },
    {
      title: '状态',

      width: 80,
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      render: (text) => text === 'Y' ? <Badge status="success" text="启用" /> : <Badge status="default" text="禁用" />
    },
    {
      title: '是否显示',
      width: 100,
      key: 'isShow',
      align: 'center',
      dataIndex: 'isShow',
      render: (text) => text === 'Y' ? <Badge status="success" text="显示" /> : <Badge status="default" text="隐藏" />,
    },
    {
      title: '审核进度',
      key: 'progress',
      dataIndex: 'progress',
      render: (text) => {
        let statusBadge
        let statusInfo
        switch (text) {
          case 'ing':
            statusBadge = <Badge status="processing" text="审批中" />
            statusInfo = '表示审批中，进行中'
            break;
          case 'success':
            statusBadge = <Badge status="success" text="有效" />
            statusInfo = '表示有效，可用，正常，已启用状态'
            break;
          case 'fail':
            statusBadge = <Badge status="error" text="已到期" />
            statusInfo = '表示已到期，警告，已超限状态'
            break;
          case 'warning':
            statusBadge = <Badge status="warning" text="即将到期" />
            statusInfo = '表示即将到期，提醒，警示'
            break;
          case 'default':
            statusBadge = <Badge status="default" text="已中止" />
            statusInfo = '表示已中止，不可用，失效，未启用'
            break;
          case 'newer':
            statusBadge = <Badge status="newer" text="新建" />
            statusInfo = '表示新建'
            break;
          default:
            return '-'
            break;
        }
        return <Tooltip placement="right" title={statusInfo}>
          {statusBadge}
        </Tooltip>
      }
    },
    {
      title: '弹窗类型',
      key: 'none',
      align: 'center',
      dataIndex: 'none',
      render: (text, record, index) => {
        return <>
          {
            index === 0 ? <a onClick={() => handleControlType('add', text)}>使用formItemGroup配置</a> : null
          }
          {
            index === 1 ? <a onClick={() => handleControlType('edit', text)}>自已配置DOM结构</a> : null
          }
          {
            index === 2 ? <a onClick={() => handleControlType('group', text)}>formItemGroup带分类</a> : null
          }
        </>
      },
    },
    {
      title: '操作',
      width: 50,
      align: 'center',
      render: (text, record, index) => (
        <>
          <a onClick={() => handleControlType('edit', text, index)}>编辑</a>
        </>
      ),
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      render: (text, record, index) => (
        <>
          <a onClick={() => handleControlType('edit', text, index)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            placement="top"
            title={'确定要删除：XXX吗？'}
            icon={<Icon type="question-circle-o" />}
            okText="确认"
            cancelText="取消"
          >
            <a onClick={() => handleControlType('delete', text, index)}>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => handleControlType('delete', text, index)}>详情</a>
        </>
      ),
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      render: (text, record, index) => (
        <>
          <a onClick={() => handleControlType('edit', text, index)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            placement="topRight"
            title={'确定要删除：XXX吗？'}
            icon={<Icon type="question-circle-o" />}
            okText="确认"
            cancelText="取消"
          >
            <a onClick={() => handleControlType('delete', text, index)}>删除</a>
          </Popconfirm>
        </>
      ),
    },

    {
      title: '操作',
      width: 120,
      align: 'center',
      type: 'action',
      buttonGroup: [
        {
          code: 'codeBtnDetail', // 详情
          isHide: (text, record, index) => index === 1,
          fn: (text, record, index) => handleControlType('detail', text, index),
        },
        {
          code: 'codeBtnUpdate', // 编辑
          fn: (text, record, index) => handleControlType('edit', text, index),
        },
        {
          code: 'codeBtnDelete', // 删除
          fn: (text, record, index) => handleControlType('delete', text, index),
          confirmText: text => `确定要删除菜单：${text.menuName}吗？`,
        },
      ],
    },
  ];

  // 编辑表单弹窗
  const [editModalSize, setEditModalSize] = useState('md')
  const [editVisible, setEditVisible] = useState(false)
  const modalControlBtn = [
    {
      name: '提交审批',
      fn: (btnData, modalForm) => handleEditSubmit('submitAppr', modalForm),
    },
    {
      name: '仅保存',
      type: 'default',
      fn: (btnData, modalForm) => handleEditSubmit('submitSave', modalForm),
    },
    {
      name: '取消',
      type: 'default',
      fn: (btnData, modalForm) => () => setEditVisible(false),
    },
  ]
  // 操作类型事件：编辑、添加、删除
  const handleControlType = (key, text, index) => {
    // 编辑
    if (key === 'edit') {
      console.log('编辑')
      setEditVisible(true)
    }
    // 编辑
    if (key === 'group') {
      setEditVisible(true)
    }
    // 新增
    if (key === 'add') {
      console.log('新增')
      setModalSetting({
        ...modalSetting,
        visible: true,
        title: '新增代码管理',
        confirmText: '保存并新增'
      })
    }
    // 删除
    if (key === 'delete') {
      console.log('删除')
    }
  };

  const handleEditSubmit = (key) => {
    const {form} = props;
    if (key === 'submitAppr') {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        console.log('完成提交', fieldsValue);
        setEditVisible(false)
      });
    } else {
      message.info('仅保存');
    }
  }

  const handleChangeTabs = (key) => {
    console.log(key);
  }

  const [rateList, setRateList] = useState([{num: '', price: ''}])
  const addRate = (index) => {
    rateList.splice(index + 1, 0, {num: '', price: ''})
    setRateList([...rateList])
  }

  return (<div className={styles.container}>
    <div id="components-modal-demo-basic">
      <StandardTable
        rowKey='id'
        columns={columns}
        data={{
          list: staticData.tableData
        }}
        // scroll={{x: 'max-content'}}
        // onChange={this.handleTableChange}
      />

      <StandardModal
        title={`${editModalSize === 'md' ? '弹窗size="md"' : ''}${editModalSize === 'sm' ? '弹窗size="sm"' : ''}${editModalSize === 'lg' ? '弹窗size="lg"' : ''}`}
        visible={editVisible}
        size={editModalSize}
        confirmText={'保存'}
        onSubmit={handleEditSubmit}
        onCancel={() => setEditVisible(false)}
        footerButtonGroup={modalControlBtn}
      >
        <h3>此弹窗完全自己定义表单结构，没有配置formItemGroup</h3>
        <div style={{'textAlign': 'center'}}>更改弹窗大小:
          <Button onClick={() => setEditModalSize('sm')} type={'primary'}>sm:680px</Button>
          <Button onClick={() => setEditModalSize('md')} type={'primary'}>md:780px</Button>
          <Button onClick={() => setEditModalSize('lg')} type={'primary'}>lg:1000px</Button>
        </div>
        <Form onSubmit={handleEditSubmit}>
          <Tabs onChange={handleChangeTabs} type="card">
            <TabPane tab="基本信息" key="1">
              <Row type={'flex'}>
                <Col span={editModalSize === 'lg' ? 8 : 12}>
                  <FormItem label="编辑功能名称"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                    {props.form.getFieldDecorator('name', Object.assign(
                      {
                        rules: [{required: true, message: '请输入功能名称'}],
                      },
                    ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                  </FormItem>
                </Col>
                <Col span={editModalSize === 'lg' ? 8 : 12}>
                  <FormItem label="禁用"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                    <Input disabled placeholder="请输入" style={{...general.formItemStyle.wide}} />
                  </FormItem>
                </Col>
                <Col span={editModalSize === 'lg' ? 8 : 12}>
                  <FormItem label="中文名称"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                    {props.form.getFieldDecorator('nameCn', Object.assign(
                      {
                        rules: [{required: true, message: '请输入中文名称'}],
                      },
                    ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                  </FormItem>
                </Col>
                <Col span={editModalSize === 'lg' ? 8 : 12}>
                  <FormItem label="参数名称"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                    {props.form.getFieldDecorator('paramCn', Object.assign(
                      {
                        rules: [{required: true, message: '请输入参数名称'}],
                      },
                    ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                  </FormItem>
                </Col>
                <Col span={editModalSize === 'lg' ? 8 : 12}>
                  <FormItem label="参数英文"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                    {props.form.getFieldDecorator('param', Object.assign(
                      {
                        rules: [{required: true, message: '请输入参数英文'}],
                      },
                    ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label={'独立一行'}
                    {...general.modalSize[editModalSize].formBlockLayout}
                    required={true}
                  >
                    <TextArea placeholder="请输入" style={{...general.formItemStyle.wide}} />
                  </FormItem>
                </Col>
                <Col span={24}>
                  {/*  <FormItem label="消息模板"
                            {...general.modalSize[editModalSize].formBlockLayout}>
                    {props.form.getFieldDecorator('smgTemplate', Object.assign(
                      {
                        initialValue: '3232',
                        // rules: [{ required: true, message: '请输入功能名称' }],
                      },
                    ))(<VarTemplate tags={[{
                      "variable_name": "设备名称",
                      "variable_name_formatted": "[设备名称]"
                    },
                      {
                        "variable_name": "报警时间",
                        "variable_name_formatted": "[报警时间]"
                      }
                    ]} />)}
                  </FormItem> */}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="租赁条款" key="2">
              <Row type={'flex'}>
                {
                  rateList.map((item, index) => {
                    return <Fragment key={index}>
                      <Col span={editModalSize === 'lg' ? 8 : 12}>
                        <FormItem label="参数值1"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                          {props.form.getFieldDecorator(`num${index}`, Object.assign(
                            {
                              // rules: [{ required: true, message: '请输入' }],
                            },
                          ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                        </FormItem>
                      </Col>
                      <Col span={editModalSize === 'lg' ? 8 : 12}>
                        <FormItem label="参数值2"  {...general.modalSize[editModalSize === 'lg' ? 'lg' : 'sm'].formLayout}>
                          {props.form.getFieldDecorator(`price{index}`, Object.assign(
                            {
                              // rules: [{ required: true, message: '请输入' }],
                            },
                          ))(<Input placeholder="请输入" style={{...general.formItemStyle.wide}} />)}
                        </FormItem>
                      </Col>
                      <Col span={editModalSize === 'lg' ? 8 : 12}>
                        <Button onClick={() => addRate(index)} icon="plus-circle"></Button>
                      </Col>
                    </Fragment>
                  })
                }
              </Row>
            </TabPane>
            <TabPane tab="审批" key="3" disabled>
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Form>
      </StandardModal>

    </div>
  </div>)
}

export default Form.create()(TableBiscDemo);
