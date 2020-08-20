import React, {useRef, useState} from "react";
import styles from "./index.less";
import moment from 'moment';
import {Input, Button, Tooltip, Icon, Form, Radio} from "antd";
import {StandardModal, StandardFilter, Uploader} from "../../../packages/src";
import {general} from '../../../packages/src/data';
// import {StandardFilter} from 'fan-standard-comp';

const FormItem = Form.Item;

const ModalBasic = (props) => {
  const filterChildRef = useRef()
  console.log(filterChildRef)
  const [visible, setVisble] = useState(false)
  const [modalSetting, setModalSetting] = useState({
    visible: false,
    type: 'form',
    size: 'md',
  })
  const showModal = () => {
    setVisble(true)
  };
  const handleOk = e => {
    console.log(e);
    setVisble(false)
  };
  const handleCancel = e => {
    console.log(e);
    setVisble(false)
  };
  // 条件搜索
  const handleFilterSearch = (fileds) => {
    console.log('搜索', fileds)
  };
  // 按钮
  const handleControlType = (type) => {
    console.log('按钮点击', type)
  };

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
        rules: [],
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
      label: '选项d类型',
      type: 'checkbox',
      filedName: 'check',
      // componentStyle: {
      //   // width: '300px'
      // },
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
      ],
      onChange: ()=> {
        console.log('http://localhost:2002', filterChildRef.current)
      }
    },
    {
      label: '时间筛选区域',
      filedName: 'time',
      type: 'rangePicker',
      protoConfig: {
        format: 'YYYY',
        mode: ['year', 'year'],
        placeholder: ['开始年份', "结束年份"]
      }
    }
  ]

  const handleModalSubmit = (fields) => {
    console.log('提交新增表单', fields)
    setModalSetting({
      ...modalSetting,
      visible: false
    })
  }
  const controlBtn = [
    {
      name: '被禁用',
      disabled: true,
      code: 'codeBtnImport', // 导入 直接配置code可不用配置 name 与 icon
      fn: () => handleControlType('edit'),
    },
    {
      name: '被禁用方法',
      disabled: (params)=> {
        console.log('筛选按钮禁用无参数', params)
        return true
      },
      // code: 'codeBtnImport', // 导入 直接配置code可不用配置 name 与 icon
      fn: () => handleControlType('edit'),
    },
    {
      name: '导入',
      // isHide: true, // 隐藏掉的按钮
      code: 'codeBtnImport', // 导入 直接配置code可不用配置 name 与 icon
      fn: () => handleControlType('edit'),
    },
    {
      name: '无code按钮',
      // isHide: true, // 隐藏掉的按钮
      // icon,
      fn: () => handleControlType('add'),
    },
    {
      name: '按钮3',
      // isHide: true, // 隐藏掉的按钮
      icon: 'plus', // 字符串，使用antd的图标
      fn: () => handleControlType('add'),
    },
    {
      name: '超过3个按钮',
      // isHide: true, // 隐藏掉的按钮
      icon: <Icon type="smile" />,
      fn: () => handleControlType('add'),
    },
    {
      name: '超过4个按钮',
      // isHide: true, // 隐藏掉的按钮
      icon: 'speci,plus', //  第一个参数代表图标前缀，第二个参数代表图标类名
      fn: () => handleControlType('add'),
    }
  ]
  const formItemGroup = [
    {
      label: '日期类控件',
      type: 'title',
    },
    {
      label: '日期',
      type: 'datePicker',
      filedName: 'date1',
      // filedOptions: {
      //   initialValue: '2019-08-23 08:02:59'
      // },
    },
    {
      label: '日期dd时间',
      description: '菜单的类型决定URL、映射是否显示，平台、目录不显示，仅菜单时显示',
      type: 'dateTimePicker',
      filedName: 'dateTime',
      protoConfig: {
        format: 'YYYY-MM-DD HH:mm',
        showTime: {
          format: 'HH:mm'
        },
      }
    },
    {
      label: '月选择',
      type: 'monthPicker',
      filedName: 'dateMonth',
      protoConfig: {
        format: "YYYY年MM月"
      }
    },
    {
      label: '日期区间',
      type: 'rangePicker',
      filedName: 'dateRange-1',
      filedOptions: {
        initialValue: [moment('2015/01/01', 'YYYY/MM/DD'), moment('2015/01/01', 'YYYY/MM/DD')]
      }
    },
    {
      label: '日期时间区间',
      type: 'rangeTimePicker',
      filedName: 'dateRange-time',
      display: 'block',
      protoConfig: {
        format: 'YYYY-MM-DD HH:mm',
        showTime: {
          format: 'HH:mm'
        },
      }
    },
    {
      label: '输入框控件',
      type: 'title',
    },
    {
      label: '类别名称',
      type: 'input',
      filedName: 'cateName',
      // placeholder: '请输入类名名称',
      filedOptions: {
        rules: [{required: true, message: '请输入类别名称'}],
        initialValue: '默认名称'
      },
      selectOptions: [],
      componentStyle: {
        width: '160px'
      },
      extra: () => {
        return <span style={{paddingLeft: '4px'}}><Icon type={'search'}></Icon></span>
      },
      onChange: (e) => {
        console.log('输入更改', e.target.value)
      }
    },
    {
      label: '排序',
      type: 'inputNumber',
      filedName: 'sorta'
    },
    {
      label: '类别代码',
      type: 'input',
      filedName: 'catecode',
      display: 'side', // 与其他并排显示
      // placeholder: '请输入类别代码',
      filedOptions: {
        rules: [{required: true, message: '请输入类别代码'}]
      },
      selectOptions: []
    },
    {
      label: '用户状态',
      type: 'select',
      filedName: 'userStatus',
      display: 'side', // 与其他并排显示
      filedOptions: {
        initialValue: '1'
      },
      selectOptions: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '删除',
          value: '1'
        },
        {
          label: '停用',
          value: '2'
        }
      ],
      onChange: (e) => {
        console.log('选择用户状态', e)
      }
    },
    {
      label: '搜索状态',
      type: 'select',
      filedName: 'userStatusSearch',
      display: 'side', // 与其他并排显示
      isHide: (fields)=> fields.userStatus === '2', // 设置隐藏
      protoConfig: {
        showSearch: true
      },
      filedOptions: {
        rules: []
      },
      selectOptions: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '删除',
          value: '1'
        },
        {
          label: '停用',
          value: '2'
        }
      ],
      onChange: (e) => {
        console.log('选择用户状态', e)
      }
    },
    {
      label: '选项类型',
      type: 'checkbox',
      filedName: 'check',
      display: 'block', // 与其他并排显示
      filedOptions: {
        rules: [],
        initialValue: ['1', '3']
      },
      selectOptions: [
        {
          label: '正常',
          value: '0'
        },
        {
          label: '删除',
          value: '1'
        },
        {
          label: '停用',
          value: '2'
        },
        {
          label: '删除删除',
          value: '3'
        },
        {
          label: '停用停用',
          value: '4'
        }
      ],
      onChange: (e) => {
        console.log('选择更改', e)
      }
    },

    {
      label: '下拉树默认用法',
      type: 'tree-select',
      filedName: 'treeSelectName',
      treeData: [
        {
          id: "jd01",
          childPlaceLevel: "building",
          childPlaceLevelName: "楼栋",
          childrenPlace: [
            {
              id: "jd4hao",
              childPlaceLevel: "floor",
              childPlaceLevelName: "楼层",
              childrenPlace: [
                {
                  id: "5d8723d5-90dd-4600-a9f3-7ab666acbfc7",
                  parentId: "jd4hao",
                  childPlaceLevel: "room",
                  childPlaceLevelName: "房间",
                  childrenPlace: [{
                    childPlaceLevel: "",
                    childPlaceLevelName: "",
                    id: "ce6d7dea-1019-11ea-af93-0050568cb502",
                    parentId: "5d8723d5-90dd-4600-a9f3-7ab666acbfc7",
                    placeLevel: "room",
                    placeLevelName: "房间",
                    placeName: "水泵房",
                    placeNo: "sb-01",
                  }],
                  placeLevel: "floor",
                  placeLevelName: "楼层",
                  placeName: "B3层",
                  placeNo: "B3F",
                }
              ],
              placeLevel: "building",
              placeLevelName: "楼栋",
              placeName: "1#,5#裙楼",
            }
          ],
          placeAreaSize: 150000,
          placeLevel: "area",
          placeLevelName: "区域",
          placeName: "厦门弘爱医院",
          placeNo: "vann",
        }
      ],
      treeOptionName: {children: 'childrenPlace', title: 'placeName', value: 'id'},
      onChange: (e) => {
        console.log('选择更改', e)
      }
    },
    {
      label: '下拉树显示完整名称',
      type: 'tree-select',
      filedName: 'treeSelectLevelName',
      showFullLevel: true, // 显示完整级别名称
      separator: '>',
      treeData: [
        {
          id: "jd01",
          childPlaceLevel: "building",
          childPlaceLevelName: "楼栋",
          childrenPlace: [
            {
              id: "jd4hao",
              childPlaceLevel: "floor",
              childPlaceLevelName: "楼层",
              childrenPlace: [
                {
                  id: "5d8723d5-90dd-4600-a9f3-7ab666acbfc7",
                  parentId: "jd4hao",
                  childPlaceLevel: "room",
                  childPlaceLevelName: "房间",
                  childrenPlace: [{
                    childPlaceLevel: "",
                    childPlaceLevelName: "",
                    id: "ce6d7dea-1019-11ea-af93-0050568cb502",
                    parentId: "5d8723d5-90dd-4600-a9f3-7ab666acbfc7",
                    placeLevel: "room",
                    placeLevelName: "房间",
                    placeName: "水泵房",
                    placeNo: "sb-01",
                  }],
                  placeLevel: "floor",
                  placeLevelName: "楼层",
                  placeName: "B3层",
                  placeNo: "B3F",
                }
              ],
              placeLevel: "building",
              placeLevelName: "楼栋",
              placeName: "1#,5#裙楼",
            }
          ],
          placeAreaSize: 150000,
          placeLevel: "area",
          placeLevelName: "区域",
          placeName: "厦门弘爱医院",
          placeNo: "vann",
        }
      ],
      treeOptionName: {children: 'childrenPlace', title: 'placeName', value: 'id'},
      onChange: (e) => {
        console.log('选择更改', e)
      }
    },
    // {
    //   label: '上传文件',
    //   type: 'uploader',
    //   filedName: 'photo',
    //   filedOptions: {},
    //   protoConfig: {
    //     fileType: 'office' // 支持文件 .doc,.docx,.pdf,.xls,.xlsx
    //   }
    // },
    {
      label: '备注',
      type: 'textarea',
      filedName: 'cateMark',
      display: 'block',// 单独显示一行
      filedOptions: {}
    },
    {
      label: <span>标题可以带结构 <Icon type={'smile'}></Icon></span>,
      type: 'title',
    },
    {
      label: '自己定义',
      type: 'custom',
      filedName: 'customMark',
      required: true,
      display: 'block',
      customRender: (itemForm, itemData) => {
        return (<div>
          <div style={{display: 'flex'}}>
            <FormItem label="属性名称" style={{'display': 'flex'}}>
              {itemForm.getFieldDecorator(itemData.filedName, {
                rules: [{required: true, message: '请输入自己定义的属性名称'}]
              })(
                <Input style={{...general.formItemStyle.sm}} />,
              )}</FormItem>
            <FormItem label="属性代码" style={{'display': 'flex'}}><Input
              style={{...general.formItemStyle.sm}} /></FormItem>
          </div>
          <span className="text-warning"> 自定义表单组合必须是经过封装成"表单控件"，不然无法识别到对应的值</span>
        </div>)
      }
    },

    {
      label: '自己定义栅格',
      type: 'input',
      filedName: 'customCol1',
      // colSpan: 10,
      display: {
        labelCol: {span: 8},
        wrapperCol: {span: 8}
      },
    },
    // {
    //   label: '上传图片',
    //   type: 'custom',
    //   filedName: 'pic',
    //   required: true,
    //   display: 'block',
    //   customRender: (itemForm, itemData) => {
    //     return ( <FormItem>
    //       {itemForm.getFieldDecorator(itemData.filedName, {
    //         rules: [{ required: false, message: '请上传图片' }],
    //       })(
    //         <Uploader
    //           name="maintainPics"
    //           fileType="image"
    //         />,
    //       )}</FormItem>)
    //   }
    // },
    {
      label: <div>
        <div>自己定义DOM结构</div>
        <div>自己定义DOM结构</div>
      </div>,
      type: 'html',
    },
  ]
  return (
    <div className="demo-container">
      <div id="components-modal-demo-basic">
        <StandardFilter formItemGroup={controlFilters}
                        ref={filterChildRef}
                        // permissionCodes={['codeBtnDetail', 'codeBtnCreate']}
                        buttonGroup={controlBtn}
                        onFilterSearch={handleFilterSearch} />
        <Button type="primary" onClick={showModal}>
          弹窗基础用法
        </Button>
        <Button type="primary" onClick={() => setModalSetting({...modalSetting, title: '配置表单', visible: true})}>
          弹窗内表单是配置出来的
        </Button>
        <Button type="primary">
          配置弹窗所有表单禁用
        </Button>
        <StandardModal
          title="弹窗基础用法"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <p>超出视图显示内滚动</p>
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
          </div>
        </StandardModal>

        <StandardModal
          {...modalSetting}
          formItemGroup={formItemGroup}
          onCancel={() => setModalSetting({...modalSetting, visible: false})}
          onSubmit={handleModalSubmit}
        >
          <h3>当前是由 formItemGroup 配置出来的</h3>
          <div style={{padding: '16px', border: ' 1px solid #b7eb8f', background: '#f6ffed', marginBottom: '16px'}}>
            <h3>栅格配置说明</h3>
            <p>①如果弹窗尺寸为 lg,
              则行内表单配置col为8,分三栏显示，其他两个尺寸直接设置24;<br />②FormItem的栅格配置，如果是栅格则配置 <b>“...general.modalSize[modalProps.size].formLayout”</b>，
              如果是一行只显示一个表单域，则配置 <b>...general.modalSize[modalProps.size].formBlockLayout</b><br />③表单域（如Input）可通过参数
              componentStyle 配置其宽度等样式，或者使用extra 在其后面的位置新增内容</p>
          </div>
          <div style={{'textAlign': 'center', marginBottom: '10px'}}>更改弹窗大小:
            <Button onClick={() => setModalSetting({...modalSetting, size: 'xs'})} type={'primary'}>xs:420px</Button>
            <Button onClick={() => setModalSetting({...modalSetting, size: 'sm'})} type={'primary'}>sm:680px</Button>
            <Button onClick={() => setModalSetting({...modalSetting, size: 'md'})} type={'primary'}>md:780px</Button>
            <Button onClick={() => setModalSetting({...modalSetting, size: 'lg'})} type={'primary'}>lg:1000px</Button>
          </div>
          <div style={{'textAlign': 'center', marginBottom: '10px'}}>更改弹窗配置:
            {/*<Button onClick={() => setModalSetting({...modalSetting, disabledAll: true})} type={'primary'}>禁用弹窗配置的表单</Button>*/}
            <Button onClick={() => setModalSetting({...modalSetting, fieldStatus: null})} type={'primary'}>恢复默认</Button>
            <Button onClick={() => setModalSetting({...modalSetting, fieldStatus: 'disabled'})} type={'primary'}>禁用弹窗配置的表单</Button>
            <Button onClick={() => setModalSetting({...modalSetting, fieldStatus: 'viewOnly'})} type={'primary'}>弹窗仅显示详情信息</Button>
          </div>
          <div style={{'textAlign': 'center', marginBottom: '10px'}}>隐藏底部按钮:
            {/*<Button onClick={() => setModalSetting({...modalSetting, disabledAll: true})} type={'primary'}>禁用弹窗配置的表单</Button>*/}
            <Button onClick={() => setModalSetting({...modalSetting, hideFooter: true})} type={'primary'}>隐藏底部按钮</Button>
            <Button onClick={() => setModalSetting({...modalSetting, hideFooter: false})} type={'primary'}>显示底部按钮</Button>
          </div>
        </StandardModal>
      </div>
    </div>
  );
}

export default Form.create()(ModalBasic);
