---
menu: 数据展示
name: SpecIcon 图标
---

> 图标组件使用时，需要引入当前项目相关的图标库文件（只需要在项目入口处或者某个地方引入一次即可），如果需要使用字形图标，还需要引入对应的样式文件
### 基本图标用法 
	<SpecIcon name="user"/>


### 基本图标使用字形显示

	
    <SpecIcon name="user" type="font"/>


### 扩展图标使用
`prefix`前缀配置值根据项目内引入的新图标库前缀为准
	
    <SpecIcon name="user" prefix="sub"/>


## API
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| type | 图标展示源 | String | -|
| prefix | 图标类名前缀(默认speci指基础图标，若项目内业务图标，则会另外定义 ) | String | 'speci' |
| name | 图标类名 | String | - |
| size | 设置图标大小 | String | - |
| style | 设置样式 | Object | - |
| round | 图标底部是否显示图形 | Boolean | - |
| status | 图标状态色（按样式默认指定几种类型颜色） | String | - |

