import React from 'react';

export default function Device(props) {
  return (
    <div className={`DistractionFilter__Device DistractionFilter__Device--${props.device.disabled ? 'disabled': 'enabled'}`} onClick={props.onToggleClick}>
      <div className="DistractionFilter__Device__icon">
        <i className={`icon-${props.device.disabled? 'shield-off': 'shield'}`}></i>
      </div>      
      <div className="DistractionFilter__Device__name">{props.device.deviceName}</div>
    </div>
  );
}