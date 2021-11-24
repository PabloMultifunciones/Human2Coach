import React from 'react';

import './styles.scss';

const ButtonCustom = (props) => {
  const handleClick = () => {
    if (props.onClick && !props.disabled) props.onClick();
  };

  return (
    <span
      className={`btn-wrapper ${props.secondary ? ' secondary' : ''} ${
        props.disabled ? ' disabled' : ''
      } ${props.className ? props.className : ''}`}
      style={props.style}
      onClick={handleClick}
      onKeyDown={() => {}}
      role="presentation"
    >
      {props.children}
    </span>
  );
};

export default ButtonCustom;
