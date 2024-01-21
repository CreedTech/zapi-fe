import React, { SyntheticEvent, useState, useEffect } from "react";
import { Tab, Tabs, Button, Tooltip, Box, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { toast } from "react-toastify";
import {
  Apps,
  Build,
  School,
  ChatBubble,
  Layers,
  Security,
  LibraryBooks,
  SportsFootball,
  AirplanemodeActive,
  AttachMoney,
  DataArray,
  ArrowBackIos,
  ArrowForwardIos,
  Science,
  MusicNote,
  FormatColorText,
  Cloud,
  Lightbulb,
} from "@mui/icons-material";
import APICard from "../components/APICard";
import { useAppSelector, useHttpRequest } from "../hooks";
import { TabPanel, Fallback } from "../components";

const default_url = import.meta.env.VITE_DEFAULT_CATEGORY_ID;

const core_url = "VITE_CORE_URL";
const APIHubTab: React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState<any>();
  const [categoryId, setCategoryId] = useState<string>(default_url);
  const { categories } = useAppSelector((store) => store.apis);
  const { error, loading, sendRequest } = useHttpRequest();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isSlide, setIsSlide] = useState<boolean>(true);
  const [categoryApis, setCategoryApis] = useState<any>([]);
  const handleSideBarChange = () => {
    if (isOpen) {
      if (isSlide) setIsOpen(false);
    } else {
      if (isSlide) setIsOpen(true);
    }
  };


  const handleTabChange = (e: SyntheticEvent, value: any) => {
    setCategoryId(value);
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const handleSelector = async (id: any) => {
    if (categoryId === null || undefined) return;
    try {
      const res = await sendRequest(
        `/categories/${id}/apis`,
        "get",
        core_url,
        undefined,
        headers
      );
      setCategoryApis(res);
    } catch (error) {}
  };
  useEffect(() => {
    handleSelector(categoryId);
  }, [categoryId]);

  useEffect(() => {
    error && toast.error(`${error}`);
  }, [error]);

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 580) {
      setIsOpen(false);
      setIsSlide(false);
    } else {
      setIsSlide(true);
    }
  });

  let icons: any = {
    "popular apis": <LibraryBooks />,
    "safety apis": <Layers />,
    "security apis": <Security />,
    "customer service apis": <ChatBubble />,
    "general apis": <Lightbulb />,
    "sports": <SportsFootball />,
    "travel": <AirplanemodeActive />,
    "finance": <AttachMoney />,
    "educational": <School />,
    "data": <DataArray />,
    "science": <Science />,
    "music": <MusicNote />,
    "tools": <Build />,
    "text analysis": <FormatColorText />,
    "weather": <Cloud />,
    "all": <Apps />,
  };

  return (
    <Box className={classes.container}>
      {loading && <Fallback />}
      {isOpen ? (
        <Box className={classes.list}>
          <Box 
            sx={{
              paddingRight: "25px",
              maxHeight: "510px",
              overflowY: "scroll",

              "&::-webkit-scrollbar": {
                width: "2px"
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#071B85",
                borderRadius: 0
              },
              
            }}
          >
            <StyledTabs
              orientation="vertical"
              value={categoryId}
              onChange={handleTabChange}>
              {categories.map((category, index) => (
                <StyledTab
                  key={category.id}
                  label={category.name}
                  value={category.id}
                  iconPosition="start"
                  icon={icons[category.name.toLowerCase()]}
                />
              ))}

            </StyledTabs>
          </Box>

          <Tooltip title="Collapse" placement="right" arrow>
            <Button

                id="collapseButton" 
                onClick={handleSideBarChange}
                sx={{ marginRight: "-20px" }}
            >
              <ArrowBackIos
                sx={{ color: "#071B85", width: "18px", height: "auto" }}
              />
            </Button>
          </Tooltip>
        </Box>
      ) : (
        <Box
          className={classes.list}
          style={{ display: "flex", alignItems: "center", width: "auto" }}
        >

          <Box 
            sx={{
              paddingRight: "25px",
              maxHeight: "510px",
              overflowY: "scroll",

              "&::-webkit-scrollbar": {
                width: "2px"
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#071B85",
                borderRadius: 0
              },
              
            }}
          >
            
            <StyledTabs
              orientation="vertical"
              value={categoryId}
              onChange={handleTabChange}>
              {categories.map((category, index) => (
                <Tooltip
                  key={index}
                  title={category.name}
                  placement="right"
                  arrow>
                  <StyledTab
                    key={index}
                    iconPosition="start"
                    icon={icons[category.name.toLowerCase()]}
                    value={category.id}
                  />
                </Tooltip>
              ))}

            </StyledTabs>

          </Box>

          <Tooltip title="Expand" placement="right" arrow>
            {isSlide ? (
              <Button
                id="expandButton"
                onClick={handleSideBarChange}
                sx={{ width: "100%" }}>
                <ArrowForwardIos
                  sx={{
                    marginLeft: "-12px",
                    color: "#071B85",
                    width: "18px",
                    height: "auto",
                  }}
                />
              </Button>
            ) : (
              <></>
            )}
          </Tooltip>
        </Box>
      )}

      <Box
        className={classes.col}
        style={isOpen ? { width: "100%" } : { width: "89%" }}>
        <Box>
          {categories.map((category: any, index: number) => (
            <TabPanel key={index} value={category.id} index={categoryId}>
              <>
                <Box className={classes.header}>
                  <Typography component="h2">{category.name}</Typography>
                  <Typography component="p">{category.description}</Typography>
                </Box>
                <Box className={classes.grid}>
                  {categoryApis?.map((api: any) => (
                    <APICard key={api.id} {...api} />
                  ))}
                          
                </Box>
              </>
            </TabPanel>
          ))}

        </Box>
      </Box>
    </Box>
  );
};

const StyledTabs = styled(Tabs)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: "24px",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "@media screen and (max-width: 400px)": {
    width: "50px",
  },
});

const StyledTab = styled(Tab)({
  gap: "16px",
  "&.Mui-selected": {
    backgroundColor: "#DADDE4",
    borderLeft: "2px solid #314298",
    color: "#071b85",
    "& svg": {
      marginLeft: "-1px",
    },
  },
  "&.MuiButtonBase-root": {
    marginBottom: "24px",
    minHeight: "56px",
    display: "flex",
    justifyContent: "flex-start",
    textTransform: "capitalize",
    textAlign: "left",
    borderRadius: "0 8px 8px 0",
    paddingLeft: "35px",
    fontSize: "15px",
    color: "#071B85",
    "@media screen and (max-width: 990px)": {
      fontSize: "13px",
    },
    "@media screen and (max-width: 820px)": {
      fontSize: "12px",
    },
    "@media screen and (max-width: 500px)": {
      justifyContent: "center",
      minHeight: "40px",
      padding: "0",
    },
    "@media screen and (max-width: 400px)": {
      justifyContent: "flex-start",
      paddingLeft: "18px",
    },
  },
  "& svg": {
    color: "#071B85",
    width: "22px",
    height: "22px",
    "@media screen and (max-width: 990px)": {
      width: "20px",
      height: "20px",
    },
    "@media screen and (max-width: 820px)": {
      width: "18px",
      height: "18px",
    },
    "@media screen and (max-width: 400px)": {
      width: "16px",
      height: "16px",
    },
  },
});

const useStyles = makeStyles({
  container: {
    width: "auto",
    display: "flex",
    // gap: "16px",
    margin: "0 0 80px 1rem",
    "@media screen and (max-width: 1024px)": {
      margin: "0 0 80px 1rem",
    },
    "@media screen and (max-width: 900px)": {},
    "@media screen and (max-width: 820px)": {
      gap: "22px",
    },
    "@media screen and (max-width: 770px)": {},
    "@media screen and (max-width: 375px)": {
      margin: "0 0 50px 1rem",
    },
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "#fff",
    paddingTop: "0px",
    width: "300px",
    height: "100%",
    overflowX: "hidden",
    "@media screen and (max-width: 500px)": {
      width: "100%",
    },
  },
  col: {
    padding: "0 1rem 0 30px",
    width: "100%",
    height: "auto",
    "@media screen and (max-width: 900px)": {},
    "@media screen and (max-width: 820px)": {
      padding: "0 1rem 0 22px",
    },
    "@media screen and (max-width: 500px)": {
      border: "unset",
      padding: "0 1rem 0 0",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
    color: "#071B85",
    top: 0,
    left: 0,
    "& h2": {
      marginBottom: "3px",
      fontSize: "22px",
      fontWeight: "bold",
      textTransform: "capitalize",
      "@media screen and (max-width: 820px)": {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "14px",
      "@media screen and (max-width: 820px)": {
        fontSize: "12px",
      },
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridTemplateRows: "260px",
    gap: "15px 0",
    marginLeft: "-11px",
    padding: "0 10px 0 0",
    width: "100%",
    height: "480px",
    overflowY: "scroll",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "4px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#071B85",
      borderRadius: 0
    },
    
  },
});

export default APIHubTab;
