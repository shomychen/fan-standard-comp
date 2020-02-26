/*
* 用于编译的变量文件(主要涉及一些颜色值的替换，基础高度padding等，需要另外的config.js的theme引入 varBuildBase的变量)
* 科技色变量：如techBlue,techGreen，
*/
module.exports = {
  // -------- Colors -----------
  // '@info-color': '#1890ff',
  '@success-color': '#4DC9A5',
  '@processing-color': '#548DFF',
  '@error-color': '#F15B5B',
  '@warning-color': '#FF9A6A',
  '@normal-color': '#999999',
  '@highlight-color': '#fb2727',
  '@white': '#fff',
  '@black': '#000',
  // layout
  '@layout-body-background': '#fff',
  '@layout-header-background': '#fff',
  '@layout-header-height': '56px',
  '@layout-header-padding': '0 0px',
  '@layout-sider-background': '#263548',

  // Base background color for most components
  '@body-background': '#fff',
  '@font-family': 'Microsoft YaHei',
  '@text-color': '#595872',
  '@text-color-secondary': '#9098B1',
  '@text-color-dark': '#4C5E76',
  '@text-color-secondary-dark': '#CDDBE8',
  '@heading-color': '@text-color-dark',
  '@font-size-base': '14px',
  '@heading-4-size': '20px',
  '@line-height-base': '1.4',

  '@background-color-light': '#ededed',
  '@background-color-base': '#F3F3F8',

  '@box-shadow-base': '0 0 12px fade(@primary-color, 10%)',
  // vertical paddings
  // '@padding-lg': '20px',
  // '@padding-md': '16px',
  // '@padding-sm': '12px',
  // '@padding-xs': '8px',
  // vertical padding for all form controls
  // '@control-padding-horizontal': '8px',
  // Border color
  '@border-color-base': '#D7D7E3', // #EBEBF0
  '@border-color-split': 'rgba(238, 238, 238, 0.71)',
  // Form
  // ---
  '@label-color': '@text-color', // 同'text-color

  // Buttons
  // '@btn-padding-base': '0 16px',
  // '@btn-height-base': '32px',
  // '@btn-height-lg': '36px',
  // '@btn-font-size-sm': '14px',

  // Input
  // ---
  // '@input-height-base': '32px',
  // '@input-height-lg': '36px',
  // '@input-padding-horizontal': '8px', // 8px
  // '@input-padding-horizontal-lg': '16px',

  // '@form-item-margin-bottom': '16px',
  // Menu
  // ---
  '@menu-inline-toplevel-item-height': '72px',
  '@menu-item-height': '72px',
  '@menu-icon-size': '24px',
  '@menu-item-active-border-width': '4px',
  // '@menu-item-active-bg': '#1A2634',
  // '@menu-highlight-color': '#fff',
  '@menu-dark-color': 'color(~`colorPalette("@{primary-color}", 4)`)',
  // '@menu-dark-bg': 'url(\'/images/sideer-bg.png\') #143179 left bottom no-repeat',
  // dark theme Menu
  '@menu-dark-bg': '#263548',
  '@menu-dark-arrow-color': 'color(~`colorPalette("@{primary-color}", 4)`)',
  '@menu-dark-submenu-bg': 'transparent',
  '@menu-dark-highlight-color': '@primary-color',
  '@menu-dark-item-active-bg': '#1A2634',
  '@menu-dark-selected-item-icon-color': '@primary-color',
  '@menu-dark-selected-item-text-color': '@primary-color',

  '@table-header-bg': '#E8EEF3',
  // 'table-header-color': '#000',
  '@table-row-hover-bg': 'fade(@table-header-bg, 10%)',
  '@table-expanded-row-bg': '#f9f9fb',
  // '@table-padding-vertical': '14px',
  // '@table-padding-horizontal': '8px',

  // '@pagination-item-size': '30px',
  '@breadcrumb-last-item-color': '@text-color-dark',
  // Tag
  '@tag-font-size': '12px',
  // modal
  '@modal-header-bg': '#f4f6f6',
  '@modal-body-padding': '@padding-md @padding-lg', // 16px 20px

  // card
  '@card-head-color': '@text-color-dark',
  '@card-padding-base': '@padding-md', // 16px

  // tabs
  '@tabs-card-height': '32px',
  '@tabs-card-active-color': '@text-color',
  '@tabs-hover-color': '@text-color',
  // '@tabs-card-gutter': '-1px',
  '@component-background': '#fff',

  '@tree-node-selected-bg': 'color(~`colorPalette("@{primary-color}", 4)`)',

  '@zindex-message': 2010,
  // '@grid-columns': '24',
  // '@popover-background': '#f4f6f6',
};
