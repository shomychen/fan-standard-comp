//  一些排版等基本配置值项 （后期可参考是否放入 locales内)
export default {
  // 表单 响应式排版
  formLayout: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
      md: { span: 20 },
    },
  },
  // 表单提交按钮位置排版
  submitFormLayout:{
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 5 },
      md: { span: 10, offset: 4 },
    },
  },
  // 表单域宽度
  formItemStyle: {
    xs: {
      width: '60px',
    },
    sm: {
      width: '120px',
    },
    xsm: {
      width: '180px',
    },
    md: {
      width: '200px',
    },
    xmd: {
      width: '240px',
    },
    lg: {
      width: '300px',
    },
    xlg: {
      width: '500px',
    },
    wide: {
      width: '100%',
    },
  },
  // 弹窗梯度大小及对应的表单栅格
  modalSize: {
    xs: {
      width: 420,
      formLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      },
      formBlockLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 15 },
      },
    },
    sm: {
      width: 680,
      formLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      formBlockLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19},
      },
    },
    md: {
      width: 780,
      formLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      formBlockLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19},
      },
    },
    // 宽度大，1000px下
    lg: {
      width: 1000,
      formLayout: {
        labelCol: { span: 9 },
        wrapperCol: { span: 15 },
      },
      formBlockLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 21},
      },
    },
    // 超级宽度大，1200px下
    xlg: {
      width: 1200,
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
    },
  },
};
