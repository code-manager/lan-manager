import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "regenerator-runtime/runtime";
import DeviceMonitor from './device-monitor/device-monitor';
import VPN from './vpn/vpn';
import DistractionFilter from './distraction-filter/distraction-filter';
import Speed from './speed'
import Connections from './connections/connections';
import "../scss/style.scss";

class App extends Component {

  constructor(props) {
    super(props);
  }

  renderDeviceView() {
    return (
      <div className="main-view__section">
        <h2 className="main-view__title">Devices</h2>
        <div className="main-view__section-content">
          <DeviceMonitor />
        </div>
      </div>
    );
  }

  renderConnectionView() {
    return (
      <div className="main-view__section">
        <h2 className="main-view__title">Connections</h2>
        <div className="main-view__section-content">
          <Connections />
        </div>
      </div>
    );
  }

  renderSpeedView() {
    return (
      <div className="main-view__section">   
        <h2 className="main-view__title">Throughput</h2>
        <div className="main-view__section-content">
          <Speed />
        </div>
      </div>
    );
  }

  renderDistractionFilterView() {
    return (
      <div className="main-view__section">   
        <h2 className="main-view__title">Distraction Filter</h2>
        <div className="main-view__section-content">
          <DistractionFilter />
        </div>
      </div>
    );
  }

  renderVPNView() {
    return (
      <div className="main-view__section">   
        <h2 className="main-view__title">VPN</h2>
        <div className="main-view__section-content">
          <VPN />
        </div>
      </div>
    );
  }
 
  render() {
    return (
      <div className="main-view">
       <div className="main-view__group main-view__group--connections-speed">
          { this.renderConnectionView() }
          { this.renderSpeedView() }
        </div>
        <div className="main-view__group">
          { this.renderDistractionFilterView() }
          { this.renderVPNView() }
        </div>
        { this.renderDeviceView() }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
