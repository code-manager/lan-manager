import React, { Component } from 'react';
import Device from './device';

export default class DistractionFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
  }

  componentWillMount() {
    this.loadDevices();
  }

  componentDidMount() {
    this.startDeviceMonitor();
  }

  componentWillUnmount() {
    this.stopDeviceMonitor();
  }

  startDeviceMonitor() {
    this.deviceTimer = setInterval(async ()=> {
      this.loadDevices();
    }, 3000);
  }

  stopDeviceMonitor() {
    clearInterval(this.deviceTimer);
  }

  async onToggleClick(device) {
    const { ip } = device;
    const response = await fetch(`/api/distraction-filter/toggle/${ip}`, { method: 'post' });
    const json = await response.json();
    
    if(json.error)  {
      let error = new Error(json.message);
      error.data = json.data;
      error.SERVER_ERROR = true;
      console.error(error);
    }

    await this.loadDevices();
  }

  async loadDevices() {
    const response = await fetch("/api/distraction-filter/devices");
    const json = await response.json();
    
    if(json.error)  {
      let error = new Error(json.message);
      error.data = json.data;
      error.SERVER_ERROR = true;
      console.error(error);
    }

    this.state.devices = json.data;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="DistractionFilter">
        {this.state.devices.map(device => {
          return <Device
            key={device.ip}
            device={device}
            onToggleClick={this.onToggleClick.bind(this, device)}
          />;
        })}
      </div>
    );
  }
}