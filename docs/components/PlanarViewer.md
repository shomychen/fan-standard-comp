---
name: 平面图预览
menu: 数据展示
---


# 平面图预览

用于展示格式为.svg的二维平面图

## 基本用法

```
import { PlanarViewer } from 'fan-standard-comp';
 <PlanarViewer ref={this.PlanarGraph}
                     id={mapId || `${placeInAlarm ? 'alarmMap' : 'map'}`}
                     planarGraphFile="http://59.61.92.25:8181/spms-ibms/download/map/layout/20191118142438207_23.svg"
                     layerFile={"<?xml version="1.0" standalone="no"?>↵<!DOCTYPE svg PUBLIC "-//↵ ……</g> ↵</g>↵</svg>"}
                     onClickSticky={this.handleClickSticky}
                     onHoverSticky={this.handleHoverSticky}
                     focusUUID={focusUUID}/>
```
## API
| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| id | 生成结构唯一ID | String | - |- |
| planarGraphFile | 用于展示的平面图文件(.svg) | String |  |
| layerFile | 展示标记图标、图形等相关设备结构（SVG文件的HTML结构） | String | - |
| onClickSticky | 标记图标或图形的点击事件 | Function(data) | data:指当前标记存储在DOM上的data数据 |
| onHoverSticky | 标记图标或图形的鼠标经过事件 | Function(data) | data:指当前标记存储在DOM上的data数据 |
| focusUUID | 指定触发某个标记,将视图放大到其位置范围上 | String |-|


