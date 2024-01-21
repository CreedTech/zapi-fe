import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CloseOutlined } from "@mui/icons-material";

import {
  DevAPICard,
  InputSearch,
  Navbar,
  Sidebar,
  TabPanel,
  Pricing,
} from "../components";
import { useContextProvider } from "../contexts/ContextProvider";
import { APIS } from "../testdata";

const data = ["Name", "Id", "Desc"];

const Home: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);
  const [queryString, setQueryString] = useState<string>("");
  const [queryParam, setQueryParam] = useState<string>("");
  const { activeMenu, screenSize, setActiveMenu, setScreenSize } =
    useContextProvider();

  useEffect(() => {
    const handleScreenResize = () => setScreenSize(innerWidth);
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  useEffect(() => {
    screenSize <= 900 ? setActiveMenu(false) : null;
  }, [screenSize]);

  const handleTabSwitch = (e: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      {/* This is still experimental at the moment it might be moved to App.tsx */}
      {/* This is the drawer itself */}
      <div
        className={classes.drawer}
        style={{ left: activeMenu ? 0 : "-100%" }}>
        <Stack
          width="100%"
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          p={2}>
          <div>
            <img
              src="/images/zapi-logo.png"
              alt="zapi-logo"
              style={{ width: 30 }}
            />
          </div>
          <IconButton onClick={() => setActiveMenu(false)}>
            <CloseOutlined />
          </IconButton>
        </Stack>
        <Sidebar />
      </div>
      <Navbar
        title="Welcome to the ZAPI Hub"
        subtitle="Here you will find our Collection of APIs for developers"
      />
      <div className={classes.App}>
        {/* section for search */}
        <form onSubmit={handleSubmit} className={classes.search}>
          <InputSearch
            className={classes.formControl}
            type="select"
            name="queryParams"
            value={queryParam}
            onSelect={(e: ChangeEvent<HTMLSelectElement>) =>
              setQueryParam(e.target.value)
            }
            placeholder="Sort by"
            data={data}
          />
          <InputSearch
            className={classes.formControl}
            type="text"
            name="queryString"
            value={queryString}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setQueryString(e.target.value)
            }
            placeholder="I'm looking for..."
          />
        </form>
        <div className={classes.root}>
          <div className={classes.sidebar}>
            <Sidebar />
          </div>
          <div className={classes.main}>
            <Stack>
              <Tabs value={tab} onChange={handleTabSwitch}>
                <Tab label="Recommended APIs" />
                <Tab label="Popular APIs" />
                <Tab label="Free APIs" />
              </Tabs>
              <Stack mt={2}>
                <TabPanel value={tab} index={0}>
                  <Typography variant="subtitle2" mb={2}>
                    APIS curated by Z-API and recommended based on functionality
                    offered, performance and support
                  </Typography>
                  <div className={classes.tabInner}>
                    {APIS.map((api) => (
                      <DevAPICard key={api.id} {...api} />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Typography variant="subtitle2" mb={2}>
                    APIs that are popular and frequently used on Z-API.
                  </Typography>
                  {/* Pricing is lying in this section for the main time, until singleApi page is created */}
                  <div className={classes.pricing}>
                    <Pricing />
                  </div>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <Typography variant="subtitle2" mb={2}>
                    If you're new to Z-API, this collection is a great place to
                    start exploring APIs that are free to test, specifically
                    updated for 2022.
                  </Typography>
                  <div className={classes.tabInner}></div>
                </TabPanel>
              </Stack>
            </Stack>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  App: {
    height: "83vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "@media screen and (max-width: 768px)": {
      height: "auto",
    },
  },
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  search: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    margin: "2rem 0",
    "@media screen and (max-width: 768px)": {
      flexDirection: "column-reverse",
      gap: 0,
    },
  },
  sidebar: {
    width: "20%",
    "@media screen and (max-width: 900px)": {
      display: "none",
    },
  },
  main: {
    width: "80%",
    flexGrow: 1,
    background: "#FFF",
  },
  drawer: {
    width: 300,
    height: "100vh",
    background: "#FFF",
    position: "absolute",
    top: 0,
    zIndex: 5,
    borderRight: "1px solid var(--color-primary)",
    transition: "1s all ease",
  },
  tabInner: {
    width: "100%",
    height: "60vh",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    overflowY: "scroll",
    padding: "0.5rem 0",
  },
  formControl: {
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    background: "#FFF",
    padding: "0.25rem 1rem",
    marginTop: "6rem",
    borderRadius: 5,
    "& input": {
      width: 250,
      height: "100%",
      outline: "none",
      border: "none",
    },
    "& select": {
      width: 100,
      height: "100%",
      outline: "none",
      border: "none",
    },
    "@media screen and (max-width: 900px)": {
      marginTop: "1rem",
    },
  },
  pricing: {
    width: "100%",
    height: "60vh",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5rem",
    overflowY: "scroll",
    padding: "0.5rem 0",
  },
});

export default Home;
