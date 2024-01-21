import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { CATEGORIES } from "../testdata";

const Sidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" mb={2}>
        Categories
      </Typography>
      <List className={classes.list}>
        {CATEGORIES.map((category, index) => (
          <Link key={index} to={`categories/${category}`}>
            <ListItem>
              {category}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "max-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    padding: "0 0.25rem",
    textAlign: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& li": {
      color: "var(--color-primary)",
      textTransform : "capitalize",
      transititon: "1s all ease",
      "&:hover": {
        // color: "var(--color-secondary)",
        transform: "translateX(-8px)",
      }
    }
  }
});

export default Sidebar;