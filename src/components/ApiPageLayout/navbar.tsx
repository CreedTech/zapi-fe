import React, { SyntheticEvent, useState } from "react";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Link } from "react-router-dom";

import {
  SettingsPage,
  Analytics,
  Community,
  EndpointTab,
  GatewayTab,
  GeneralTab,
  Monetize,
  TabPanel,
} from "../";

const CustomTab = styled(Tab)({
  "&.MuiTab-root": {
    textTransform: "none",
  },
});

interface Props {
  id: string | undefined;
}

const Navbar: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (e: SyntheticEvent, newValue: number) => setTab(newValue);

  return (
    <Stack width="100%" height="100vh" direction="column">
      <Tabs
        variant="fullWidth"
        className={classes.tabs}
        value={tab}
        onChange={handleTabChange}>
        <Tab label="General" />
        <Tab label="Endpoints" />
        <Tab label="Gateway" />
        <Tab label="Community" />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>
      <div className={classes.tabpanel}>
        <TabPanel value={tab} index={0}>
          <GeneralTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <EndpointTab id={`${id}`} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <GatewayTab />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <Community />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <Analytics />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <SettingsPage />
        </TabPanel>
      </div>
    </Stack>
  );
};

export default Navbar;

const useStyles = makeStyles({
  tabpanel: {
    height: "90vh",
    overflowY: "scroll",
  },
  tabs: {
    width: "950px",
    background: "#FFFF",
    "@media screen and (max-width: 1024px)": {
      width: "100%",
      fontSize: "1.5rem",
    },
  },
});
