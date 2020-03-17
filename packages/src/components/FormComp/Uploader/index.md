---
name: 表单组
menu: 上传控件
---

# 上传控件

> 用于上传图片、文件等

## API

```
// 单独引入
import {Uploader} from 'fan-standard-comp';

// 表单配置
{
 type: 'uploader'
 protoConfig: {
  fileType: 'image'
 }
}

```
### API
| 参数      | 说明                                      | 类型         | 默认值 | 参考值 |
|----------|------------------------------------------|-------------|-------|-------|
| fileType |文件类型 | String |  |可选:image/office/zip|
| showUploadList | 是否显示已选列表 | Boolean | true  | -|
| onChange |选择或更改文件上传列表 | Function |  | - |
