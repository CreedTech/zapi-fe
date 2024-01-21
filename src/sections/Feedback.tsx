import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';

const Feedback = ({handleOpen} : any) => {
    return (
    // <Box sx={feedback}>
      <Button onClick={handleOpen}>
        <FeedbackOutlinedIcon fontSize="small" sx={{ fontSize: 25, background: "white", borderRadius: "50%"}}/>
      </Button>
    //  </Box> *
    )
}

export default Feedback;

const feedback = {
    position: "fixed",
    bottom: "1%",
    right: "-1%",
    "@media screen and (max-width: 400px)": {
      position: "fixed",
      bottom: "1%",
      right: "1%",
    },
  }