import React from "react";
import { makeStyles } from "@mui/styles";
import { Fab } from "@mui/material";
import { List } from "@mui/material";

export const DIRECTIONS = {
  up: "column-reverse",
  down: "column",
  left: "row-reverse",
  right: "row",
};

export enum Directions {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export interface FloatingMenuProps {
  children: JSX.Element[] | JSX.Element | string;
  spacing?: number;
  slidespeed?: number;
  direction?: Directions;
  isOpen: boolean;
}

const FloatingMenu = ({
  slidespeed = 500,
  direction = Directions.Down,
  isOpen = false,
  spacing = 8,
  children,
  ...rest
}: FloatingMenuProps) => {
  const childrenWithProps = React.Children.map(
    children,
    (child: any, index: number) =>
      React.cloneElement(child, {
        isOpen,
        slidespeed,
        direction,
        index,
        spacing,
      })
  );

  return (
    <Fab color="primary">
      <List sx={listStyle(direction)} {...rest}>
        {childrenWithProps}
      </List>
    </Fab>
  );
};

export default FloatingMenu;

const listStyle = (direction: Directions = Directions.Down) => {
  return {
    position: "fixed",
    bottom: "1%",
    right: "1%",
    display: "flex",
    width: "fit-content",
    listStyle: "none",
    margin: "0",
    padding: "0",
    flexDirection: DIRECTIONS[direction],
    justifyContent: "center",
    alignItems: "center",
    animation: `$pulse 1s infinite`,
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
      },
      "50%": {
        transform: "scale(1.1)",
      },
      "100%": {
        transform: "scale(1)",
      },
    },
  };
};
