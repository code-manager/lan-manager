import React, { Component } from 'react';

export default class Speed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: {
        uploadSpeed: 0,
        downloadSpeed: 0
      }
    };
  }

  componentDidMount() {
    this.startMonitor();
  }

  componentWillUnmount() {
    this.stopConnectionMonitor();
  }

  round(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  parseBytes(bytes) {
    let speed = this.round(bytes/ (1024 * 1024), 2);
    let unit = 'Mbps';
    return { speed, unit };
  }

  startMonitor() {
    this.connectionTimer = setInterval(async ()=> {
      const response = await fetch(`/api/throughput/ether2-LAN`);
      const { data: speed } = await response.json();
      this.state.speed = speed;
      this.setState(this.state);
    }, 1000);
  }

  stopConnectionMonitor() {
    clearInterval(this.connectionTimer);
  }
 
  render() {
    return (
      <div className="Speed">
        <div className="Speed__upload">
          <div className="Speed__speed">
            <i className="Speed__icon icon-arrow_upward"></i>
            { this.parseBytes(this.state.speed.uploadSpeed).speed }
          </div>
          <div className="Speed__unit">
            { this.parseBytes(this.state.speed.uploadSpeed).unit }
          </div>        
        </div>      
        <div className="Speed__download">
          <div className="Speed__speed">
            <i className="Speed__icon icon-arrow_downward"></i>
            { this.parseBytes(this.state.speed.downloadSpeed).speed }
          </div>
          <div className="Speed__unit">
            { this.parseBytes(this.state.speed.downloadSpeed).unit }
          </div>  
        </div>
      </div>
    );
  }
}