import React, { SyntheticEvent, useEffect, useState } from "react";
import { makeStyles, styled } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { LanguageOutlined, ScienceOutlined } from "@mui/icons-material";

import { ApiPageLayout, DevNavbar, TabPanel } from "../components";
import Testing from "../components/Testing";
import { useAppSelector } from "../hooks";
import ErrorPage from "./ErrorPage";
import ReactGA from "react-ga4";

const CustomTabs = styled(Tabs)({
  "&.MuiTabs-root": {
    width: "200px",
    padding: "0 8px",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const CustomTab = styled(Tab)({
  "&.MuiTab-root": {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: 500,
    fontSize: "14px",
    color: "#081F4A",
    borderRadius: "5px",
    margin: "0.25rem 0",
  },
  "&.MuiButtonBase-root": {
    minHeight: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textTransform: "uppercase",
    fontSize: "14px",
    color: "#071B85",
    "&.Mui-selected": {
      background: "#081F4A",
      color: "#FFF",
    },
  },
});

const TabItems = [
  { name: "Hub Listing", icon: <LanguageOutlined /> },
  { name: "Tests", icon: <ScienceOutlined /> },
];

const DeveloperApiPage: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const { userApis } = useAppSelector((store) => store.user);
  const api = userApis.find((api) => api?.id === id);
  const [tab, setTab] = useState<number>(0);

  ReactGA.send({ hitType: "pageview", page: "/developer/api/id" });

  const handleTabChange = (e: SyntheticEvent, value: number) => setTab(value);

  if (api === undefined) {
    return <ErrorPage />;
  }

  return (
    <div className={classes.root}>
      <Box sx={{ width: "100%", height: "70px" }}>
        <DevNavbar />
      </Box>
      <div className={classes.container}>
        <Stack className={classes.sidebar}>
          <CustomTabs
            orientation="vertical"
            value={tab}
            onChange={handleTabChange}>
            {TabItems.map((item, index) => (
              <CustomTab
                key={index}
                label={item.name}
                icon={item.icon}
                iconPosition="start"
              />
            ))}
          </CustomTabs>
        </Stack>
        <Box className={classes.scroll}>
          <TabPanel value={tab} index={0}>
            <ApiPageLayout id={id} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Testing id={id} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    height: "92vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sidebar: {
    height: "100%",
    padding: "3rem 0.75rem 0",
  },
  scroll: {
    width: "100%",
    height: "100%",
    overflowY: "hidden",
    padding: "1rem 0.5rem 0",
  }
});

export default DeveloperApiPage;
