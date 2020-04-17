import React from 'react'
import { Uploader } from "../../../packages/src";
import styles from "./index.less"

export default () => (
  <div className="demo-container">
    <div id="components-modal-demo-basic">
      <Uploader
        isOnly={false}
        value={[]}
      />
    </div>
  </div>
)
