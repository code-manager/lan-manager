import React, { Component } from 'react';
import Connection from './connection';

export default class Connections extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connections: []
    };
  }

  componentWillMount() {
    this.loadConnections();
  }

  componentDidMount() {
    this.startConnectionMonitor();
  }

  componentWillUnmount() {
    this.stopConnectionMonitor();
  }

  startConnectionMonitor() {
    this.connectionTimer = setInterval(async ()=> {
      this.loadConnections();
    }, 1000);
  }

  stopConnectionMonitor() {
    clearInterval(this.connectionTimer);
  }

  async toggleConnection(connection) {
    const { connectionName } = connection;
    const response = await fetch(`/api/connections/toggle/${connectionName}`, { method: 'post' });
    const json = await response.json();
    
    if(json.error)  {
      let error = new Error(json.message);
      error.data = json.data;
      error.SERVER_ERROR = true;
      console.error(error);
    }

    await this.loadConnections();
  }

  onEnableClick(connection, event) {
    if(connection.disabled) this.toggleConnection(connection);
  }

  onDisableClick(connection, event) {
    if(!connection.disabled) this.toggleConnection(connection);    
  }

  async onRefreshClick(connection) {
    await this.toggleConnection(connection);
    await this.toggleConnection(connection); 
  }

  async onPreferClick(connection) {
    const { routeName } = connection;
    if(connection.disabled) this.toggleConnection(connection);
    const response = await fetch(`/api/connections/prefer/${routeName}`, { method: 'post' });
    const json = await response.json();
    if(json.error)  {
      let error = new Error(json.message);
      error.data = json.data;
      error.SERVER_ERROR = true;
      console.error(error);
    }

    await this.loadConnections();
  }

  async loadConnections() {
    const response = await fetch("/api/connections");
    const json = await response.json();
    
    if(json.error)  {
      let error = new Error(json.message);
      error.data = json.data;
      error.SERVER_ERROR = true;
      console.error(error);
    }

    this.state.connections = json.data;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="Connections">
        {this.state.connections.map(connection => {
          return <Connection
            connection={connection}
            key={connection.connectionName}
            onEnableClick={this.onEnableClick.bind(this, connection)}
            onDisableClick={this.onDisableClick.bind(this, connection)}
            onPreferClick={this.onPreferClick.bind(this, connection)}
            onRefreshClick={this.onRefreshClick.bind(this, connection)}
          />
        })}
      </div>
    );
  }
}

