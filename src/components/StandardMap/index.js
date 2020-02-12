import React, { Component } from 'react';
import { Spin, Empty } from 'antd';
// import { SpecIcon } from '@/components/RefactorComp'
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import './index.less';
import './markShape.less';
import _ from 'lodash';


let currentRotationAngle = 0; // 当前画布旋转的角度
// 缩放值
const DefaultZoomFactor = 1.075;
const DefaultZoomFactor_mouseWheel = 1.075;
const winHeight = 0;
const winWidth = 0;
let fpWidth = 0;
let fpHeight = 0;
let viewBoxWidth = 100;
let viewBoxHeight = 100;
let rpWidth = 100;
let rpHeight = 100;
let viewBox = [{
  X: 0,
  Y: 0,
  width: 100,
  height: 100,
}];
let rpX;
let rpY;
let vBHo;
let vBWo;
let xfactor;
let yfactor;
let
  zoomScale = 1;
let cvjs_svgScale;
let cvjs_svgTransY;
let cvjs_svgTransX;
let cvjs_svgScaleTrans;
let cvjs_svgWidth;
let cvjs_svgHeight;
let cvjs_svgviewBox;
let
  cvjs_svgWidthHeight100percent;
let actualLLX = 0;
let actualLLY = 0;
let actualURX = 0;
let
  actualURY = 0;
let redlineThickness_scaleFactor;
let
  redlineThickness_drawingFactor; // 图形缩放值
let objectIsZoomedExtents = true;
let
  addedObjectsToExtents = false;
let floorplan_width;
let
  floorplan_height;

let handleGroup;
let canvas_width;
let canvas_height;
let global_scale_X;
let global_scale_Y;
let global_scale;
let delta_x;
let
  delta_y;
let scroll_locationX;
let scroll_locationY;
const scrollMouse_intialized = false;
const selfVar_MouseWheel_isOpen = true; // 启用监听鼠标滚轮事件
const bMouseDown = !1;
const bTempMouseDown = !1;
const bPan = !1;
let firstx;
let firsty;
let lastDx;
let lastDy;
const TouchZoomFactor = 1.1;
let layer_vqdrag;
const totalDragStart = 0;
const string_X = '';
const dx = 0;
const dy = 0;
let vbx;
let vby;
const dragMoveControl = true;
let prevDx = 0;
let prevDy = 0;// 拖动等使用的的方位信息
// 设置标记图形的data数据集合
function setNodeDataValues(attrs) {
  const dataObj = {};
  for (const key in attrs) {
    // 将属性值以 "data-" 开头的将此开头去掉并赋值给新的字段
    if (key.indexOf('data-') === 0) {
      dataObj[key.replace('data-', '')] = attrs[key]
    }
  }
  return dataObj;
}

class PlanarGraph extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.planarGraphFile !== prevState.planarGraphFile || nextProps.layerFile !== prevState.layerFile) {
      return {
        planarGraphFile: nextProps.planarGraphFile,
        layerFile: nextProps.layerFile,
      };
    }
    return null;
  }


  constructor(props) {
    super(props);
    this.state = {
      planarGraphFile: props.planarGraphFile || undefined,
      layerFile: props.layerFile || undefined,
      loadInProgress: false,
      planarViewBox: undefined,
      planarStyle: {},
      planarFinishLoad: false, // 二维图更新成功并结束
      // layerFinishLoad: false,
      relationSVGGroup: {
        rPaper: '',
        controlGroup: '',
        planarSVGGroup: '',
        masterBackground: '',
        StickyLayer: '',
        // StickyLayer // 存储图层结构
      },
      SVGloadedFragment: undefined,
      currentAllMarkShapes: [], // 存储当前的标记图形等图层集合
      deviceInfo: {
        deviceDesc: '',
        deviceSubType: '',
        deviceBrand: '',
        deviceModel: '',
      },
      tipStyle: {},
      showDeviceTip: false,
    };
    this.planar_OnResize = this.planar_OnResize.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    window.addEventListener('resize', this.planar_OnResize) // 监听窗口大小改变
    const rPaper = new Snap(`#${id}FloorPlanar_svg`); // 初始化
    for (const b = document.getElementById(`${id}FloorPlanar_svg`); b.firstChild;) {
      b.removeChild(b.firstChild); // 移除 <def> 等标签
    }
    this.setState({
      relationSVGGroup: {
        rPaper,
      },
    })
    // this.planar_LoadDrawing()
  }

  detectZoom = () => {
    let ratio = 0
    const { screen } = window
    const ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
      ratio = Math.round(ratio * 100);
    }
    return ratio;
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusUUID } = this.props;
    const { planarGraphFile, layerFile } = this.state;

    if (prevState.planarGraphFile !== planarGraphFile) {
      this.planar_LoadDrawing()
    }
    if (prevState.layerFile !== layerFile) {
      this.layer_loadStickyLayerGroup()
    }
    if (focusUUID !== prevProps.focusUUID) {
      this.layer_setZoomInFocus(focusUUID)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.planar_OnResize)
  }

  planar_OnResize = () => {
    this.planarWindowResize_position_WidthHeight(true, 0, 0, 'floorPlan');
  }

  planar_LoadDrawing = () => {
    const { loadInProgress, planarGraphFile, SVGloadedFragment } = this.state;
    if (loadInProgress) return
    this.setState({ loadInProgress: true })
    this.planar_clearAll_BeforeLoad()
    if (!loadInProgress && planarGraphFile) {
      this.setState({ planarFinishLoad: false })
      const loadAjax = Snap.ajax(planarGraphFile, response => {
        if (response.status !== 200) {
          this.setState({ loadInProgress: false, planarFinishLoad: false })
          return
        }
        const domObj = document.createElement('div');
        domObj.innerHTML = response.responseText;
        const ele = Snap(domObj).select('svg');
        this.setState({ SVGloadedFragment: ele })
        this.planar_DoSetUpVq()
      })
      setTimeout(() => {
        if (loadAjax.status !== 200) {
          this.setState({ loadInProgress: false, planarFinishLoad: false })
        }
      }, 3000)
    } else {
      this.setState({ loadInProgress: false, planarFinishLoad: false })
      // console.log(!planarGraphFile ? '暂无二维图文件，画布不载入...' : '已有其他画布载入中...')
    }
  }

  planarWindowResize_position_WidthHeight = (allow, setWd, setHt, ele) => {
    const { id } = this.props;
    if (!document.getElementById(`${id}FloorPlanar`)) return
    const currentContainerEle = document.getElementById(`${id}FloorPlanar`)
    const currentSvgEle = document.getElementById(`${id}FloorPlanar_svg`)
    const newStyle = {
      position: 'absolute',
      display: 'block',
      overflow: 'hidden',
      top: setHt === 0 ? '10px' : 0,
      left: setWd === 0 ? '10px' : 0,
      width: `${setWd === 0 ? currentContainerEle.clientWidth - 20 : setWd}px`, // currentContainerEle.clientWidth - currentSvgEle.getBoundingClientRect().left
      height: `${setHt === 0 ? currentContainerEle.clientHeight - 20 : setHt}px`, // currentContainerEle.clientHeight - currentSvgEle.getBoundingClientRect().top
    }
    this.setState({
      planarStyle: newStyle,
    })
    fpWidth = currentSvgEle.getBBox().width;
    fpHeight = currentSvgEle.getBBox().height;
    rpWidth = fpWidth;
    rpHeight = fpHeight;
    floorplan_width = 0.9 * currentSvgEle.getBBox().width; // 之后用于显示浮层
    floorplan_height = 0.9 * currentSvgEle.getBBox().height; // 之后用于显示浮层
    this.planar_ResizeVq(fpWidth, fpHeight)
  }

  planar_ResizeVq = (width, height) => {
    try {
      viewBoxWidth = width;
      viewBoxHeight = height;
      rpWidth = actualURX - actualLLX;
      rpHeight = actualURY - actualLLY;
      rpX = actualLLX;
      rpY = actualLLY;
      const b = rpWidth / viewBoxWidth;
      const
        f = rpHeight / viewBoxHeight;
      zoomScale = b > f ? f : b;
      this.setState({ planarViewBox: `${rpX} ${rpY} ${rpWidth} ${rpHeight}` })
      viewBox.X = rpX;
      viewBox.Y = rpY;
      viewBoxWidth = rpWidth;
      viewBoxHeight = rpHeight;
      vBHo = viewBoxHeight;
      vBWo = viewBoxWidth
    } catch (error) {
      console.log('planar_ResizeVq error', error)
    }
  }

  planar_DoSetUpVq = () => {
    const { relationSVGGroup, SVGloadedFragment } = this.state;
    let { controlGroup, rPaper, planarSVGGroup } = relationSVGGroup;
    if (controlGroup) {
      controlGroup.remove()
    }
    controlGroup = rPaper.group().attr('id', 'main_control_group');
    this.setState({
      relationSVGGroup: {
        ...relationSVGGroup,
        controlGroup,
      },
    })
    this.planar_InitPlanarSVGGroup()
    this.planar_InitMasterBackgroundGroup(); // 初始化空白图层，将用于拖动画布
    // this.planar_InitStickyLayerGroup(); // 初始化标记图层，用于承载标记、形状等图层
    const l = cvjs_svgHeight / cvjs_svgviewBox[3];
    const m = (cvjs_svgWidth - cvjs_svgviewBox[2] / cvjs_svgviewBox[3] * cvjs_svgHeight) / 2 / l;
    cvjs_svgScaleTrans = `T${m - cvjs_svgviewBox[0]},${0 - cvjs_svgviewBox[1]}S${l},0,0`;
    cvjs_svgTransX = m - cvjs_svgviewBox[0];
    cvjs_svgTransY = 0 - cvjs_svgviewBox[1];
    cvjs_svgScale = l;
    viewBoxWidth = fpWidth;
    viewBoxHeight = fpHeight;
    rpWidth = actualURX - actualLLX;
    rpHeight = actualURY - actualLLY;
    rpX = actualLLX;
    rpY = actualLLY;
    vBHo = viewBoxHeight;
    vBWo = viewBoxWidth;
    xfactor = rpWidth / viewBoxWidth;
    yfactor = rpHeight / viewBoxHeight;
    zoomScale = xfactor > yfactor ? yfactor : xfactor;
    viewBox = {
      X: 0,
      Y: 0,
      width: 0,
      height: 0,
    }
    viewBox.X = actualLLX;
    viewBox.Y = actualLLY;
    viewBoxWidth = rpWidth;
    viewBoxHeight = rpHeight;
    this.planarWindowResize_position_WidthHeight(true, 0, 0, 'floorPlan')
    this.planar_resetZoomPan_SetMasterBackground(); //  执行把 rPaper.getBBox()相关的x,y,height,width赋值给 rPaper
    this.planar_setMasterBackgroundDragEvent(); // 可拖动图标的相关事件
    try {
      this.layer_clearAllMarkShapes_BeforeLoad(); // 载入画布成功后，先清除标记相关数量
      this.planar_OnLoadEnd();
    } catch (A) {
      console.log(A)
    }
  }

  planar_OnLoadEnd = () => {
    this.planar_resetZoomPan()
    currentRotationAngle = 0;
    this.setState({ loadInProgress: false, planarFinishLoad: true })
    this.layer_loadStickyLayerGroup() // 启动图层获取
  }

  planar_clearAll_BeforeLoad = () => {
    const { relationSVGGroup } = this.state;
    const { controlGroup, planarSVGGroup, masterBackground } = relationSVGGroup;
    if (controlGroup) controlGroup.remove()
    if (planarSVGGroup) planarSVGGroup.remove()
    if (masterBackground) masterBackground.remove()
    this.layer_clearAllMarkShapes_BeforeLoad()
  }

  planar_InitPlanarSVGGroup = () => {
    const { id } = this.props;
    const { relationSVGGroup, SVGloadedFragment } = this.state;
    let { rPaper, planarSVGGroup } = relationSVGGroup;
    if (planarSVGGroup) {
      planarSVGGroup.remove()
    }
    planarSVGGroup = rPaper.group().attr({ id: `main_master_${id}FloorPlanar_svg`, class: 'main-planar-svg' })
    rPaper.prepend(planarSVGGroup)
    const wid = 1E4;
    const hgt = 1E4;
    const f = planarSVGGroup.svg(0, 0, wid, hgt, 0, 0, wid, hgt);
    f.add(SVGloadedFragment).attr({ 'svg-info': 'svg-loadfragment' })
    planarSVGGroup.add(f);
    // console.log(planarSVGGroup.select('svg[svg-info="svg-loadfragment"]').select('svg').attr())
    if (planarSVGGroup.select('svg[svg-info="svg-loadfragment"]').select('svg') === null) {
      this.setState({ loadInProgress: false, planarFinishLoad: false })
      // console.log('载入异常')
      return
    }
    const loadedSvgAttrs = planarSVGGroup.select('svg[svg-info="svg-loadfragment"]').select('svg').attr(); // 当前载入的SVG结构
    cvjs_svgviewBox = loadedSvgAttrs.viewBox.split(' ').map(Number) // 载入SVG文件的viewBox
    if (isNaN(Number(loadedSvgAttrs.height))) {
      cvjs_svgWidth = cvjs_svgviewBox[2]
    } else {
      cvjs_svgWidth = Number(loadedSvgAttrs.height); // 载入SVG文件的宽度，如果svg带单位，则去除后面单位的两位数
    }
    if (isNaN(Number(loadedSvgAttrs.height))) {
      cvjs_svgHeight = cvjs_svgviewBox[3]
    } else {
      cvjs_svgHeight = Number(loadedSvgAttrs.height); // 载入SVG文件的宽度，如果svg带单位，则去除后面单位的两位数
    }
    if (cvjs_svgviewBox[2] !== cvjs_svgWidth || cvjs_svgviewBox[3] !== cvjs_svgHeight) {
      actualLLX = 0;
      actualLLY = 0;
      actualURX = cvjs_svgWidth;
      actualURY = cvjs_svgHeight;
    } else {
      actualLLX = cvjs_svgviewBox[0];
      actualLLY = cvjs_svgviewBox[1];
      actualURX = cvjs_svgviewBox[2];
      actualURY = cvjs_svgviewBox[3];
    }
    this.setState({
      planarViewBox: `${cvjs_svgviewBox[0]} ${cvjs_svgviewBox[1]} ${cvjs_svgviewBox[2]} ${cvjs_svgviewBox[3]} `, // 设置当前承载SVG结构窗口的viewBox
      relationSVGGroup: {
        ...relationSVGGroup,
        planarSVGGroup,
      },
    })
  }

  planar_InitMasterBackgroundGroup = () => {
    const { id } = this.props;
    const { relationSVGGroup } = this.state
    let { rPaper, controlGroup, masterBackground } = relationSVGGroup
    if (masterBackground) {
      masterBackground.remove()
    }
    masterBackground = controlGroup.group(rPaper.rect(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight))
    masterBackground.data('id', `master_${id}FloorPlanar_svg`);
    masterBackground.attr({ id: `master_${id}FloorPlanar_svg` });
    masterBackground.attr({
      fill: '#fff',
      'fill-opacity': '0.01',
      'stroke-width': 0,
    });
    controlGroup.prepend(masterBackground)
    this.setState({
      relationSVGGroup: {
        ...relationSVGGroup,
        masterBackground,
      },
    })
  }

  planar_InitStickyLayerGroup = () => {
    const { relationSVGGroup } = this.state
    let { controlGroup, StickyLayer } = relationSVGGroup
    if (StickyLayer) {
      StickyLayer.remove(); // 移除图层所有的DOM
    }
    StickyLayer = controlGroup.group().attr('id', 'markShapesContainer')
    controlGroup.add(StickyLayer)
    this.setState({
      relationSVGGroup: {
        ...relationSVGGroup,
        StickyLayer,
      },
    })
  }

  planar_resetZoomPan_SetMasterBackground = () => {
    const { rPaper } = this.state.relationSVGGroup
    const prevBBox = rPaper.getBBox();
    viewBox.X = prevBBox.x;
    viewBox.Y = prevBBox.y;
    viewBoxWidth = prevBBox.width;
    viewBoxHeight = prevBBox.height;
    vBHo = viewBoxHeight;
    vBWo = viewBoxWidth;
    zoomScale = 1;
    this.setState({ planarViewBox: `${viewBox.X} ${viewBox.Y} ${viewBoxWidth} ${viewBoxHeight}` })
    this.planar_InitMasterBackgroundGroup();
    actualLLX = viewBox.X;
    actualLLY = viewBox.Y;
    actualURX = actualLLX + viewBoxWidth;
    actualURY = actualLLY + viewBoxHeight;
    redlineThickness_scaleFactor = redlineThickness_drawingFactor * Math.sqrt(Math.pow(actualURX - actualLLX, 2) + Math.pow(actualURX - actualLLX, 2));
    objectIsZoomedExtents = true
  }

  planar_setMasterBackgroundDragEvent = () => {
    const { relationSVGGroup: { masterBackground } } = this.state
    const masterdragMove = (dx, dy, x, y, event) => {
      const { id } = this.props;
      const { relationSVGGroup: { masterBackground } } = this.state
      if (totalDragStart !== 2 && totalDragStart < 2 && (Math.abs(lastDx - dx) > 4 || Math.abs(lastDy - dy) > 4) && dragMoveControl) {
        // tip.hide(); // 预留，浮层隐藏
        lastDx = dx;
        lastDy = dy;
        prevDx = dx * zoomScale;
        prevDy = dy * zoomScale;
        x = viewBoxWidth / document.getElementById(`${id}FloorPlanar`).clientWidth;
        y = viewBoxHeight / document.getElementById(`${id}FloorPlanar`).clientWidth;
        x = x > y ? x : y;
        prevDx = dx * x;
        prevDy = dy * x;
        viewBox.X = vbx - prevDx;
        viewBox.Y = vby - prevDy;
        this.setState({ planarViewBox: `${viewBox.X} ${viewBox.Y} ${viewBoxWidth} ${viewBoxHeight}` })
        masterBackground.attr({ cursor: 'move' })
      }
    }
    const masterdragStart = (x, y, event) => {
      lastDy = lastDx = prevDy = prevDx = 0;
      vbx = viewBox.X;
      vby = viewBox.Y;
      event.preventDefault();
      event.stopPropagation();
      // hideOnlyPop(); 预留，隐藏浮层
    }
    const masterdragEnd = event => {
      const { relationSVGGroup: { masterBackground } } = this.state
      masterBackground.attr({ cursor: 'default' })
    }
    masterBackground.drag(masterdragMove, masterdragStart, masterdragEnd);
  }

  planar_zoomForMouseWheel = (locationX, locationY, controlType) => {
    const { id } = this.props;
    const currentContainerEle = document.getElementById(`${id}FloorPlanar`)
    const currentSvgEle = document.getElementById(`${id}FloorPlanar_svg`)
    let curWidth = currentSvgEle.getBBox().width;
    let curHeight = currentSvgEle.getBBox().height;
    const h = curWidth / viewBoxWidth;
    const k = curHeight / viewBoxHeight;
    global_scale = h < k ? h : k;
    curWidth = (curWidth - viewBoxWidth * global_scale) / 2 - viewBox.X * global_scale + currentSvgEle.getBoundingClientRect().left;
    curHeight = (curHeight - viewBoxHeight * global_scale) / 2 - viewBox.Y * global_scale + currentSvgEle.getBoundingClientRect().top;
    locationX += currentContainerEle.scrollLeft;
    locationY += currentContainerEle.scrollTop;
    locationX = ((locationX - curWidth) / global_scale - viewBox.X) / viewBoxWidth;
    locationY = ((locationY - curHeight) / global_scale - viewBox.Y) / viewBoxHeight;
    vBHo = viewBoxHeight;
    vBWo = viewBoxWidth;
    if (controlType === 'zoomIn') {
      viewBoxWidth /= DefaultZoomFactor_mouseWheel;
      viewBoxHeight /= DefaultZoomFactor_mouseWheel;
    } else if (controlType === 'zoomOut') {
      viewBoxWidth *= DefaultZoomFactor_mouseWheel;
      viewBoxHeight *= DefaultZoomFactor_mouseWheel;
    }
    viewBox.X -= (viewBoxWidth - vBWo) * locationX;
    viewBox.Y -= (viewBoxHeight - vBHo) * locationY;
    if (isNaN(viewBox.X) && isNaN(viewBox.Y)) {
      // 还没有生成完成 ===> 不滚动
      viewBox.X = 0
      viewBox.Y = 0
    } else {
      this.setState({ planarViewBox: `${viewBox.X} ${viewBox.Y} ${viewBoxWidth} ${viewBoxHeight}` })
      zoomScale = viewBoxWidth / rpWidth;
      objectIsZoomedExtents = false
    }
  }

  planar_zoomForHandelClick = controlType => {
    vBHo = viewBoxHeight;
    vBWo = viewBoxWidth;
    if (controlType === 'zoomIn') {
      viewBoxWidth /= DefaultZoomFactor;
      viewBoxHeight /= DefaultZoomFactor;
    } else if (controlType === 'zoomOut') {
      viewBoxWidth *= DefaultZoomFactor;
      viewBoxHeight *= DefaultZoomFactor;
    }
    viewBox.X -= (viewBoxWidth - vBWo) / 2;
    viewBox.Y -= (viewBoxHeight - vBHo) / 2;
    zoomScale = viewBoxWidth / rpWidth;
    this.setState({
      planarViewBox: `${viewBox.X} ${viewBox.Y} ${viewBoxWidth} ${viewBoxHeight}`,
    })
  }

  // 还原到最适视图
  planar_resetZoomPan = () => {
    const { relationSVGGroup: { masterBackground } } = this.state;
    addedObjectsToExtents = true;
    // hideOnlyPop();
    if (addedObjectsToExtents) {
      masterBackground.attr({
        transform: 'T0,0S1.0',
      });
      viewBox.X = actualLLX;
      viewBox.Y = actualLLY;
      viewBoxWidth = rpWidth;
      viewBoxHeight = rpHeight;
      vBHo = viewBoxHeight;
      vBWo = viewBoxWidth;
      zoomScale = 1;
      this.setState({ planarViewBox: `${viewBox.X} ${viewBox.Y} ${rpWidth} ${rpHeight}` })
      masterBackground.attr({
        transform: 'T0,0S3.0',
      });
      objectIsZoomedExtents = true
    }
  }

  // 监听鼠标滚动事件
  planar_addMouseWheelControls = e => {
    const { planarFinishLoad } = this.state
    if (!selfVar_MouseWheel_isOpen) return
    if (planarFinishLoad) {
      if (e, e.nativeEvent.deltaY < 0) {
        this.planar_zoomForMouseWheel(scroll_locationX, scroll_locationY, 'zoomIn') // 鼠标 向上滚动，放大画布
      } else {
        this.planar_zoomForMouseWheel(scroll_locationX, scroll_locationY, 'zoomOut')
      }
    }
  }

  // 鼠标 向下滚动，缩小画布
  planar_addMouseMoveControl = e => {
    const { planarFinishLoad } = this.state;
    if (planarFinishLoad) {
      scroll_locationX = e.pageX;
      scroll_locationY = e.pageY
    }
  }

  // 载入标记形状图层
  layer_loadStickyLayerGroup = () => {
    const { planarFinishLoad, relationSVGGroup, layerFile } = this.state;
    let { rPaper, controlGroup, StickyLayer } = relationSVGGroup;
    const _this = this;
    _this.layer_clearAllMarkShapes_BeforeLoad(); // 先清除原来的节点
    if (layerFile && planarFinishLoad) {
      // 文件直接引用方式
      if (layerFile.substr(-4) === '.svg') {
        // 返回一个.svg的文件链接
        Snap.load(layerFile, result => {
          // 在图层处添加对应的结构
          const total = result.selectAll('.markShape');
          StickyLayer = rPaper.group().attr({
            id: 'markShapesContainer',
            class: 'show-model',
          }).add(total)
          controlGroup.add(StickyLayer)
          this.setState({ layerFinishLoad: true })
          this.layer_loadStickyLayerTimer(total);
        })
      } else {
        // 返回是一个字符串
        // 将字符串转成DOM对象
        const domObj = document.createElement('div');
        domObj.innerHTML = layerFile;
        const total = Snap(domObj).selectAll('.markShape');
        StickyLayer = rPaper.group().attr({
          id: 'markShapesContainer',
          class: 'show-model',
        }).add(total)
        controlGroup.add(StickyLayer)
        _this.setState({ layerFinishLoad: true })
        _this.layer_loadStickyLayerTimer(total);
      }
    } else {
      // 不执行图层载入
      _this.setState({ layerFinishLoad: false })
    }
  }

  layer_loadStickyLayerTimer = totalMarkShapes => {
    try {
      this.layer_updateDrawingMarkShapes(totalMarkShapes); // 配置当前载入的所有图形图标等进行鼠标事件及属性值存储
      try {
        this.layer_setIconAnimation() // 此处需要判断是否需要添加动画
      } catch (n) {
        console.log(n)
      }
    } catch (e) {
      console.log('载入图层文件错误提示', e)
    }
  }

  // 设置图标动画
  layer_setIconAnimation = () => {
    const { relationSVGGroup: { rPaper } } = this.state;
    const rotateAnimate = function (elementNode, from, to) {
      Snap.animate(from, to, val => {
        elementNode.attr({
          transform: `rotate(r${val.join(',')})`,
        });
      }, 1400, mina.easein(), () => {
        rotateAnimate(elementNode, from, to)
      });
    }
    const translateAnimate = function (elementNode, from, to) {
      Snap.animate(from, to, val => {
        elementNode.attr({
          transform: `translate(r${val.join(',')})`,
        });
      }, 1400, mina.easein(), () => {
        rotateAnimate(elementNode, from, to)
      });
    }
    const opacityAnimate = function (elementNode, from, to) {
      elementNode.animate({
        opacity: 0.1,
        transform: 'translate(220 0)',
      }, 1500, mina.bounce(), () => {
        elementNode.animate({
          opacity: 1,
          transform: 'translate(0 0)',
        }, 1500, mina.bounce(), () => {
          opacityAnimate(elementNode)
        });
      });
    }
    const hasRotateSvg = rPaper.selectAll('.isRotate');
    for (let ir = 0, irLen = hasRotateSvg.items.length; ir < irLen; ir++) {
      const childUse = hasRotateSvg.items[ir].select('use')
      const getCurValue = hasRotateSvg.items[ir].getBBox();
      let centerX;
      let centerY;
      centerX = getCurValue.x + getCurValue.width / 2 // 获取中间点位置X
      centerY = getCurValue.y + getCurValue.height / 2 // 获取中间点位置Y
      rotateAnimate(childUse, [0, centerX, centerY], [360, centerX, centerY])
    }
    // 移除广播图标的填充色
    Snap.select('symbol#toolguangbo1') && Snap.select('symbol#toolguangbo1').children().forEach(item => {
      item.attr({
        fill: '',
      })
    })
    // 广播动画
    /* var hasPlayingSvg = rPaper.selectAll('.is-playing');
     for (var isp = 0; isp < hasRotateSvg.items.length; isp++) {
     var childUse = hasPlayingSvg.items[isp].select('use')
     var getCurValue = hasPlayingSvg.items[isp].getBBox();
     var centerX, centerY;
     centerX = getCurValue.x + getCurValue.width / 2 // 获取中间点位置X
     centerY = getCurValue.y + getCurValue.height / 2 // 获取中间点位置Y
     opacityAnimate(childUse, 1, .5)
     } */
  }

  // 更新标记形状图层结构
  layer_updateDrawingMarkShapes = markLists => {
    let cvjs_redline = 0;
    let cvjs_stickynote = 0;
    for (let m = 0, len = markLists.length; m < len; m++) {
      if (markLists[m].attr('data-node').indexOf('RED_') === 0) {
        cvjs_redline++;
        this.layer_saveMarkShape_NewNode(markLists[m])
        // 根据状态值配置当前填充色(只在展示状态更改显示) // 由样式控制
      } else if (markLists[m].attr('data-node').indexOf('SNOTE_') === 0) {
        cvjs_stickynote++;
        this.layer_saveMarkShape_StickyIcon_NewNode(markLists[m])
        // 对图标所在的SVG进行赋填充色
        const childSvguse = markLists[m].select('svg')
        childSvguse.attr({
          class: `self-icon is-fill-${markLists[m].attr('data-status')} ${markLists[m].attr('data-icon-animate')}`, // 设置添加图标的旋转状态
        });
      }
      this.setState({
        layerItems: {
          shapes: cvjs_redline,
          icons: cvjs_stickynote,
        },
      })
    }
  }

  layer_setMarkShape_HoverTip = (data, event, nodeData, node) => {
    const { showDeviceTip } = this.state;
    console.log(this.detectZoom() < 100)
    if (JSON.stringify(data) !== '{}' && !showDeviceTip) {
      this.setState({
        showDeviceTip: true,
        tipStyle: {
          maxWidth: this.detectZoom() < 100 ? 'inherit' : '200px',
          left: event.clientX,
          top: event.clientY - (document.getElementById('hideTip').clientHeight + 24 + (this.detectZoom() < 100 ? 20 * (this.detectZoom() * 0.1) : 0) + parseInt(nodeData['icon-size'])),
          // top: event.clientY - (64 + Math.ceil(data.deviceDesc.length / 18) * 20 + parseInt(nodeData['icon-size'])),
        },
        deviceInfo: data,
      })
    }
  }

// 完成绘制"图形"相关鼠标事件及保存参数
  layer_saveMarkShape_NewNode = markShapeNode => {
    const { onClickSticky, onHoverSticky, isMarkToGroup, id } = this.props;
    markShapeNode.data(setNodeDataValues(markShapeNode.attr())) // 将属性内有的'data-'形状的属性值进行赋值给data
    markShapeNode.mousedown(evt => {
      if (onClickSticky) onClickSticky(markShapeNode.data())
    })
    markShapeNode.hover(e => {
      if (onHoverSticky) onHoverSticky(markShapeNode.data(), this.layer_setMarkShape_HoverTip, e)
    })
    markShapeNode.mouseover(evt => {
      if (isMarkToGroup) {
        markShapeNode.attr('data-type') === 'PolylineGroup' && markShapeNode.attr({ style: 'cursor: pointer' })
      } else {
        markShapeNode.attr({ style: 'cursor: pointer' })
      }
      if (markShapeNode.attr('is_loop')) {
        // cvjs_selfMethod_loopGroupFuncs.setLoopCheckedShowFilter(markShapeNode.attr('parent_id'))
      }
    })
    markShapeNode.mouseout(evt => {
      if (markShapeNode.attr('is_loop')) {
        // StickyLayer.selectAll('.is-current-loop').forEach(function (item) {
        //   item.removeClass('is-current-loop') // 所有选中的回路图形移除指定样式类
        // })
      }
      const curStyle = markShapeNode.attr('style')
      if (curStyle && curStyle.indexOf('cursor: pointer') !== -1) {
        markShapeNode.attr({
          style: curStyle.replace('cursor: pointer', ''),
        })
      }
      this.setState({
        showDeviceTip: false,
        deviceInfo: {
          deviceDesc: '',
          deviceSubType: '',
          deviceBrand: '',
          deviceModel: '',
        },
      })
    })

    const { currentAllMarkShapes } = this.state;
    if (markShapeNode.attr('data-type') === 'FilledZone') {
      currentAllMarkShapes.splice(0, 0, markShapeNode)
    } else {
      currentAllMarkShapes.push(markShapeNode)
    }
    this.setState({ currentAllMarkShapes })
  }

// 完成绘制"图标"相关鼠标事件及保存参数
  layer_saveMarkShape_StickyIcon_NewNode = markShapeNode => {
    const { onClickSticky, onHoverSticky, id } = this.props;
    const { relationSVGGroup: { rPaper } } = this.state;
    markShapeNode.data(setNodeDataValues(markShapeNode.attr())) // 将属性内有的'data-'形状的属性值进行赋值给data
    markShapeNode.mousedown(evt => {
      if (onClickSticky) onClickSticky(markShapeNode.data())
    })
    markShapeNode.mouseover(evt => {
      if (onHoverSticky) onHoverSticky(markShapeNode.data(), this.layer_setMarkShape_HoverTip, evt, markShapeNode.attr('data-icon-size'))
      markShapeNode.attr({ style: 'cursor: pointer' })
    })
    markShapeNode.mouseout(evt => {
      markShapeNode.attr('class', `${markShapeNode.attr('class').replace(' isBounce', '')}`)
      const curStyle = markShapeNode.attr('style')
      if (curStyle && curStyle.indexOf('cursor: pointer') !== -1) {
        markShapeNode.attr({
          style: curStyle.replace('cursor: pointer', ''),
        })
      }
      this.setState({
        showDeviceTip: false,
        deviceInfo: {
          deviceDesc: '',
          deviceSubType: '',
          deviceBrand: '',
          deviceModel: '',
        },
      })
    })
    const { currentAllMarkShapes } = this.state;
    currentAllMarkShapes.push(markShapeNode)
    this.setState({ currentAllMarkShapes })
  }

  // 添加图标抖动动画 TODO ,需要优化代码
  layer_addMarkShapeBoudce_animate = markShapeNode => {
    if (markShapeNode.data('animating')) return;
    markShapeNode.data('animating', true)
    const preTransform = markShapeNode.attr('data-transform')
    // ["1.214", "0", "0", "1.214", "543.8973", "315.5574"] 最后两个是偏移量
    const transData = preTransform.substring(preTransform.indexOf('(') + 1, preTransform.indexOf(')')).split(',').map(item => Number(item));
    // const prevM = new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], transData[5]);
    // const fromM = new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], transData[5] + Number(markShapeNode.attr('data-icon-size') / 3));
    // const toM = new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], transData[5] - Number(markShapeNode.attr('data-icon-size') / 3));
    Snap.animate(transData[5] + Number(markShapeNode.attr('data-icon-size') / 3), transData[5], val => {
      markShapeNode.attr({
        transform: new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], val).toTransformString(),
      });
    }, 100, mina.elastic(), val => {
      // rotateAnimate(elementNode, from, to)
      Snap.animate(transData[5], transData[5] + Number(markShapeNode.attr('data-icon-size') / 3), val => {
        markShapeNode.attr({
          transform: new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], val).toTransformString(),
        });
      }, 100, mina.elastic(), val => {
        // rotateAnimate(elementNode, from, to)
        Snap.animate(transData[5] + Number(markShapeNode.attr('data-icon-size') / 3), transData[5], val => {
          markShapeNode.attr({
            transform: new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], val).toTransformString(),
          });
        }, 100, mina.elastic(), val => {
          // rotateAnimate(elementNode, from, to)
          markShapeNode.attr({
            transform: new Snap.Matrix(transData[0], transData[1], transData[2], transData[3], transData[4], transData[5]).toTransformString(),
          });
          markShapeNode.data('animating', false)
        });
      });
    });
  }

  // 清除或重置相关事件
  // 移除：图标标记间的关联连线
  layer_deleteStickyConnection = (type, groupId) => {
    const { relationSVGGroup: { StickyLayer } } = this.state;
    if (!StickyLayer) return;
    if (type === 'all') {
      StickyLayer.select('#connect-container') && StickyLayer.select('#connect-container').remove();
      return;
    }
    StickyLayer.select(`#connect_${groupId}`) && StickyLayer.select(`#connect_${groupId}`).remove();
  }

  layer_clearAllMarkShapes_BeforeLoad = () => {
    const { relationSVGGroup: { StickyLayer, controlGroup } } = this.state;
    this.layer_deleteStickyConnection('all'); // 移除：图标标记间的关联连线
    // hidePopStickyNotes(); // 预留
    if (StickyLayer) {
      StickyLayer.remove(); // 移除图层所有的DOM
    }
    if (controlGroup && controlGroup.select('#markShapesContainer')) {
      controlGroup.select('#markShapesContainer').remove()
    }
    this.setState({
      currentAllMarkShapes: [],
    })
  }

  layer_setZoomInFocus = uuid => {
    const { id } = this.props;
    const { currentAllMarkShapes } = this.state;
    const matchIndex = _.findIndex(currentAllMarkShapes, item => item.attr('data-uuid') === uuid)
    if (matchIndex === -1) return; // 没有查找到
    const curFocusBBox = currentAllMarkShapes[matchIndex].getBBox();

    viewBox.X = curFocusBBox.x;
    viewBox.Y = (curFocusBBox.y - curFocusBBox.h) - curFocusBBox.h * 20 / 2;
    viewBoxHeight = curFocusBBox.h * 20;
    viewBoxWidth = curFocusBBox.w;
    this.setState({ planarViewBox: `${viewBox.X} ${viewBox.Y} ${viewBoxWidth} ${viewBoxHeight}` })
    // const currentContainerEle = document.getElementById(`${id}FloorPlanar`)
    // const currentSvgEle = document.getElementById(`${id}FloorPlanar_svg`)
    // console.log(currentSvgEle.getBoundingClientRect(), curFocusBBox, currentContainerEle.scrollTop, currentAllMarkShapes[matchIndex])
    // console.log(currentContainerEle.clientWidth / 2 + currentSvgEle.getBoundingClientRect().left + 10, currentContainerEle.clientHeight /2 + currentSvgEle.getBoundingClientRect().top - 25)
    // this.setState({
    //   tipText: currentAllMarkShapes[matchIndex].attr('data-tip'),
    //   tipStyle: {
    //     display: "block",
    //     position: "fixed",
    //     left: currentContainerEle.clientWidth / 2  + currentSvgEle.getBoundingClientRect().left - curFocusBBox.w,
    //     top: currentContainerEle.clientHeight /2  + currentSvgEle.getBoundingClientRect().top - curFocusBBox.h
    //   }
    // })
    this.layer_addMarkShapeBoudce_animate(currentAllMarkShapes[matchIndex])
  }

  layer_updateMarkShapStatus = (option, status) => {
    // const UUIDSObj = {
    //   '13370789-f10c-4086-9e6a-e9e9d64d6ae9': 'default',
    //   '13370789-f10c-4086-9e6a-e9e9d64d6ae9': 'default'
    // }
    if (Array.isArray(option)) {
      // option = [{uuid: 'xxx', status: 'xxx'}]
      option.forEach(item => {
        this.layer_changeStickyIcon_status(item.uuid, item.status)
      })
    } else if (typeof (option) === 'string') {
      // option = 'xxx', status= 'xxx' 或者：'xxx-uuid': 'default'
      this.layer_changeStickyIcon_status(option, status)
    }
  }

  // 更改当前的图标状态
  layer_changeStickyIcon_status = (uuid, status) => {
    const { currentAllMarkShapes } = this.state
    const vAll = _.findIndex(currentAllMarkShapes, item => item.attr('data-uuid') === uuid);
    if (vAll > 0) {
      currentAllMarkShapes[vAll].attr('data-status', status);
      if (currentAllMarkShapes[vAll].attr('data-type') === 'StickyIcon') {
        currentAllMarkShapes[vAll].select('svg').attr({
          class: `self-icon is-fill-${currentAllMarkShapes[vAll].attr('data-status')} ${currentAllMarkShapes[vAll].attr('data-icon-animate')}`, // 设置添加图标的旋转状态
        });
        this.layer_addMarkShapeBoudce_animate(currentAllMarkShapes[vAll])
      }
    }
  }

  handleToSetAnimate = uuid => {
    this.layer_setZoomInFocus(uuid)
  }

  render() {
    const { id } = this.props;
    const { loadInProgress, planarViewBox, planarStyle, planarFinishLoad, tipStyle, deviceInfo, planarGraphFile } = this.state;
    const { deviceDesc, deviceSubType, deviceBrand, deviceModel } = deviceInfo;
    return (
      <div className="spec-map-planar" id={`${id}FloorPlanar`}>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            <filter id="PolylineGroupFilter" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="1" dy="1"></feOffset>
              <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="1 0 0 1 0   1 0 0 0 1   0 0 0 0 0  0 1 0 1 0"></feColorMatrix>
              <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="1"></feGaussianBlur>
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>
            </filter>
          </defs>
        </svg>
        {
          planarGraphFile && <div className="spec-map-planar-toolbar">
            <a title="放大" onClick={() => this.planar_zoomForHandelClick('zoomIn')}>放大{/*<SpecIcon name="video-zoom-in" />*/}</a>
            <a title="缩小" onClick={() => this.planar_zoomForHandelClick('zoomOut')}>缩小{/*<SpecIcon name="video-zoom-out" />*/}</a>
            <a title="还原" onClick={() => this.planar_resetZoomPan('resetZoom')}>还原{/*<SpecIcon name="liandongguanli" />*/}</a>
          </div>
        }

        {
          (!planarGraphFile || !planarFinishLoad) && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无图纸" />
        }
        {
          loadInProgress && <div className="spec-map-planar-loading">
            <Spin tip="二维地图加载中"></Spin>
          </div>
        }
        <svg id={`${id}FloorPlanar_svg`}
             viewBox={planarViewBox}
             style={planarStyle}
             onWheel={this.planar_addMouseWheelControls}
             onMouseMove={this.planar_addMouseMoveControl}
        ></svg>
        <div className="spec-map-device-info fixed" style={{ ...tipStyle, display: this.state.showDeviceTip ? 'block' : 'none' }}>
          <div className="device-name">{deviceDesc}</div>
          <div className="device-params"><label>设备类型：</label> {deviceSubType}</div>
          <div className="device-params"><label>设备品牌：</label> {deviceBrand}</div>
          <div className="device-params"><label>设备型号：</label> {deviceModel} </div>
        </div>
        {/* 用于来判断浮层的高度 */}
        <div className="spec-map-device-info" style={{ display: 'block', opacity: 0, zIndex: -1, maxWidth: this.detectZoom() < 100 ? 'inherit' : '200px' }} id="hideTip">
          <div className="device-name">{deviceDesc}</div>
          <div className="device-params"><label>设备类型：</label> {deviceSubType}</div>
          <div className="device-params"><label>设备品牌：</label> {deviceBrand}</div>
          <div className="device-params"><label>设备型号：</label> {deviceModel} </div>
        </div>
      </div>
    );
  }
}

export default PlanarGraph;
