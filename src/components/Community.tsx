import React, { useState } from "react";
import { Container, createTheme, Tabs, Tab, ThemeProvider, Paper } from "@mui/material";
import User from "../components/User";
import { makeStyles } from "@mui/styles"
import InviteUser from "../components/InviteUser";
import { grey, blue } from "@mui/material/colors";


const theme = createTheme({
    palette: {
        primary: grey
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

const Community = () => {

    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);
    const [active, setActive] = useState(true)
    const handleTabs = (e :any, value : number) => {
        setSelectedTab(value);
    };


    return (
        <Paper elevation={1} className={classes.paper}>
        <ThemeProvider theme={theme}>
            <Container>
                <div>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabs}
                        TabIndicatorProps={{
                            hidden: true
                        }}
                        sx={{
                            "& button":{borderRadius: 1},
                            "& button.Mui-selected": {backgroundColor: "#081f4A", color: "white"}
                        }}
                    >
                        <Tab label="User" />
                        <Tab label="Invite user" />
                    </Tabs>
                </div>
                {selectedTab === 0 && <User />}
                {selectedTab === 1 && <InviteUser />}

            </Container>
        </ThemeProvider>
        </Paper>
    );
}

export default Community;

const useStyles = makeStyles({
    paper: {
        width: "950px",
        marginTop: "20px",
        padding: "2rem 2rem",
        ['@media (max-width:450px)']:{
            width:"100%",
            padding: "0.5rem"
        }
    },

});