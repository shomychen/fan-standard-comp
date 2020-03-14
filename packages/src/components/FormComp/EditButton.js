import React, { Component } from 'react';
import { Input, Button } from 'antd';
import classNames from 'classnames';
// import styles from './component.less';

class EditButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      inputVisible: false,
    };
  }

  handleClick = () => {
    this.setState({
      inputVisible: true,
    }, () => this.input.focus());
  };

  saveInputRef = (input) => {
    this.input = input;
  };


  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = (e) => {
    const { onSave } = this.props;
    if (onSave && e.target.value) onSave(e.target.value);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { size, label, style , className, disabled} = this.props;
    const { inputValue, inputVisible } = this.state;
    return (
      <span style={{display: 'inline-block',width: '106px',verticalAlign: 'middle', ...style}} className={classNames(className, 'spec-edit-button')}>
        {
          inputVisible ?
            <Input
              ref={this.saveInputRef}
              type="text"
              size={size}
              style={{ width: '100%' }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            /> :
            <Button
              disabled={disabled}
              icon='plus'
              size={size}
              style={{ borderStyle: 'dashed', width: '100%' }}
              onClick={this.handleClick}
            >{label}
            </Button>
        }
      </span>
    );
  }
}

export default EditButton;
