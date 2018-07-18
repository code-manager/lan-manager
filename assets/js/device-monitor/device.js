import React from 'react';

export default function Device(props) {
  return (
    <a className={`DeviceMonitor__Device DeviceMonitor__Device--${props.device.online? 'online': 'offline'}`} href={`http://${props.device.ip}:${props.device.port || 80}`}>
      <div className="DeviceMonitor__Device__icon">
        { props.device.type === 'wan'? <i className="icon-globe"></i> : null }
        { props.device.type === 'lan'? <i className="icon-device_hub"></i> : null }
      </div>
      <div className="DeviceMonitor__Device__info">
        <div className="DeviceMonitor__Device__name">{props.device.deviceName}</div>
        <div className="DeviceMonitor__Device__ip">{props.device.ip}</div>
      </div>
    </a>
  );
}