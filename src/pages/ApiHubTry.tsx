import React, { SyntheticEvent, useState, useEffect,FormEvent } from "react";
import {AppBar,Tabs,Tab,Typography,Box} from "@mui/material/";

interface IApiHubTry {
    children: React.ReactNode
    className?: string
    value: number
    index: number | string
    // categoryId:string
}
const TabPanel: React.FC<IApiHubTry> =({ children, value, index, ...other })=> {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ApiHubTry: React.FC =()=> {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event:FormEvent, newTab:any) => {
    setCurrentTab(newTab);
  };
  const fetchedCategories = [
    {
      label: "All",
      description: "All description"
    },
    {
      label: "Salad/Soup",
      description: "Salad/Soup description"
    },
    {
      label: "Starter/Side Order",
      description: "Starter/Side Order description"
    }
  ];

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {fetchedCategories.map((category) => (
            <Tab key={category.label} label={category.label} />
          ))}
        </Tabs>
      </AppBar>
      {fetchedCategories.map((category, index) => (
        <TabPanel key={category.label} value={currentTab} index={index}>
          {category.description}
        </TabPanel>
      ))}
    </div>
  );
}

export default ApiHubTry;
