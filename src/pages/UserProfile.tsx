import React, { SyntheticEvent, useState, useEffect } from 'react'
import { DevAPICard, UserProSideBar, TabPanel} from "../components";
import { Stack,  Tabs, Tab, Box} from '@mui/material'
import { makeStyles } from '@mui/styles';
import styled from "@emotion/styled";

import { useContextProvider } from "../contexts/ContextProvider";
import { APIS, USER } from "../testdata";

const UserProfile:React.FC = () => {
  const classes = useStyles();
  const [tab, setTab] = useState<number>(0);
  const { setActiveMenu, screenSize, setScreenSize } = useContextProvider();
  
  useEffect(() => {
      const handleScreenResize = () => setScreenSize(innerWidth)
      window.addEventListener('resize', handleScreenResize)
      handleScreenResize()
      return () => window.removeEventListener('resize', handleScreenResize)
    },[]);

  useEffect(() => {
  screenSize <= 900 ? setActiveMenu(false) : null
  },[screenSize]);

  const handleTabSwitch = (e: SyntheticEvent, newValue: number) => {
      setTab(newValue)
  };

  const list = APIS.length

  return(
    <> 
    <Stack direction='row' className={classes.root}>
        <Stack className={classes.sidebar}>
          {USER.map((user) => (
            <UserProSideBar key={user.id} {...user} />
          ))}                
        </Stack>
        <div className={classes.main}>
        <Stack className={classes.tabmain}>
          <Box sx={{ width: '100%' }}>
            <StyledTabs value={tab} onChange={handleTabSwitch}>
            <Tab  className={classes.tabs} label= {`Published APIs (${list})`} />
            <Tab className={classes.tabs} label='Subscribed APIs'/>
            <Tab className={classes.tabs} label='Followed By(0)' />
            <Tab className={classes.tabs} label='Following(0)'/>
            </StyledTabs>
          </Box>
            <Stack mt={2}>
            <TabPanel value={tab} index={0}>
            <div style={{width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:"1.5rem",overflowY:"scroll",padding:"0.5rem 0"}}>
                {APIS.map((api) => (
                <DevAPICard key={api.id} {...api} />
                ))}
            </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                No Subscription
            </TabPanel>
            <TabPanel value={tab} index={2}>
                Not Followed Yet
            </TabPanel>
            <TabPanel value={tab} index={3}>
                Not Following Yet
            </TabPanel>
            </Stack>
        </Stack>
        </div>   
    </Stack>
    </>
  )
}

const StyledTabs = styled(({  ...other }) => {
  return (
    <Tabs
      {...other}
      classes={{
        
        flexContainer: "flexContainer",
        indicator: "indicator"
      }}
      variant="fullWidth"
      TabIndicatorProps={{ children: <span /> }}
      centered
    />
  );
})({
  "& .indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 80,
      width: "100%",
      backgroundColor: "#081F4A"
    }
  },
  "& .flexContainer": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // width:'fit-content'
  }
});





const useStyles = makeStyles({
    tabs:{
      letterSpacing: '0.15rem',
      fontWeight: 'bold',
        '&:hover':{
          backgroundColor: 'rgba(0,0,0,0.1)',
        }
      },
      root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        marginTop: '5px'
      },
      main: {
        width: "80%",
        flexGrow: 1,
        background: "#FFF",
        
      },
      tabmain: {
        marginTop: "2.5rem",
        marginLeft: "2rem"
      },
      sidebar: {
        width: "20%",
        "@media screen and (max-width: 900px)": {
          display: "none",
        }
      },

})


export default UserProfile;