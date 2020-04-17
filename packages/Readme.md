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
