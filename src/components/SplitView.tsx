import React from "react";
import { makeStyles } from "@mui/styles";

const SplitView: React.FC = () => {
    const classes = useStyles()

  return (
    <div className={classes.splitview}>
        <div className={classes.view}>
            hello
        </div>
        <div className={classes.divider} />
        <div className={classes.view}>
            hello
        </div>
        <div className={classes.divider} />
        <div className={classes.view}>
            hello
        </div>
    </div>
  )
}

const useStyles = makeStyles({
    splitview: {
        width: "100%",
        height: "67vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem 0 0",
    },
    view: {
        flex: 1,
        height: "100%",
    },
    divider: {
        width: 2,
        height: "100%",
        background: "#CECECE"
    }
})

export default SplitView