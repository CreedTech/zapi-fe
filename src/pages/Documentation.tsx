import React, { useState, SyntheticEvent } from 'react'
import { makeStyles, styled } from '@mui/styles'

import { HomeNavbar, Footer } from '../sections';
import ReactGA from "react-ga4";

import { Tab, Tabs, Typography, Box } from "@mui/material";
import { Filter1, Filter2, Filter3, Filter4, Filter5 } from "@mui/icons-material";
import TabPanel from "../components/TabPanel";
import { Link } from 'react-router-dom';

import apihub from "../assets/images/apihub.png";
import apihubbox from "../assets/images/apihubbox.png";
import signup from "../assets/images/signup.png";
import otp from "../assets/images/otp.png";
import login2 from "../assets/images/login2.png";
import subscriptions1 from "../assets/images/subscriptions1.png";
import subscriptions2 from "../assets/images/subscriptions2.png";
import request from "../assets/images/request_edit.png";

const CustomTab = styled(Tab)({
	"&.MuiTab-root": {
		display: "flex",
		flexDirection: "row",
        justifyContent: "flex-start",
		alignItems: "center",
        gap: ".3rem",
        paddingLeft: "35px",
		fontSize: "13px",
        textAlign: "left",
        "@media screen and (max-width: 1024px)": {
            gap: "0",
            fontSize: "12px",
        },
        "@media screen and (max-width: 375px)": {
            
        },
	},
	"&.Mui-selected": {
		backgroundColor: "#d1d1d1",
        fontWeight: "bold",
	},
    "& svg": {
        width: "22px",
               
        "@media screen and (max-width: 1024px)": {
            width: "20px",
        },
        "@media screen and (max-width: 375px)": {
            
        },
    },
});


const Documentation:React.FC = () => {
    ReactGA.send({ hitType: "pageview", page: "/documentation" });
    
    const [tab, setTab] = useState<number>(0);
    const classes = useStyles();

    const handleTabChange = (e: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <HomeNavbar />
            <Box className={classes.root}>
                
                <Box className={classes.header}>
                    <Typography component="h1">ZAPI Documentation</Typography>
                    <Typography component="p">Welcome to the ZAPI docs. You'll find comprehensive guides and documentation to help you start working with ZAPI as quickly as possible, as well as support if you get stuck.</Typography>
                </Box>

                <Box sx={{ 
                    display: "flex",
                    flexDirection: "row",
                    gap: "2.5rem",
                    marginTop: "30px",
                    padding: "30px 5rem 5rem 3rem",
                    width: "100%",
                    "@media screen and (max-width: 1024px)": {
                        gap: "2rem",
                        marginTop: "10px",
                        padding: "30px 2rem 5rem .5rem",
                        
                    },
                    "@media screen and (max-width: 375px)": {
                        
                    },
                }}>
                    
                    <Tabs
                        sx={{
                            display: "fixed",
                            borderRight: "1px solid #d1d1d1",
                            width: "70%",
                            maxWidth: "270px",
                            overflowX: "scroll", 
                                                            
                            "@media screen and (max-width: 1024px)": {
                                maxWidth: "250px",
                            },
                            "@media screen and (max-width: 375px)": {
                                
                            },
                        }}
                        value={tab}
                        indicatorColor="primary"
                        orientation="vertical"
                        onChange={handleTabChange}
                    >
                        <CustomTab 
                            icon={<Filter1 />}
                            iconPosition="start"
                            label="Overview" 
                        />
                        
                        <CustomTab 
                            icon={<Filter2 />}
                            iconPosition="start"
                            label="Sign-Up" 
                        />

                        <CustomTab 
                            icon={<Filter3 />}
                            iconPosition="start"
                            label="Subscribe" 
                        />

                        <CustomTab 
                            icon={<Filter4 />}
                            iconPosition="start"
                            label="Access Token" 
                        />
                        
                        <CustomTab 
                            icon={<Filter5 />}
                            iconPosition="start"
                            label="Send Requests" 
                        />
                    </Tabs>


                    <Box sx={{ 
                        display: "fixed",
                        width: "100%",
                        height: "450px",
                        overflowX: "scroll",
                        overflowY: "unset",
                        "& h2": {
                            marginBottom: "8px", 
                            fontSize: "26px", 
                            fontWeight: "bold", 
                            color: "#071B85",
                                    
                            "@media screen and (max-width: 1024px)": {
                                marginBottom: "2px", 
                                fontSize: "24px", 
                                
                            },
                            "@media screen and (max-width: 375px)": {
                                
                            },
                        },
                        "& h3": {
                            marginBottom: "10px", 
                            fontSize: "17px", 
                            fontWeight: "bold", 
                            color: "#071B85", 
                            width: "100%",
                                    
                            "@media screen and (max-width: 1024px)": {
                                fontSize: "16px", 
                                
                            },
                            "@media screen and (max-width: 375px)": {
                                
                            },
                        },
                        "& p": {
                            marginBottom: "20px", 
                            fontSize: "15px", 
                            color: "#3e4fa7", 
                            width: "88%",
                                    
                            "@media screen and (max-width: 1024px)": {
                                fontSize: "14px", 
                                
                            },
                            "@media screen and (max-width: 375px)": {
                                
                            },
                        },
                        "& img": {
                            marginBottom: "30px", 
                            border: "1px solid #c1c1c1", 
                            borderRadius: "3px",
                            width: "80%",
                        },
                    }}>
                            
                        <TabPanel value={tab} index={0}>
                            <Typography component="h2">Overview</Typography>
                            <Typography component="p">Welcome to the world's largest Artificial Intelligence API hub.</Typography>

                            <Box
                                component="img"
                                alt="api-hub-page."
                                src={apihub}
                            />
                            
                            <Typography component="p">
                                ZAPI is used by developers to find, test, and connect to thousands of APIs — all with a single API key and dashboard. <br /> <br />
                                Find the APIs that you need for your project, embed the API into your app, and track usage of all your APIs through a single dashboard. If you create an API, use ZAPI to make it available to other developers who are already using the ZAPI.
                            </Typography>
                        </TabPanel>

                        <TabPanel value={tab} index={1}>
                            <Typography component="h2">Sign-Up</Typography>
                            <Typography component="h3">How to create a ZAPI account</Typography>
                            <Typography component="p">
                                Create a ZAPI account by filling out the sign-up form on the <Link to='/signup'>Sign-up page</Link>. You can create an account using your email address, or by connecting an existing Google account.
                            </Typography>
                            
                            <Box
                                component="img"
                                alt="sign-up-page"
                                src={signup}
                            />

                            <Typography component="h3">Validating your email address</Typography>
                            <Typography component="p">
                                To validate your account, a six digit code will be sent to the provided email address. You can enter the code on the verification screen to finalize your account registration.
                            </Typography>

                            <Box
                                component="img"
                                alt="otp-page"
                                src={otp}
                            />
                            
                        </TabPanel>


                        <TabPanel value={tab} index={2}>
                            <Typography component="h2">Subscribe</Typography>
                            <Typography component="h3">
                                Discover the API(s) that work best for your application
                            </Typography>

                            <Typography component="p">
                                Steps: <br />
                                01. Go to <Link to='/api-hub'>API Hub page</Link> <br />
                                02. Locate an API that you want to use <br />
                                03. Click on the top right icon of the card to subscribe to the API.
                            </Typography>

                            <Box
                                component="img"
                                alt="api-hub-page"
                                src={apihubbox}
                            />
                        </TabPanel>

                        
                        <TabPanel value={tab} index={3}>
                            <Typography component="h2">Access Token</Typography>
                            <Typography component="h3">
                                Getting access token
                            </Typography>

                            <Typography component="p">
                                Steps: <br />
                                01. Sign in by Clicking the Login button on the top right corner of the screen and add your credentials.
                            </Typography>

                            <Box
                                component="img"
                                alt="login"
                                src={login2}
                            />
                            
                            <Typography component="p">
                                02. Locate Subscription tab on the <Link to='/developer/dashboard'>Dashboard page</Link> then click it.
                            </Typography>

                            <Box
                                component="img"
                                alt="subscriptions"
                                src={subscriptions1}
                            />
                            
                            <Typography component="p">
                                03. Click the copy icon to copy the token.
                            </Typography>

                            <Box
                                component="img"
                                alt="subscriptions"
                                src={subscriptions2}
                            />

                        </TabPanel>

                        
                        <TabPanel value={tab} index={4}>
                            <Typography component="h2">Send Requests</Typography>
                            
                            <Typography component="p">
                                In this example we are going to use Postman to send a request, to do so you will need an endpoint and your access token:
                            </Typography>

                            <Box
                                component="img"
                                alt="request"
                                src={request}
                            />

                        </TabPanel>
                    
                    </Box>
                </Box>

            
            </Box>

            <Footer />
        </>
    )
}

const useStyles = makeStyles({
    root:{
        height: "auto",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "170px 1rem 90px 1rem",
        backgroundColor: "#d1d1d1",
        backgroundImage: "url('../../images/Clouds.svg')",
        width: "100%",
        opacity: .98,
        "& h1": {
            fontSize: "42px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            lineHeight: "60px",
            
            "@media screen and (max-width: 1024px)": {
                fontSize: "36px",
                lineHeight: "50px",
                
            },
            "@media screen and (max-width: 375px)": {
                
            },
        },
        "& p": {
            textAlign: "center",
            fontSize: "15px",
            color: "#fff",
            lineHeight: "20px",
            width: "55%",
            
            "@media screen and (max-width: 1024px)": {
                fontSize: "12px",
                
            },
            "@media screen and (max-width: 375px)": {
                
            },
        },
        
        "@media screen and (max-width: 1024px)": {
            padding: "150px 1rem 70px 1rem",
            
        },
        "@media screen and (max-width: 375px)": {
            
        },
    }

});

export default Documentation;
