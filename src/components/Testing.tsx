import React, { SyntheticEvent, useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "universal-cookie";

import { APIType, EndpointsType } from "../types";
import { useHttpRequest } from "../hooks";
import { TabPanel } from "../components";
import Tests from "../components/Tests";

interface Props {
  id: string | undefined;
}

const Testing: React.FC<Props> = ({ id }) => {
  const [tab, setTab] = useState<number>(0);
  const cookies = new Cookies();
  const classes = useStyles();

  const handleTabChange = (e: SyntheticEvent, value: number) => setTab(value);

  return (
    <Box className={classes.container}>
      <Tabs value={tab} onChange={handleTabChange} className={classes.tab}>
        <Tab label="Tests" />
        <Tab label="Performance" />
        <Tab label="Testing Settings" />
      </Tabs>
      <Box className={classes.main}>
        <TabPanel value={tab} index={0}>
          <Tests id={id} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <p>Performance</p>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <p>Testing Setting</p>
        </TabPanel>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  tab: {
    width: "950px",
  },
  main: {
    width: "100%",
    height: "100%",
    margin: "20px 0 0",
  },
});

export default Testing;
