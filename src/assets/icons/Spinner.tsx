import React from "react";
import "./spinner.css";

interface Props {
  width?: string | number
  height?: string | number
  borderWidth?: string
  borderColor?: string
}

const Spinner:React.FC<Props> = ({width, height, borderWidth, borderColor}) => {
  return (
    <div className="spinner" style={{width: width, height: height, borderWidth: borderWidth, borderColor: borderColor}}></div>
  )
}

export default Spinner