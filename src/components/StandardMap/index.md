# 二维平面图片预览组件


## API

```

import {  StandardMap } from '@/components/StandardComp';

class mapDemo extends Component {

  state ={
    baseInfo: {
      prevKey: '1',
      nextKey: '3',
      noticeOptionName: {
        key: 'id',
        title: 'eqName',
        content: 'eqContent',
        date: 'date',
        level: 'level',
        paramsList: [
          {
            label: '报警系统',
            keyName: 'eqSys'
          },
          {
            label: '设备品牌',
            keyName: 'eqBrand'
          },
          {
            label: '设备型号',
            keyName: 'eqModel'
          },
          {
            label: '处理状态',
            keyName: 'eqStatus',
            type: 'danger' // 显示红色字体
          },
          {
            label: '持续时长',
            keyName: 'lastTime'
          }
        ]
      },
      noticeList: [
        {
          id: '111',
          eqName: '设备故障',
          eqContent: 'ZM-1-L14-05回路故障',
          date: '2018/08/24 09:23:23',
          lastTime: '00:30:23',
          level: '1',
          status: '1',
          eqSys: '视频监控系统1',
          eqBrand: '霍尼韦尔1',
          eqModel: '半球机X01',
          eqStatus: '未处理',
          UUID: '13370789-f10c-4086-9e6a-e9e9d64d6ae9'
        },
        {
          id: '222',
          eqName: '设备离线',
          eqContent: 'CX-2-L4-02回路故障',
          date: '2018/09/14 19:23:23',
          lastTime: '00:30:23',
          level: '2',
          status: '2',
          eqSys: '视频监控系统2',
          eqBrand: '霍尼韦尔2',
          eqModel: '半球机X02',
          eqStatus: '未处理',
          UUID: 'eeb896d8-5508-4a2d-9ccf-d296639db799'
        },
        {
          id: '333',
          eqName: '能耗超标',
          eqContent: 'CX-2-L4-02回路故障',
          date: '2018/09/14 19:23:23',
          lastTime: '00:30:23',
          level: '2',
          status: '3',
          eqSys: '视频监控系统3',
          eqBrand: '霍尼韦尔3',
          eqModel: '半球机X03',
          eqStatus: '未处理',
          UUID: 'f4a29a66-b51c-4111-b5e2-41003c2b8bd2'
        }
      ]
   }
  }
  // 点击上下图层事件
  // @params{string} key // 当前的相对的上下层ID
  // @params{string} type // 当前点击了上一层:prev, 下一层: next
  handleClickFloorStep =(key, type)=> {
    this.setState({
      mapFiles: {
        planarGraphFile: type === 'prev' ? baseMap : baseMapSec, //平面图资源
        layerFile: type === 'prev' ? customLayer : customLayerSec // 设备图层资源
        }
    })
  }
  // 点击警告设备列表“点击处理”事件
  // @params{string} key // 当前的点击的设备列表ID
  // @params{string} type // 当前点击了上一层:prev, 下一层: next
  handleClickNotice = (key, data)=> {
  }
 render () {
 const { baseInfo } = this.state;
   return (
   <StandardMap iconName="baojingshezhi"
                baseInfo={baseInfo}
                onClickStep={(key, type) => this.handleClickFloorStep(key, type)}
                onClickNotice={(key, data) => console.log('点击报警处理', key)}
                 mapFiles={this.state.mapFiles}
                 mapStickyEvent={{
                   onClick: (data) => {
                     message.info('外部点击图层事件：' + data.type)
                   }
                 }}>
   
               </StandardMap>
   )
 }
}
export default mapDemo;
```
### StandardModal props
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| className | 当前组件结构样式类定义 | String | - |- |
| iconName | 当前用于图例展示的图标,即当前模块设备的图标 | String | - |值查看 baseInfo API |
| baseInfo | 设置上下层切换的id及报警信息 | Object |  |- |
| mapId | 指定二维图窗口的ID | String |-  |- |
| mapFiles | 设置当前二维图层及设备图层数据源 | Object | - |值查看 mapFiles API |
| onClickStep | 指定用于显示节点的字段名称 | Function(key, type) |-|key:当前的相对的上下层ID, type: 当前点击类型(上一层:prev, 下一层: next) |
| onClickNotice | 点击警告设备列表“点击处理”事件 |  Function(key, data) | -  |key:当前的警告信息ID,data,当前处理的其他数据信息 |
| onClickSticky | 点击二维图上的设备图标事件 |  Function(data) | -  |-|
| topicParams | 用于二维地图“设备、报警”数据推送监听URL配置 |  Array | -  |-|
| topicUpdate | 推送监听事件更新 |  Function(true) | -  |-|

### baseInfo Object
| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| prevKey | 上一层的楼层ID | String | 否 |
| nextKey | 下一层的楼层ID | String | 否 |
| noticeOptionName | 警告报警列表数据指定字段集合 ,参考{ key: 'id', title: 'title', level: 'level',content: 'content', date: 'date', paramsList: [] };paramsList是指定隐藏的属性数据列表信息，配置名称及指定的字段名| Object | 否 |
| noticeList | 警告报警列表数据 | Array | 否 |


### mapFiles Object
| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| planarGraphFile | 平面图资源 | String | 是 |
| layerFile | 设备图层资源 | String(可以是一个.svg文件，也可以是一串完整的svg标签内容) | 否 |
