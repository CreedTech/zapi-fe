import React from "react";
import { makeStyles } from "@mui/styles";

const Fallback: React.FC = () => {
    const classes = useStyles()

  return (
    <div className={classes.container}>
        <div className="loader"></div>
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(225, 225, 225, 0.3)",
    backdropFilter: "blur(2px)",
    zIndex: 70,
  },
})

export default Fallback