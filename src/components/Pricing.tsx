import React, { SyntheticEvent, useState } from "react";
import { Avatar, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { LooksOne, LooksTwo, Looks3, ExpandMore } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import PricingTable from "./PricingTable";

import developers from "../assets/images/people.jpg";
import publicapis from "../assets/images/public.jpg";
import apicalls from "../assets/images/apicalls.jpg";
import countries from "../assets/images//countries.jpg";
import sponsors from "../assets/images/sponsors.jpg";
import charts from "../assets/images/charts.jpg";


const Pricing:React.FC = () => {
    const classes = useStyles()

    const [open, setOpen] = React.useState<boolean>(true);

    const handleClick = (e: SyntheticEvent) => {
        setOpen(!open);
    };


  return (
    <div>
         <Stack direction="column" alignItems="center" justifyContent="center">
        {/* Heading Section */}
        <Stack direction="column" width="70%" alignItems="center" textAlign="center">
            <Typography variant="h5" gutterBottom>
                Choose the Right Plan For You
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
                ZAPI partners directly with API providers to give you no-fuss, transparent pricing. Find a plan that best matches the scale you need for your application.
            </Typography>
        </Stack>
       {/* Select Account Section */}
        <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", borderRadius: "5px"}}
        >
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
            <Avatar />
            </ListItemIcon>
            <ListItemText primary="Personal Account">
            </ListItemText>
                <ExpandMore />
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                < Avatar />
                </ListItemIcon>
                <ListItemText primary="Dummy Name" />
            </ListItemButton>
            </List>
        </Collapse>
        </List>
        {/* Pricing Table Section */}
        <Stack direction="column" width="80%" alignItems="center" justifyContent="space-between">
            <PricingTable />
        </Stack>
         {/* FAQ Section */}
        <Stack direction="column" width="70%" textAlign="center">
            <Stack direction="column" className={classes.section}>
                <Typography variant="h5" gutterBottom>
                        Frequently Asked Questions
                </Typography>
                <Stack textAlign="left">
                  <Typography variant="body1">
                        <strong>Is my payment information secure?</strong>
                   </Typography>
                   <Typography variant="caption">
                        Credit cards are processed through a PCI compliant banking partner.
                   </Typography>
                </Stack><br/>
                <Stack textAlign="left">
                  <Typography variant="body1">
                        <strong>Why do you require a credit card for a freemium API?</strong>
                   </Typography>
                   <Typography variant="caption">
                        We work directly with API providers to implement clear, transparent pricing for developers. The Provider may require a credit card if a plan has a quota with an overage fee. If you would no longer like to use the API, you can unsubscribe from the plan at anytime by clicking the "unsubscribe" button under the Billing section of the API Hub Dashboard.
                   </Typography>
                </Stack><br/>
                <Stack textAlign="left">
                  <Typography variant="body1">
                        <strong>What if I exceed my plan limits?</strong>
                   </Typography>
                   <Typography variant="caption">
                        Depending on your plan's specification, you will either incur overage charges or be suspended.
                   </Typography>
                </Stack><br/>
                <Stack textAlign="left">
                  <Typography variant="body1">
                        <strong>When will I be billed?</strong>
                   </Typography>
                   <Typography variant="caption">
                        We charge your credit card upon subscription to an API's plan and at the next recurring interval.
                   </Typography>
                </Stack><br/>
                <Stack textAlign="left">
                  <Typography variant="body1">
                        <strong>How are refunds handled?</strong>
                   </Typography>
                   <Typography variant="caption">
                        For refund requests, please contact us at zapiaistudio@gmail.com
                   </Typography>
                </Stack><br/>
            </Stack>
        </Stack>
        {/* ScaleFeatures-Section */}
        <Stack direction="column" width="70%" textAlign="center">
            <Typography variant="h5" gutterBottom>
                    A Proven Platform With Scale
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
                    Starting with the Google Search API - you have access to an extensive ecosystem to accelerate your development process
            </Typography>
            <Stack alignItems="center">
                <Stack textAlign="center" justifyContent="space-between" spacing={12} direction={{xs: "column", sm: "column", md: "row", lg: "row"}} mt={2}>
                    <Stack alignItems='center'>
                        <img className={classes.img} src={developers} alt="developers" width="90px" height="60px" />
                        <Typography variant="h5" gutterBottom>
                            3,000,000
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            Developers
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <img className={classes.img} src={publicapis} alt="publicapis" width="90px" height="60px" />
                        <Typography variant="h5" gutterBottom>
                            Thousands
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            of Public APIs
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <img className={classes.img} src={apicalls} alt="apicalls" width="90px" height="60px" />
                        <Typography variant="h5" gutterBottom>
                            Billions
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            of API Calls / Month
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <img className={classes.img} src={countries} alt="countries" width="90px" height="60px" />
                        <Typography variant="h5" gutterBottom>
                            175
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            Countries served
                        </Typography>
                    </Stack>
                </Stack>
                <Stack mt={2} maxWidth="100%">
                    <img src={sponsors} alt="sponsors" />
                </Stack><br/>
            </Stack>
        </Stack>
        {/* ScaleFeatures-SectionII */}
        <Stack direction="column" width="70%" textAlign="center">
            <Typography variant="h5" gutterBottom>
                One Dashboard, All Your APIs
            </Typography>
            <Typography variant="subtitle1" textAlign="center">
                ZAPI provides clear visibility on all of the API you use. Worry less about juggling multiple keys and subscription accounts.
            </Typography>
            <Stack alignItems="center">
                <Stack textAlign="center" justifyContent="space-between" spacing={1} direction={{xs: "column", sm: "column", md: "row", lg: "row"}} mt={2}>
                    <Stack alignItems="center">
                        <LooksOne sx={{ width: 65, height: 65, objectFit: "contain", color: blue[500]}}/>
                        <Typography variant="h5" gutterBottom>
                            Call volume and billing
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            Monitor call volumes and corresponding billing charges for all APIs in one dashboard.
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <LooksTwo sx={{ width: 65, height: 65, objectFit: "contain", color: blue[500] }}/>
                        <Typography variant="h5" gutterBottom>
                            Errors and latency
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            Ensure your app’s uptime by keeping track of API errors and trends in latency.
                        </Typography>
                    </Stack>
                    <Stack alignItems="center">
                        <Looks3 sx={{ width: 65, height: 65, objectFit: "contain", color: blue[500] }}/>
                        <Typography variant="h5" gutterBottom>
                            Logs for your API calls
                        </Typography>
                        <Typography variant="subtitle1" textAlign="center">
                            Debug faster by searching and viewing logs for your API calls.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack mt={2} maxWidth="100%">
                    <img src={charts} alt="charts" />
                </Stack>
            </Stack>
        </Stack>
    </Stack>
    </div>
  )
}

const useStyles = makeStyles({
    section: {
        margin: "1.5rem 0 0 0",
    },
    img: {
        "@media screen and (max-width: 800px)": {
            marginTop: "2rem",
        }
    }
})


export default Pricing
