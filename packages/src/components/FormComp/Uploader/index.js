import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Upload,
  Button,
  Icon,
  message,
} from 'antd';
import StandardModal from '../../StandardModal/index';

const Uploader = props => {
  const {
    isOnly = false,                     // 是否允许多传
    value,                              // 回选值
    fileType,                           // 文件类型  "image/office/zip..."
    extraExt,                           // 额外的扩展名 ".gif,.jpeg..."
    children,
    size = 2 * 1024 * 1024,             // 文件大小限制
    onChange = () => {},                // 上传文件改变时的状态
  } = props

  // 图片预览数据
  const [showConfig, setShowConfig] = useState({ visible: false, url: '' })
  // 用于展示的缩略图
  const [fileList, setFileList] = useState([])
  useEffect(() => {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      setFileList(value.map((file, index) => {
        file.uid = index
        file.url = file.downloadUrl
        return file
      }))
      return
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
      setFileList([{
        uid: 0,
        url: value.downloadUrl,
        ...value,
      }])
      return
    }
    if (Object.prototype.toString.call(value) === '[object String]') {
      setFileList([{
        uid: 0,
        url: value,
        name: '附件'
      }])
      return
    }
  }, [])

  // 点击文件链接或预览图标时的回调
  const handlePreview = useCallback(async file => {
    if (!file.url && !file.preview) {
      const res = await getBase64(file.originFileObj);
      if (res.status === 'success') {
        file.preview = res.url;
      }
    }
    setShowConfig({ visible: true, url: file.url || file.preview })
  }, [setShowConfig]);

  // 渲染预览窗口
  const renderPreviewComponent = useMemo(
    () => {
      if (fileType === 'image') {
        const { visible, url } = showConfig
        return (
          <StandardModal visible={visible} footer={null} onCancel={() => setShowConfig({ visible: false, url: '' })} >
            <img style={{ width: '100%' }} src={url} alt=""/>
          </StandardModal>
        )
      }
      return null
    },
    [fileType, showConfig, setShowConfig]
  )

  // 展示按钮与否
  const renderChildrenComponent = useMemo(
    () => {
      const renderButton = () => {
        if (fileType === 'image') {
          return (
            <div>
              <Icon type={'plus'} />
              <div className="ant-upload-text">点击选择</div>
            </div>
          )
        }
        return (
          <Button>
            <Icon type={'plus'} /> 点击选择
          </Button>
        )
      }
      if (children) {
        return <> {children} </>
      }
      if (isOnly && fileList.length === 1) {
        return null
      }
      return <>{ renderButton() }</>
    },
    [fileType, isOnly, children, fileList]
  );

  // 检查文件是否规范
  const handleCheck = useCallback(file => {
    if (fileType === 'image') {
      const isImage= file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isImage) {
        message.error('只支持JPG/PNG格式的图片!');
        return false;
      }
    }
    const isLt2M = file.size < size;
    if (!isLt2M) {
      message.error('文件大小不能超过2MB!');
      return false;
    }
    return true;
  }, [fileType, size])

  const handleChange = useCallback(async (res) => {
    if (res.file.status === 'removed') {
      setFileList(res.fileList)
      if (isOnly) {
        onChange(res.fileList[0] && res.fileList[0].originFileObj)
      } else {
        onChange(res.fileList)
      }
      return
    }
    const isOk = handleCheck(res.file)
    if (isOk) {
      let result
      const list = res.fileList.map(file => {
        if (!file.url) {
          file.url = file.thumbUrl
        }
        return file
      });
      result = [...list]
      setFileList(list)
      if (isOnly) {
        onChange(result[0] && result[0].originFileObj)
      } else {
        onChange(result)
      }
    }
  }, [isOnly, onChange, handleCheck, setFileList])

  const accept = useMemo(
    () => {
      let res = getAccept(fileType)
      if (extraExt) {
        res = res + ',' + extraExt
      }
      return res
    },
    [fileType, extraExt]
  )

  return (
    <>
      <Upload
        {...props}
        accept={accept}
        fileList={fileList}
        listType={fileType === 'image' ? 'picture-card' : 'text'}
        className="spec-uploader"
        onPreview={fileType === 'image' ? handlePreview : () => {}}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        { renderChildrenComponent }
      </Upload>
      { renderPreviewComponent }
    </>
  )
}

export default Uploader;

function getBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ status: 'success', url: reader.result });
    reader.onerror = error => resolve({ status: 'error', error });
  })
}

function getAccept(fileType) {
  switch (fileType) {
    case 'image': return '.jpg,.png';
    case 'office': return '.doc,.docx,.pdf,.xls,.xlsx';
    case 'zip': return '.rar,.zip';
    default: return '.rar,.zip,.doc,.docx,.pdf,.jpg,.png';
  }
}
