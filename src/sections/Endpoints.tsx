import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import {
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  InputBase,
  IconButton,
  Stack,
  Box
} from "@mui/material";
import { ExpandMore, Menu, Search, Directions, ChatRounded } from "@mui/icons-material";
import { makeStyles, styled } from "@mui/styles";

import TabPanel from "../components/TabPanel";
import { APIType, EndpointsType } from "../types";

interface Props {
  endpoints: Array<EndpointsType>;
  api: APIType
}

const methodColor: any = {
  get: "#1B5598",
  post: "#22EF48",
  patch: "#E6BA36",
  delete: "#E64F36",
};

const CustomTabs = styled(Tabs)({
  "&.MuiTabs-root": {
    width: "auto",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const CustomTab = styled(Tab)({
  "&.MuiTab-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontWeight: "normal",
    fontSize: "14px",
  },
  "&.Mui-selected": {
    backgroundColor: "#f1f1f1",
  },
});

const CustomAccordion = styled(Accordion)({
  "&.MuiAccordion-root": {
    boxShadow: "unset",
    borderTop: "1px solid #D1D1D1",
  },
});

const Endpoints: React.FC<Props> = ({api, endpoints}) => {
  const [tab, setTab] = useState<number>(0);
  const classes = useStyles();

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box className={classes.root}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "45%",
        }}>
        <Box>
          <Typography
            sx={{
              marginBottom: "10px",
              fontSize: "21px",
              fontWeight: "bold",
              color: "#264276",
              padding: "5px",
            }}>
            Endpoints
          </Typography>
          <Paper
            component="form"
            sx={{
              boxShadow: "unset",
              display: "flex",
              alignItems: "center",
              border: "1px solid #d1d1d1",
              borderRadius: "0",
              padding: "2px 8px",
              margin: "0 0 1rem",
            }}>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                fontSize: "13px",
                fontFamily: "Space Grotesk",
                color: "#000",
              }}
              placeholder="Search endpoints"
              inputProps={{ "aria-label": "search endpoints" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search sx={{ width: "21px" }} />
            </IconButton>
          </Paper>
          {endpoints && endpoints.length !== 0 ? (
            <Box>
              <CustomTabs
                value={tab}
                orientation="vertical"
                onChange={handleTabChange}>
                {endpoints?.map((endpoint, index) => (
                  <CustomTab
                    key={index}
                    label={
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        px={1}>
                        <p style={{color:methodColor[endpoint.method],fontSize:"14px",fontWeight:600}}>
                          {endpoint.method}
                        </p>
                        <p>{endpoint.name}</p>
                      </Stack>
                    }
                  />
                ))}
              </CustomTabs>
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "80px", width: "100%" }}>
                  <ChatRounded sx={{ fontSize: "28px", color: "#264276", }} />
                  <Typography sx={{fontSize:"15px",color:"#515D99"}}>There are no endpoints in this API.</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box style={{ width: "100%" }}>
        {endpoints && endpoints.length !== 0 ? (
          <Box>
            {endpoints?.map((endpoint, index) => (
              <TabPanel key={index} value={tab} index={index}>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: methodColor[endpoint.method],
                      textTransform: "uppercase",
                    }}>
                      {endpoint.method}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#515D99",
                      textTransform: "capitalize",
                    }}>
                      {endpoint.name}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    marginBottom: "10px",
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "#264276",
                  }}>
                  Endpoint Description
                </Typography>
                <Typography
                  sx={{
                    marginBottom: "2rem",
                    fontSize: "14px",
                    color: "#515D99",
                    width: "100%",
                  }}>
                  {endpoint.description}
                </Typography>
                <CustomAccordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontSize: "15px", color: "#264276" }}>
                      Headers Parameters
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {endpoint?.headers?.map((header, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={4} my={1}>
                        <Stack width={200} direction="column" spacing={1} sx={{padding:"0 10px"}}>
                          <Typography sx={{fontSize:"18px",color:"#264276"}}>{header.name}</Typography>
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>{header.type}</Typography>
                        </Stack>
                        <Stack direction="column" spacing={1}>
                          <input style={{ border: "1px solid #515D99" }} type="text" defaultValue={header.value} className={classes.input} disabled />
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>
                            {header.required ? "*required":"not required"}</Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </CustomAccordion>
                <CustomAccordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontSize: "15px", color: "#264276" }}>
                      Body Parameters
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>                    
                    {endpoint?.body?.map((bodyItem, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={4} my={1}>
                        <Stack width={200} direction="column" spacing={1} sx={{padding:"0 10px"}}>
                          <Typography sx={{fontSize:"18px",color:"#264276"}}>{bodyItem.name}</Typography>
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>{bodyItem.type}</Typography>
                        </Stack>
                        <Stack direction="column" spacing={1}>
                          <input style={{ border: "1px solid #515D99" }} type="text" defaultValue={bodyItem.value} className={classes.input} disabled />
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>
                            {bodyItem.required ? "*required":"not required"}</Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </CustomAccordion>
                <CustomAccordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography sx={{ fontSize: "15px", color: "#264276" }}>
                      Query Parameters
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>                    
                    {endpoint?.query?.map((queryItem, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={4} my={1}>
                        <Stack width={200} direction="column" spacing={1} sx={{padding:"0 10px"}}>
                          <Typography sx={{fontSize:"18px",color:"#264276"}}>{queryItem.name}</Typography>
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>{queryItem.type}</Typography>
                        </Stack>
                        <Stack direction="column" spacing={1}>
                          <input style={{ border: "1px solid #515D99" }} type="text" defaultValue={queryItem.value} className={classes.input} disabled />
                          <Typography sx={{fontSize:"12px",color:"#264276",textTransform:"uppercase"}}>
                            {queryItem.required ? "*required":"not required"}</Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </AccordionDetails>
                </CustomAccordion>
              </TabPanel>
            ))}
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    gap: "2.5rem",
    margin: "0 0 8rem",
  },
  paper: {
    boxShadow: "unset",
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    border: "1px solid #d1d1d1",
    borderRadius: "4px",
    padding: "2px 8px",
    width: "auto",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    "& p": {
      fontSize: "15px",
      color: "#515D99",
    },
  },
  input: {
    width: "300px",
    height: "30px",
    padding: "0 0.5rem",
    borderRadius: "4px",
    border: "1px solid #000",
    outline: "none",
    color: "#000"
  }
});

export default Endpoints;
