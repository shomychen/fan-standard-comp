---
menu: 通用组件
name: Uploader
---

### 用法

```javascript
import { Uploader } from 'fan-standard-comp';

const initValue = [{ id: 'id', name: '附件', downloadUrl: 'url', ... }] || 'url' || { id: 'id', name: '附件', downloadUrl: 'url', ... }
const fileType = 'image' || 'office' || 'zip'
const extraExt = '.gif,.pdf'
const size = 2 * 1024 * 1024

<Uploader
  fileType={fileType}
  value={initValue}
  extraExt={extraExt}
  isOnly={true}
  size={size}
  onChange={(res) => console.log(res)}
/>

```

### 主要API

| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|-----------|-------------------------------------------|--------------|--------|--------|
| isOnly | 是否可以上传多个文件 | Boolean | false | false |
| size | 允许上传的文件大小 |  | 2 * 1024 * 1024 | 2 * 1024 * 1024 |
| fileType | 允许上传的文件类型 | String | - | image/office/zip   |
| value | 已经上传的文件列表 | Object / String | - |[{ id: 'id', name: '附件', downloadUrl: 'url', ... }] or 'url' or { id: 'id', name: '附件', downloadUrl: 'url', ... }, 建议使用数组对象的形式|
| extraExt | 额外的文件类型 | String | - | 会合并 fileType 支持的类型 |
| onChange | 上传文件改变时的回调 |  Function(fileList)  | - | - |

* 其他API 参考 antd [upload 组件 api](https://ant.design/components/upload-cn/)
