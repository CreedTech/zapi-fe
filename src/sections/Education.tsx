import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Widget } from '../components'
import {EducationText2, EducationText3 } from '../testdata'

const Education: React.FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.Education}>
            <Typography variant="h1" sx={{fontWeight: 400, fontSize: "16px", lineHeight: "20px", letterSpacing: "-0.006em", color: "#0671E0" }}>A.I EDUCATION</Typography>
            <Typography variant="h2" sx={{fontWeight: 500, fontSize: "24px", lineHeight: "30px", letterSpacing: "-0.006em", color: "#071B85" }}>Learn how to build your AI applications and APIs (CTA) 
</Typography>
            <div className={classes.EdBoxes}>
                <Widget className={classes.smallBox}/>
                <div className={classes.midBoxes}>
                    <Widget className={classes.midOne} image={EducationText2.image} title={EducationText2.title} subtitle={EducationText2.text} buttonText={EducationText2.buttonText} buttonText2={EducationText2.buttonText2} />
                    <Widget className={classes.midTwo} image={EducationText3.image} title={EducationText2.title} subtitle={EducationText2.text} buttonText={EducationText2.buttonText} buttonText2={EducationText2.buttonText2} />
                </div>
                <Widget className={classes.largeBox}/>
            </div>
        </div>
    )
}

export default Education

const useStyles = makeStyles({
    Education: {
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        paddingTop: "2rem",
        paddingLeft: "5rem",
        paddingRight: "5rem",
        paddingBottom: "8rem",
        "@media screen and (max-width: 400px)": {
            padding: "1rem .5rem"
        },
    },
    EdBoxes: {
        display: "flex",
        gap: "1.5rem",
        padding: "2rem 0",
        "@media screen and (max-width: 840px)": {
           flexDirection: "column",
        }
    },
    smallBox: {
        marginTop: "10rem",
        left: "0rem",
        padding: "16px 16px 24px",
        width: "320px",
        height: "347px",
        background: "#F8DCCC",
        border: "1px solid #FF5C00",
        boxShadow: "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)",
        borderRadius: "6px",
        "@media screen and (max-width: 1024px)": {
            padding: "0 6rem",
            width: "auto",
            // height: "426px",
        },
        "@media screen and (max-width: 850px)": {
            marginTop: "2rem",
        }
    },
    midBoxes: {
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        "@media screen and (max-width: 850px)": {
            marginTop: "0rem",
        }
    },
    midOne: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem 1rem",
        width: " 320px",
        height: "192px",
        background: "#F9F4C2",
        border: "1px solid #0E2DCC",
        boxShadow: "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)",
        borderRadius: "6px",
        "& img": {
            width: "1.5rem",
            height: "1.5rem",
            objectFit: "contain"
        },
        "& h6": {
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "#0E2DCC",
        },
        "& p": {
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "#0F1F73",
            paddingBottom: ".2rem",
        },
        "& button:nth-child(1)": {
            padding: "4px 12px",
            background: "#FFEA00",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "24px",
            textAlign: "center",
            letterSpacing: "-0.006em",
            color: "#071B85"
        },
        "& button:nth-child(2)": {
            padding: "4px 12px",
            background: "inherit",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            color: "#0E2DCC",
            opacity: "0.5",
        },
        "@media screen and (max-width: 1024px)": {
            // padding: "0 6rem",
            width: "auto",
            height: "auto",
        }
    },
    midTwo: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem 1rem",
        width: " 320px",
        height: "192px",
        background: "#303940",
        border: "1px solid #FFEA00",
        boxShadow: "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)",
        borderRadius: "6px",
        "& img": {
            width: "1.5rem",
            height: "1.5rem",
            objectFit: "contain"
        },
        "& h6": {
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "#F6F8F9",
        },
        "& p": {
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "-0.006em",
            color: "#B0BABF",
            paddingBottom: ".2rem",
        },
        "& button:nth-child(1)": {
            padding: "4px 12px",
            background: "#48535B",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "24px",
            textAlign: "center",
            letterSpacing: "-0.006em",
            color: "#F6F8F9",
        },
        "& button:nth-child(2)": {
            padding: "4px 12px",
            background: "inherit",
            borderRadius: "6px",
            border: "none",
            outline: "none",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "24px",
            textAlign: "center",
            letterSpacing: "-0.006em",
            color: "#F6F8F9",
            opacity: "0.5",
        },
        "@media screen and (max-width: 1024px)": {
            // padding: "0 6rem",
            width: "auto",
            height: "auto",
        }
    },
    largeBox: {
        right: "0rem",
        padding: "16px 0px 24px 16px",
        width: "544px",
        height: "426px",
        background: "#EDF5FD",
        border: "1px solid #161616",
        boxShadow: "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)",
        borderRadius: "6px",
        "@media screen and (max-width: 1024px)": {
            padding: "0 6rem",
            width: "auto",
            // height: "426px",
        }
    }
})