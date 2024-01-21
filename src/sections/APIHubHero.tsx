import React from 'react'
import { makeStyles } from '@mui/styles'

import { Typography, Box } from "@mui/material";

const APIHubHero:React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.text}>
                <Typography component="h1">Welcome to the Z-API hub</Typography>
                <Typography component="p">Discover and connect to hundreds of APIs</Typography>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    root:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: "46px",
        backgroundColor: "#F3F3F3",
        backgroundImage: "url(../../images/endless-constellation.svg)",
        padding: "0 5rem",
        lineHeight: "46px",
        boxShadow: "0px 4px 4px rgba(6, 113, 224, 0.05)",
        width: '100%',
        height: "360px",
        position:'relative',

        "& h1": {
            fontSize: "43px",
            fontWeight: "bold",
            color: "#fff",
            "@media screen and (max-width: 900px)": {
                fontSize: "36px",
            },
            "@media screen and (max-width: 500px)": {
                fontSize: "28px",
            },
        },
        "& p": {
            fontSize: "16px",
            color: "#fff",
            margin: "0 0 68px",
            "@media screen and (max-width: 900px)": {
                fontSize: "15px",
            },
            "@media screen and (max-width: 500px)": {
                fontSize: "13px",
                lineHeight: "30px",
            },
            "@media screen and (max-width: 375px)": {
                lineHeight: "20px",
            },
        },

        "@media screen and (max-width: 1024px)": {
            padding: "0 2rem",
        },
        "@media screen and (max-width: 900px)": {
            lineHeight: "40px",
            height: "330px",
        },
        "@media screen and (max-width: 700px)": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "300px",
        },
    },

    text:{
        position: "absolute",
        top: "40%",
    }
})


export default APIHubHero;
