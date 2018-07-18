import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Connection extends Component {

  constructor() {
    super();
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onEnableClick = this.onEnableClick.bind(this);
    this.onDisableClick = this.onDisableClick.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.state = {
      hover: false
    }
  }

  componentDidMount() {
    this.listenHover();
  }

  componentWillUnmount() {
    this.unlistenHover();
  }
  
  onMouseOver(e) {
    if(!e.originalTarget.classList.contains('Connection__action')) {
      this.state.hover = true;
      this.setState(this.state);
    }
  }

  onMouseOut(e) {
    this.state.hover = false;
    this.setState(this.state);
  }

  listenHover() {
    const element = ReactDOM.findDOMNode(this);
    element.addEventListener('mouseover', this.onMouseOver);
    element.addEventListener('mouseout', this.onMouseOut);
  }

  unlistenHover() {
    const element = ReactDOM.findDOMNode(this);
    element.removeEventListener('mouseover', this.onMouseOver);
    element.removeEventListener('mouseout', this.onMouseOut);
  }

  onEnableClick(e) {
    e.stopPropagation();
    this.props.onEnableClick();
  }

  onDisableClick(e) {
    e.stopPropagation();
    this.props.onDisableClick();    
  }

  onRefreshClick(e) {
    e.stopPropagation();
    this.props.onRefreshClick();    
  }

  render() {
    const className = [
      `Connection`,
      `Connection--${this.state.hover ? 'hover': 'not-hover'}`,
      `Connection--${this.props.connection.running ? 'running': 'not-running'}`,
      `Connection--${this.props.connection.disabled ? 'disabled': 'not-disabled'}`,
      `Connection--${this.props.connection.active ? 'active': 'not-active'}`,
      `Connection--${this.props.connection.preferred ? 'preferred': 'not-preferred'}`
    ].join(' ');
    return (
      <div className={className} onClick={this.props.onPreferClick}>
        <div className="Connection__preferred-icon">
          <i className="icon-favorite"></i>
        </div>
        <div className="Connection__label">
          { this.props.connection.label }
        </div>
        <div className="Connection__actions">
        <button className="Connection__action" onClick={this.onRefreshClick} title="Refresh Connection"><i className="icon-refresh"></i></button>
        { this.props.connection.disabled ? <button className="Connection__action" onClick={this.onEnableClick} title="Enable Connection"><i className="icon-flash_on"></i></button>: null }
        { !this.props.connection.disabled ? <button className="Connection__action" onClick={this.onDisableClick} title="Disable Connection"><i className="icon-flash_off"></i></button>: null }
        </div>
      </div>
    );
  }
}