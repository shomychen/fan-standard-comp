import { css } from 'docz-plugin-umi-css'
// import reactExternal from './docz.plugin';
export default {
  typescript: true,
  src: './docs', // 指定编辑转换的入口目录
  // files: '**/*.{md,markdown,mdx}',
  title: "组件用法",
  description: "这个是描述会加入到meta中",
  // port: 8011,
  base: '/docs-site', // 非根路径打包，URL上添加一层级/comp-docs浏览
  dest: 'docs-site', // 非根路径打包目录
  // 忽略转换文件
  ignore: ['Readme.md'],
  // 菜单配置
  menu: [
    "使用说明",
    {
      name:"通用组件",
      menu: [
        "StandardFilter",
        "StandardModal",
        "StandardPanel",
        "StandardTable",
      ]
    },
    {
      name: "配置化表单",
      menu: [
        "基础控件",
        "表单组"
      ]
    },
    {
      name: "数据展示",
      menu: [
        "tree 树"
      ]
    }
  ],
  // html页面配置
  htmlContext: {
    head: {
      // 引入外部样式表
      links: [
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdn.staticfile.org/antd/3.23.6/antd.min.css'
        // },
        // 代码器样式
        {
          rel: 'stylesheet',
          href: 'https://cdn.bootcss.com/codemirror/5.42.2/theme/dracula.min.css'
        }
      ]
    }
  },
  // 主题配置
  themeConfig: {
    mode: 'light',
    codemirrorTheme: 'dracula',
    colors: {
      // prismTheme: myCustomPrismTheme,
      header: {
        bg: 'tomato',
      },
      // primary: 'tomato',
    },
    breakpoints: {
      tablet: 1280,
    },
    styles: {
      body: {
        fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
        fontSize: 16,
        lineHeight: 1.6,
      },
      Container: {
        p: 4,
        maxWidth: 1280,
      },
    }
  },
  plugins:[
    css({
      preprocessor: 'postcss',
      ruleOpts: {
        exclude: /node_modules\/.*\.css$/,
      },
      cssmodules: false,
    }),
    // .less
    css({
      preprocessor: 'less',
      ruleOpts: {
        exclude: /node_modules\/.*\.less$/,
      },
      cssmodules: false,
      loaderOpts: {
        javascriptEnabled: true
      },
    }),
  ]
}
