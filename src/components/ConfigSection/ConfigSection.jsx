import React from 'react';
import './ConfigSection.scss';

const ConfigSection = props => {
  return (
    <div
      className={`ConfigSection ${props.className ? props.className : ' '}`}
      id={`${props.id ? props.id : ' '}`}
     >
      {props.children}
    </div>
  );
}

export default ConfigSection;