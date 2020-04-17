import React from 'react'
import { StandardPanel } from "../../../packages/src";
import styles from "./index.less"
import { Row, Col } from 'antd';

const PanelBasic = (props) => {

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
  return <div className="demo-container">
    <Row gutter={16}>
      <Col span={8}>
        <StandardPanel title="停车时长占比"
                       height={320}
                       buttonConfig={{ ...buttonConfig, onChange: (key, data) => console.log('当前点击', key, data) }}
        >
          <div>指定高度</div>
          <div>显示图表</div>
          <div>或其他内容</div>
        </StandardPanel>
      </Col>
    </Row>
  </div>
}

export default PanelBasic;
