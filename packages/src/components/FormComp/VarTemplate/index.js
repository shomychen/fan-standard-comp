/**
 * Created by S.C. on 2019/11/16.
 */
import React, { Component } from 'react';
import { Input, Tag } from 'antd';

const { TextArea } = Input;
const isIE = !(!document.all)

class VarTemplate extends Component {
  static getDerivedStateFromProps(nextProps) {
    // console.log('执行getDerivedStateFromProps', nextProps)
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const value = props.value || '';
    this.state = {
      currentContent: value,
      startNum: value.length, // 光标开始位置(当选中文本时)
      endNum: value.length, // 光标结束位置(当选中文本时)
      wordCount: value.length, // 输入框内的字符数总和（包含占位符所需要的长度）
    };
    this.content = React.createRef();
  }


  handleBlur = e => {
    this.getCurrentCursor()
  }

  handleFocus = e => {
    // console.log('获取焦点')
    // this.$emit('focus', event)
  }

  handleInputChange = e => {
    const { onChange } = this.props;
    this.getCurrentCursor()
    this.setState({
      currentContent: e.target.value,
      startNum: e.target.value.length,
      endNum: e.target.value.length,
      wordCount: e.target.value.length,
    });
    if (onChange) onChange(e.target.value);
  };

  setTagWords = key => {
    const { onChange } = this.props;
    const { currentContent, startNum, endNum } = this.state;
    this.setState({
      currentContent: this.insertContent(currentContent, key, startNum, endNum),
      startNum: startNum + key.length, // 光标起始位置累加
      endNum: endNum + key.length, // 光标起始位置累加
      wordCount: this.insertContent(currentContent, key, startNum, endNum).length,
    })
    if (onChange) onChange(this.insertContent(currentContent, key, startNum, endNum));
    setTimeout(() => {
      this.moveToCursor() // 重新定位光标
    })
  }

  /**
   * 指定位置插入标签占位符字符串，当光标有选中一段字符时，会将直接将其替换
   * @param {str}       需要做插入的字符串
   * @param {insertStr} 需要插入的字符串
   * @param {start}     指定开始位置
   * @param {end}       指定结束位置
   * */
  insertContent = (str, insertStr, start, end) => {
    if (start !== end) {
      const prevStr = str.substring(0, start)
      const nextStr = str.substring(end, str.length)
      return prevStr + insertStr + nextStr
    }
    const prevStr = str.substring(0, start)
    const nextStr = str.substring(start, str.length)
    return prevStr + insertStr + nextStr
  }

  /**
   * 获取当前（上一次）光标的位置
   * @参考 http://blog.csdn.net/chadcao/article/details/6575927
   * @TODO IE、火狐浏览器下未验证
   */
  getCurrentCursor = () => {
    let start = 0
    let end = 0
    const oTextarea = this.content.querySelector('textarea') // 获取textarea标签
    if (isIE) {
      // selection 当前激活选中区，即高亮文本块，和/或文当中用户可执行某些操作的其它元素。
      // createRange 从当前文本选中区中创建 TextRange 对象，
      // 或从控件选中区中创建 controlRange 集合。
      const sTextRange = document.selection.createRange()
      // 判断选中的是不是textarea对象
      if (sTextRange.parentElement() === oTextarea) {
        // 创建一个TextRange对象
        const oTextRange = document.body.createTextRange()
        // 移动文本范围以便范围的开始和结束位置能够完全包含给定元素的文本。
        oTextRange.moveToElementText(oTextarea)
        // 这里我们比较oTextRange和sTextRange的开头，的到选中区域的开头位置
        for (start = 0; oTextRange.compareEndPoints('StartToStart', sTextRange) < 0; start++) {
          oTextRange.moveStart('character', 1)
        }
        // 需要计算一下\n的数目(按字符移动的方式不计\n,所以这里加上)
        for (let i = 0; i <= start; i++) {
          if (oTextarea.value.charAt(i) === '\n') {
            start++
          }
        }
        // 再计算一次结束的位置
        oTextRange.moveToElementText(oTextarea)
        for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end++) {
          oTextRange.moveStart('character', 1)
        }
        for (let j = 0; j <= end; j++) {
          if (oTextarea.value.charAt(j) === '\n') {
            end++
          }
        }
      }
    } else {
      start = oTextarea.selectionStart
      end = oTextarea.selectionEnd
    }
    this.setState({
      startNum: start,
      endNum: end,
    })
  }

  /**
   * 跳转到上一次光标的位置
   * @参考 http://blog.csdn.net/chadcao/article/details/6575927
   * @TODO IE、火狐浏览器下未验证
   */
  moveToCursor = () => {
    const { startNum, endNum } = this.state;
    const oTextarea = this.content.querySelector('textarea')
    const start = startNum
    const end = endNum
    if (isNaN(start) || isNaN(end)) {
      alert('位置输入错误')
    }
    if (isIE) {
      const oTextRange = oTextarea.createTextRange()
      const LStart = startNum
      const LEnd = endNum
      let start = 0
      let end = 0
      const { value } = oTextarea
      for (let i = 0; i < value.length && i < LStart; i++) {
        const c = value.charAt(i)
        if (c !== '\n') {
          start++
        }
      }
      for (let j = value.length - 1; j >= LEnd && j >= 0; j--) {
        const c = value.charAt(j)
        if (c !== '\n') {
          end++
        }
      }
      oTextRange.moveStart('character', start)
      oTextRange.moveEnd('character', -end)
      // oTextRange.collapse(true);
      oTextRange.select()
      oTextarea.focus()
    } else {
      oTextarea.select()
      oTextarea.selectionStart = startNum
      oTextarea.selectionEnd = endNum
    }
  }

  render() {
    const { size, style, tags, disabled } = this.props;
    const { currentContent, wordCount } = this.state;
    return (
      <div className="vart-wrap" style={style} ref={cRef => {
        this.content = cRef
      }}>
        {
          tags && Array.isArray(tags) && (<div className="vart-header">
            {
              tags.map(item => <Tag key={item.id} onClick={() => !disabled && this.setTagWords(item.variableNameFormatted)}>{item.variableName}</Tag>)
            }
          </div>)
        }
        <div className="vart-input">
        <TextArea
          type="text"
          size={size}
          value={currentContent}
          placeholder="请输入"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={e => this.handleInputChange(e)}
          disabled={disabled}
        />
        </div>
        {/*   <div>
          您已录入 <b>{wordCount}</b> 个字
        </div> */}
      </div>
    );
  }
}

export default VarTemplate;
