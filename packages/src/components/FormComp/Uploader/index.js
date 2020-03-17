import React, { useState, useEffect } from 'react';
import {
  Upload,
  Button,
  Icon,
  message,
} from 'antd';
import StandardModal from '../../StandardModal/index';
const PreviewModal = (props) => {
  const {
    imageURL,
    visible,
    onCancel,
  } = props;
  return (
    <StandardModal visible={visible} footer={null} onCancel={onCancel}>
      <img alt="example" style={{ width: '100%' }} src={imageURL} />
    </StandardModal>
  )
};
const Uploader = React.forwardRef((props, ref) => {
  const {
    isOnly = false,
    name = 'file',
    value,
    fileType,
    children,
    disabled,
    showUploadList = true,
    size = 2 * 1024 * 1024,
    onChange = res => console.log(res),
  } = props;
  // 图片预览
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  // 用于展示的缩略图
  const [fileList, setFileList] = useState([]);
  // 配置
  const config = { name };
  config.accept = getAccept(fileType);
  config.listType = fileType === 'image' ? 'picture-card' : 'text';
  config.fileList = fileList;
  config.showUploadList = showUploadList;
  // 检查文件是否规范
  const checkFile = file => {
    if (fileType === 'image') {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
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
  }
  // 上传前的钩子，可以在此作一些对上传文件的限制拦截
  const beforeUpload = file => {
    return false;
  };

  // 上传文件改变时的状态
  const handleChange = async res => {
    if (res.file.status === 'removed') {
      setFileList(res.fileList);
      if (isOnly) {
        onChange(res.fileList[0] && res.fileList[0].originFileObj);
      } else {
        onChange(res.fileList);
      }
      return;
    }
    const isOk = checkFile(res.file);
    if (isOk) {
      let result;
      const list = res.fileList.map(file => {
        if (!file.url) {
          file.url = file.thumbUrl
        }
        return file;
      });
      result = [...list];
      setFileList(list);
      if (isOnly) {
        onChange(result[0] && result[0].originFileObj);
      } else {
        onChange(result);
      }
    }
  };
  // 点击文件链接或预览图标时的回调
  const onPreview = async file => {
    if (!file.url && !file.preview) {
      const res = await getBase64(file.originFileObj);
      if (res.status === 'success') {
        file.preview = res.url;
      }
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  // 只有上传是图片才有预览功能
  if (fileType === 'image') {
    config.onPreview = onPreview;
  }
  // 渲染上传按钮样式
  const renderChildren = () => {
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
  };

  useEffect(() => {
    if (Object.prototype.toString.call(value) === '[object Array]') {
      setFileList(value.map((file, index) => {
        file.uid = index;
        file.url = file.downloadUrl;
        return file;
      }));
    }
  }, []);

  return (
    <>
      <Upload
        {...props}
        {...config}
        ref={ref}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        className="file-uploader"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {
          children || isOnly ? (fileList.length === 1 ? null : renderChildren()) : (disabled ? null : renderChildren())
        }
      </Upload>
      <PreviewModal
        visible={previewVisible}
        imageURL={previewImage}
        onCancel={() => setPreviewVisible(false)}
      />
    </>
  )
});

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
