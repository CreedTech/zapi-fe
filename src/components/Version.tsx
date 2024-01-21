import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ErrorIcon from "@mui/icons-material/Error";
import { AUTHENTICATION } from "../testdata";
import { Transform } from "../components";

const Version: React.FC = () => {
  const classes = useStyles();

  const [value, setValue] = useState(AUTHENTICATION[0].label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={classes.version}>
      <div className={classes.spec}>
        <div className={classes.icon}>
          <ErrorIcon />
        </div>
        <span
          style={{
            marginLeft: "8px",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "14px",
            display: "block",
            boxSizing: "border-box",
            outline: "none 0px",
            letterSpacing: "normal",
            lineHeight: "20px",
          }}>
          Version Specific
        </span>
        <span
          style={{
            marginLeft: "4px",
            marginRight: "4px",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: "14px",
            display: "block",
            boxSizing: "border-box",
            outline: "none 0px",
            letterSpacing: "normal",
            lineHeight: "20px",
          }}>
          Changes will apply only to
        </span>
      </div>
      <div className={classes.access}>
        <div className={classes.control}>
          <span
            style={{
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "16px",
              display: "block",
              boxSizing: "border-box",
              outline: "none 0px",
              letterSpacing: "normal",
              lineHeight: "24px",
            }}>
            Access Control
          </span>
        </div>
        <div className={classes.key}>
          <span
            style={{
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: "12px",
              display: "block",
              boxSizing: "border-box",
              outline: "none 0px",
              letterSpacing: "normal",
              lineHeight: "24px",
            }}>
            Key Authentication Set
          </span>
          <span
            style={{
              marginTop: "8px",
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: "12px",
              display: "block",
              boxSizing: "border-box",
              outline: "none 0px",
              letterSpacing: "normal",
              lineHeight: "16px",
            }}>
            Zapi implements a single secret key per developer application across
            all APIs to minimize friction in testing and implementing APIs
          </span>
        </div>
        <div className={classes.select}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}>
              {AUTHENTICATION.map((auth) => (
                <FormControlLabel
                  control={<Radio />}
                  key={auth.label}
                  {...auth}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <Transform />
    </div>
  );
};
const useStyles = makeStyles({
  version: {
    padding: "0px",
    margin: "32px 0px 8px",
    backgroundColor: "rgb(255, 255, 255)",
    flexDirection: "column",
    borderRadius: "6px",
    borderColor: "rgb(214, 217, 219)",
    borderStyle: "solid",
    borderWidth: "1px",
    boxShadow: "rgb(0 0 0 / 8%) 0px 1px 4px",
    boxSizing: "border-box",
  },
  spec: {
    padding: "8px 16px",
    backgroundColor: "rgb(244, 244, 245)",
    webkitBoxAlign: "center",
    alignItems: "center",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    boxSizing: "border-box",
    display: "flex",
  },
  icon: {
    color: "rgb(48, 128, 222)",
    boxSizing: "border-box",
  },
  access: {
    padding: "16px",
    boxSizing: "border-box",
  },
  control: {
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  key: {
    marginTop: "32px",
    width: "662px",
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  select: {
    marginTop: "16px",
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
});

export default Version;
