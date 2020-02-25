---
menu: 通用组件
name: StandardPanel
---
import { Button } from 'antd'
import 'antd/dist/antd.css';
import { Playground, Props } from 'docz'
import { StandardPanel } from "fan-standard-comp";

#  通用面板组件

##  基础用法
<Playground>
 {() => {
    const buttonConfig = {
      activeKey: '2',
      list: [
        {
          value: '1',
          label: '年'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '日'
        }
      ]
    }
    const panelButton = [
      {
        value: '1',
        label: '年'
      },
      {
        value: '2',
        label: '月'
      },
      {
        value: '3',
        label: '日'
      }
    ]
    return (
      <>
            <StandardPanel title="停车时长占比"
                           buttons={panelButton}
                           height={320}
                           buttonConfig={{ ...buttonConfig, onChange: (key) => console.log('当前点击', key) }}
            >
            <Button type="primary">按钮展示</Button>
              <div>指定高度</div>
              <div>显示图表</div>
              <div>或其他内容</div>
            </StandardPanel>
      </>
    )
  }}
  </Playground>

```javascript
import {StandardPanel} from 'fan-standard-comp;
const StandardPanelDemo = (props) => {
   // filterChild.current.resetFields()
   return (<StandardPanel title="实时车位使用情况" height={320} >
                         <div className="sub-header-line"><span>下划线标题</span></div>
                       </StandardPanel>
  ）
};

export default StandardPanelDemo;
```

##  按钮组用法

```javascript
import {StandardPanel} from 'fan-standard-comp;
const StandardPanelDemo = (props) => {
    const buttonConfig = {
      activeKey: '2',
      list: [
        {
          value: '1',
          label: '年'
        },
        {
          value: '2',
          label: '月'
        },
        {
          value: '3',
          label: '日'
        }
      ]
    }
    const cateConfig = {
      activeKey: '1',
      list: [
        {
          value: '1',
          label: '利用率'
        },
        {
          value: '2',
          label: '周转率'
        }
      ]
    }
    const chartBadges = [
      {
        value: '1',
        label: '总体',
        color: '#528DFF'
      },
      {
        value: '2',
        label: 'B1层',
        color: '#009BAC'
      },
      {
        value: '3',
        label: 'B2层',
        color: '#F8AD34'
      },
      {
        value: '4',
        label: 'B3层',
        color: '#FF9F92'
      }
    ]
   // filterChild.current.resetFields()
   return (<StandardPanel 
      title="停车场运营"
      badges={chartBadges}
      buttonConfig={{ ...buttonConfig, onChange: (key) => console.log('当前点击', key) }}
      cateConfig={{ ...cateConfig, onChange: (key) => console.log('当前点击', key) }}
    >
     <div>不指定高度</div>
     <div>显示图表</div>
     <div>或其他内容</div>
   </StandardPanel>
  ）
};

export default StandardPanelDemo;
```

##  API
| 参数      | 说明                                      | 类型         | 参考值 |
|----------|------------------------------------------|-------------|-------|
| title | 标题 | String |- |
| type | 展示类型,可配置带边框或底色类型 |String| reverse(标题带底色)/border(带边框线) |
| height | 面板高度 | Boolean | - |
| buttonConfig | 显示在标题栏右侧按钮组配置 |  Object|参考  [buttonConfig) 参数](#buttonconfig-api)|
| cateConfig | 显示在标题栏右侧类别组配置 |  Object| 参考  [buttonConfig) 参数](#buttonconfig-api)|
| badges | 显示于标题栏中间位置的标签组 |Array|- |
| postfix | 标题栏右侧自定义结构 |String/ReactNode|- |

## buttonConfig API
| 参数字段      | 说明  |   类型   |必选项|
|----------|------|-------------|------|
| activeKey | 当前选中按钮 | String | 是 |
| list | 按钮组列表值 | Array(格式：[{ value: '1', label: '年'}]) | 否 |
| onChange | 按钮点击事件 | Function(key) | 否 |
