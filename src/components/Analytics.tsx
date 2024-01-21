import { Typography, Paper, Tabs, Tab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useMemo } from "react";
import { useAppSelector } from "../hooks";
import { AnalyticsTab, AnalyticsUser } from ".";
import { useParams } from "react-router-dom";
import ReactGA from "react-ga4";
import {
  Accessibility,
  BookmarkAdd,
  SettingsEthernet,
  WifiTethering,
} from "@mui/icons-material";

const Analytics: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabs = (e: any, value: number) => {
    setSelectedTab(value);
  };
  const { userApis } = useAppSelector((store) => store.user);
  const api = userApis.find((api) => api?.id === id);

  ReactGA.send({ hitType: "pageview", page: "/analytics" });

  useMemo(() => {
    api;
  }, [id]);
  return (
    <Paper elevation={1} className={classes.paper}>
      <div className={classes.analytics}>
        <div className="heading">
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 500,
              color: "var(--color-primary)",
            }}>
            {api!.name} - Analytics
          </Typography>
        </div>
        <Tabs
          value={selectedTab}
          onChange={handleTabs}
          TabIndicatorProps={{
            hidden: true,
          }}
          sx={{
            "& button": { borderRadius: 1 },
            "& button.Mui-selected": {
              backgroundColor: "#081f4A",
              color: "white",
            },
          }}>
          <Tab label="Requests" icon={<WifiTethering />} iconPosition="start" />
          <Tab
            label="Subscribers"
            icon={<Accessibility />}
            iconPosition="start"
          />
        </Tabs>
      </div>
      {selectedTab === 0 && <AnalyticsTab />}
      {selectedTab === 1 && <AnalyticsUser />}
    </Paper>
  );
};

export default Analytics;

//styles for analytics are in the index.css file.
const useStyles = makeStyles({
  paper: {
    width: "950px",
    marginTop: "20px",
    padding: "2rem 2rem",
  },
  analytics: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    marginBottom: "2rem",
  },
});
