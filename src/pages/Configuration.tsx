import React from "react";
import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

import { Stack, TextField, Typography, Button, Avatar } from "@mui/material";
import ReactGA from "react-ga4";

ReactGA.send({ hitType: "pageview", page: "/configuration" });

const AddApi: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <form>
        <Stack spacing={2} mx={2}>
          <Typography variant="h5">Describe Your App</Typography>
          <Typography className={classes.label}>App Name*</Typography>
          <TextField
            required
            id=""
            placeholder="Your API Name"
            className={classes.inputWidth}
          />
          <Typography className={classes.label}>Description*</Typography>
          <TextField
            required
            id=""
            placeholder="Your App Description"
            className={classes.inputWidth}
          />
          <Typography className={classes.label}>Upload Image</Typography>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: blueGrey[500],
                width: 60,
                height: 60,
                border: "1px dotted #081F4A",
              }}
              variant="rounded">
              N
            </Avatar>
          </Stack>

          <Button variant="contained" size="large" className={classes.button}>
            Edit
          </Button>
        </Stack>
      </form>
    </div>
  );
};
const useStyles = makeStyles({
  main: {
    backgroundColor: "#fff",
    height: "100%",
  },
  label: {
    color: "#081F4A",
  },
  inputWidth: {
    width: "70vh",
  },
  button: {
    width: "15vh",
  },
  space: {
    marginRight: "10px",
  },
});
export default AddApi;
