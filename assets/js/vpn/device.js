import React from 'react';

export default function Device(props) {
  return (
    <div className={`VPN__Device VPN__Device--${props.device.disabled ? 'disabled': 'enabled'}`} onClick={props.onToggleClick}>
      <div className="VPN__Device__icon">
        <i className={`icon-${props.device.disabled? 'shield-off': 'shield'}`}></i>
      </div>      
      <div className="VPN__Device__name">{props.device.deviceName}</div>
    </div>
  );
}