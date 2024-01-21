import React, { ReactNode, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from 'react-router-dom';
import { Stack, Typography, Avatar, TextField, Tabs, Tab, Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";



import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConstructionIcon from '@mui/icons-material/Construction';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type Props = {
  addApi?: ReactNode,
};
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



const APIPage: React.FC<Props> = ({addApi}) => {
  const [open, setOpen] = React.useState<boolean>(true);

  const handleClick = (e: React.SyntheticEvent) => {
      setOpen(!open);
  };
  
  const [value, setValue] = useState<number>(0);
  const [query, setQuery] = useState<string>('')
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh'}}
      >
        <div>
          <Stack direction="row" sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'center', paddingBottom: '20px' }}>
            <Avatar
              alt="Jemy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <Typography sx={{ margin: '0px 10px'}}>John Doe Dummy user</Typography>
          </Stack> <hr />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
                aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: '#fff', display: 'flex'}}
            >
              
            <Tab label="Add API"{...a11yProps(0)} icon={<AddIcon />} iconPosition="start"  />
            <Tab label="Payment Setting" {...a11yProps(1)} icon={<AccountBalanceWalletIcon />} iconPosition="start" />
            <Tab label="Support" {...a11yProps(2)} icon={<SupportAgentIcon />} iconPosition="start" />
          </Tabs>
          <Stack direction='row' alignItems='center'>
            <form>
              <TextField type='text' id='text-with-icon-adornment' sx={{ width: '190px', marginLeft: '25px'}} value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Seach By API Name' />
            </form>
          </Stack>

      <List
        sx={{ width: "100%"}}
        >
        <ListItemButton onClick={handleClick}>
            <ListItemText primary="default-application">
            </ListItemText>
                <ExpandMore />
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
            {/* Dashboard */}
            <List component="div" disablePadding>
            <Link to='/developers/dashboard/' className={classes.link}>
              <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                  <DashboardIcon  />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
              </ListItemButton>
            </Link>
            </List>
            {/* Configuration */}
            <List component="div" disablePadding>
            <Link to='/configuration' className={classes.link}>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                < ConstructionIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
            </ListItemButton>
            </Link>
            </List>
             {/* Analytics */}
             <List component="div" disablePadding>
            <Link to='/analytics' className={classes.link}>
              <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                  < BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
              </ListItemButton>
            </Link>
            </List>
        </Collapse>
        </List> 
        </div>

        {/* Tab Panels */}
        <TabPanel value={value} index={0}>
          {addApi}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>payment</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>security</Typography>
        </TabPanel>
      </Box>
    </div>
  )
}
const useStyles = makeStyles({
 shadow: {
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  },
  align: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  link: {
    color: 'var(--color-primary)'
  }
})
export default APIPage