import React from "react";
import './Button.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const button = props => {
  let iconHolder = null;
  const {
    playButton, buttonSize, icon,
    height, width, backgroundColor, textColor,
    image, onButtonHover, hoverStatus
  } = props

  if (image) {
    iconHolder = (
      <FontAwesomeIcon
        style={playButton ? { marginRight: '15px' } : { marginLeft: "5px" }}
        size={buttonSize}
        icon={icon}
      />
    );
  }

  let orderButton = (
    <>
      {props.children}
      {iconHolder}
    </>
  )

  if (playButton) {
    orderButton = (
      <>
        {iconHolder}
        {props.children}
      </>
    )
  }

  const conditionalStyles = {
    height: height,
    width: width,
    backgroundColor: backgroundColor,
    color: textColor,
    opacity: !hoverStatus && '80%'
  };

  return (
    <button
      className="Button" style={conditionalStyles}
      onMouseEnter={onButtonHover}
      onMouseLeave={onButtonHover}>
      {orderButton}
    </button>
  );
};

export default button;

