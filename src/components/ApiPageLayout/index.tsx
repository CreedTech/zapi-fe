import React from "react";
import { makeStyles } from "@mui/styles";

import Navbar from "./navbar";

interface Props { id: string | undefined }

const ApiPageLayout:React.FC<Props> = ({id}) => {
    const classes = useStyles()
  return (
    <div className={classes.layout}>
      <Navbar id={id} />
    </div>
  )
}

export default ApiPageLayout

const useStyles = makeStyles({
    layout: {
      display: "flex"
    }
})