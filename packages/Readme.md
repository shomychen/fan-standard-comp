---
name: 使用说明
route: /
---
## 通用组件库

### 打包命令
集成umi/father工具实现rollup打包

```
$ npm run build
```

### 更新日志

## 1.0.43
`2020-04-16`

- FieldComponent
  - 修复 扩展原始配置参数传入顺序
  
- RenderItemGroup
  - 修复 disabledAll 参数未传入，影响StandardModal的配置全部禁用表单

## 1.0.44
`2020-04-16`
- StandardFilter
  - 修复 配置化表单为 日期区间控件(rangePicker/rangeTimePicker)并指定mode=月或年模式时，表单变化更新（使用onPanelChange 事件触发）
  - 修复 搜索结果提交传值针对"日期控件格式进行转换"

## 1.0.45
`2020-04-17`
- StandardFilter
  - 优化 表单项可配置自己定义控件
  - 新增 getFormFields, 获取当前内部控件数据与表单form

## 1.0.46
` 2020-04-21`
- FieldComponent
  - 修复 tree-select 渲染参数异常
- StandardTable
  - 优化 `columns 操作列`配置 `buttonGroup` 支持方法格式，返回数组进行渲染

## 1.0.47
` 2020-04-27`
- FieldComponent
  - 优化 tree-select 可显示完整层级名称配置`showFullLevel`,及对应名称的分割符参数 `separator`
- StandardModal
  - 优化 `formItemGroup`配置项目内的 `isHide` 支持方法格式`Function(fieldValues, form)`
  - 优化 `type='tree-select` 可显示完整层级名称配置


## 1.0.48,1.0.49
` 2020-04-28`
- FieldComponent
   - 修复 控件类型为`type=select`配置`labelInValue`下只读无法显示值
   - 修复 控件类型为`type=tree-select`,渲染数据异步请求时，值显示为空白
   - 新增 控件类型为`type=select`,新增配置项`selectOptionRender`,可自定义下拉选项展示内容

## 1.0.50
` 2020-05-13`
- FieldComponent
   - 优化 控件为禁用状态时， `placeholder`不显示值
## 1.0.51
` 2020-05-18`
- StandardTable
   - 优化 表格列返回值为0时，显示值0
   - 优化 操作列按钮组配置扩展：禁用\隐藏\授权判断
- StandardFilter
   - 优化 按钮组配置扩展：禁用\隐藏\授权判断
## 1.0.52
` 2020-07-13`
- RenderItemGroup
   - 优化  控件参数配置`display`支持配置值为对象
## 1.0.53(未发布)
` 2020-08-05`
- FieldComponent
   - 优化 控件`select`相关的更改事件`onChange(value, Option)`参数返回值 `Option`累加当前选中数据的完整字段
