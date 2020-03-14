---
menu: 通用组件
name: StandardFilter
---
# 筛选工具栏

> 用在表格上方的筛选工具栏

## 基础用法

```html
import StandardFilter from '@/components/StandardFilter';

const StandardFilterDemo = (props) => {
// 按钮组配置
 const controlBtn = [
    {
      code: 'codeBtnAdd', // 新增 直接配置code可不用配置 name 与 icon
      disabled: checkFuncPermission(props.route, 'codeBtnAdd'),
      fn: () => handleControlType('add'),
    },
    {
      code: 'codeBtnImport', // 导入 直接配置code可不用配置 name 与 icon
      disabled: checkFuncPermission(props.route, 'codeBtnImport'),
      fn: () => handleControlType('edit'),
    },
    {
      name: '无code按钮',
      icon: 'plus',
      fn: () => handleControlType('add'),
    },
    {
      name: '按钮3',
      icon: 'plus',
      fn: () => handleControlType('add'),
    },
  ]
// 表单配置
const controlFilters = [
    {
      label: (<span>是否系统内置&nbsp;
        <Tooltip title="只有超管可以选择“是”，其他角色默认选择“否”"><Icon type="info-circle" /></Tooltip>
              </span>),
      type: 'input',
      filedName: 'name',
      protoConfig: {
        type: 'password',
        prefix: <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>
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
      ]
    },
    {
      label: '用户状态',
      type: 'select',
      filedName: 'status',
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
      ]
    }
  ]
  // 条件搜索
  const handleFilterSearch = (fileds) => {
    console.log('搜索', fileds)
  };

  const handleFilterReset = () => {
    console.log('重置搜索表单')
  }
  
   // 使用ref调用筛选组件内的重置表单事件 
    const filterChild = React.createRef();
   // filterChild.current.resetFields()
   return (<StandardFilter buttonGroup={controlBtn} 
                  formItemGroup={controlFilters}
                  ref={filterChild}
                  onFilterSearch={handleFilterSearch}
                  onFilterReset={handleFilterReset}/>
  ）
};

export default StandardFilterDemo;
```

## API
| 参数字段      | 说明  |   类型   |必选项| 默认值/参考值|
|----------|------|-------------|------|------|
| formItemGroup | 表单组 | Array or ReactNode | 是 | Array值查看 formItemGroup API |
| buttonGroup | 按钮组 | Array or ReactNode  | 否 | Array值查看 buttonGroup API |
| onFilterSearch | 点击查询搜索条件 | Function(fields) | 是 | - |
| onFilterReset | 点击重置搜索条件 | Function(fields) | 是 | -|


### formItemGroup API
| 参数字段      | 说明  |   类型   |必选项| 参考值|
|----------|------|-------------|------|------|
| label | 标签名称/条件名称 | String | 是 |- |
| type | 控件类型 | String | 是 | 可以选择 input/select |
| filedName | 控件名称 | String | 是 |参考  [getFieldDecorator(id, options) 参数](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-参数) |
| filedOptions | 控件配置项 | String | 否 |参考  [getFieldDecorator(id, options) 参数](https://ant.design/components/form-cn/#getFieldDecorator(id,-options)-参数) |
| selectOptions | 选项列表 | Array | 否 | select/radio/checkbox等使用 ,选项值：{'label': 'xxx', value: 'xxx'}|

### buttonGroup API
| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| name | 按钮文本 | String | 是 |
| icon | 图标类名 | String | 否 |
| type | 按钮类型 | String | 否 |
| fn | 按钮点击事件 | Function | 否 |
| code | 权限code，可决定name即按钮上的显示值，覆盖name值 | String | 否 |
| exName | 当设置code时，会优先使用exName作为按钮上的文本显示值 | String | 否 |
| isHide | 隐藏当前按钮 | Boolean | 否 |
