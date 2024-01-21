import React, { useState, FormEvent, ChangeEvent } from "react";
import { makeStyles } from "@mui/styles";
import InputSearch from "./InputSearch";
import { DataTable } from ".";

const InviteUser: React.FC = () => {
  const classes = useStyles();
  const [queryString, setQueryString] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const header = ["Type", "Name"];

  const row = [
    {
      type: "Team",
      name: (
        <>
          <div className={classes.tbody}>
            <div className={classes.avatar}></div>

            <div className={classes.border}>
              <span className={classes.text}>Topbiz-Default</span>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className={classes.container}>
      <span className={classes.text}>
        Your API project is currently private and not shared publicly on the
        ZAPI Hub (to make your API public, change its visibility under
        “General”). You can invite users to view your API privately on the Hub
        and perform requests to your API.
      </span>
      <div className={classes.wrap}>
        <form onSubmit={handleSubmit} className={classes.search}>
          <InputSearch
            className={classes.formControl}
            type="text"
            name="queryString"
            value={queryString}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQueryString(e.target.value)
            }
            placeholder="Search a User"
          />
          <button className={classes.button}>Send Invite</button>
        </form>
      </div>
      <span className={classes.header}>Invitees</span>
      <div className={classes.table}>
        <DataTable Heading={header} Rows={row} />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    marginTop: " 16px",
    flex: "1 1 0%",
    flexDirection: "column",
    boxSizing: "border-box",
    display: "flex",
  },
  text: {
    marginBottom: "32px",
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: "16px",
    letterSpacing: "normal",
    lineHeight: "24px",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
    display: "block",
    maxWidth: "600px",
    boxSizing: "border-box",
    outline: "none 0px",
  },
  wrap: {
    boxSizing: "border-box",
  },
  search: {
    marginTop: "12px",
    maxWidth: "600px",
    alignItems: "center",
    justifyContent: "space-between",
    boxSizing: "border-box",
    display: "flex",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 64px 8px 16px",
    gap: "16px",
    width: "100%",
    height: "46px",
    background: "#E1E1E2",
    borderRadius: "8px",
    "& input": {
      width: 250,
      height: "100%",
      outline: "none",
      border: "none",
      background: "#E1E1E2",
    },
    "& select": {
      width: 100,
      height: "100%",
      outline: "none",
      border: "none",
    },
    "& ::placeHolder": {
      fontFamily: "Space Grotesk",
    },
    "@media screen and (max-width: 900px)": {
      marginTop: "1rem",
    },
  },
  button: {
    backgroundColor: "#26c340",
    border: "none",
    boxSizing: "border-box",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    whiteSpace: "nowrap",
    marginLeft: "2rem",
    height: "46px",
  },
  header: {
    marginTop: "16px",
    marginBottom: "16px",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "24px",
    letterSpacing: "normal",
    lineHeight: "32px",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir, Helvetica, sans-serif',
    fontWeight: "600",
    display: "block",
    boxSizing: "border-box",
    outline: "none 0px",
  },
  table: {
    boxSizing: "border-box",
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    minWidth: "fit-content",
    border: "1px solid rgb(214, 217, 219)",
    borderRadius: "6px",
  },
  avatar: {
    backgroundColor: "rgb(244, 244, 245)",
    display: "flex",
    webkitBoxPack: "center",
    justifyContent: "center",
    webkitBoxAlign: "center",
    alignItems: "center",
    borderRadius: "50%",
    borderColor: "rgb(214, 217, 219)",
    borderWidth: "1px",
    borderStyle: "solid",
    boxSizing: "border-box",
    cursor: "default",
    overflow: "hidden",
    userSelect: "none",
    width: "36px",
    height: "36px",
  },
  border: {
    marginLeft: "8px",
    boxSizing: "border-box",
    marginTop: "0.5rem",
  },
  tbody: {
    flexDirection: "row",
    display: "flex",
    marginTop: "1rem",
  },
});

export default InviteUser;
