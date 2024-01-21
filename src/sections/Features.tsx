import { Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "@mui/styles"

//image
import AddTask from "../assets/images/add_task.png"
import { FEATURES } from '../assets'


const Features: React.FC = () => {
    const classes = useStyles()

    return (
        <>
            <div className={classes.feature}>
                <Typography gutterBottom variant='h4' sx={{ color: '#071B85', fontWeight: 700, fontSize: '36px', lineHeight: "45.94px", fontFamily: 'Space Grotesk', }}>Key Features of Our AI API Marketplace </Typography>
            </div>
            <div>
                <div className={classes.wrapper}>
                    <div className={classes.columns}>
                        {FEATURES.map((feature, i) => (
                            <div key={i} className={classes.column}>
                                <div className="">
                                    <Typography gutterBottom variant='h5' sx={{
                                        fontWeight: 700, fontSize: '24px', lineHeight: "30.62px", "@media screen and (max-width:400px)": {
                                            textAlign: "center", fontSize: "18px", lineHeight: "22px"
                                        }
                                    }}>{feature.title}</Typography>
                                </div>
                                {feature.texts.map((text, i) => (
                                    <li key={i} className={classes.lists}>{text.text}</li>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const useStyles = makeStyles({
    feature: {
        textAlign: 'center',
        alignItem: 'center',
        marginTop: "8rem"
    },
    img: {
        "& img": {
            width: '29.33px',
            height: '26.67px',
        },
        display: "flex",
        gap: '1.5rem',
    },
    wrapper: {
        padding: "24px 48px 56px 32px",
        fontFamily: 'Space Grotesk',
    },
    column: {
        position: "relative",
        left: "12px",
        width: "calc(50% - 30px)",
        backgroundColor: '#657AC526',
        color: '#071B85',
        margin: "0 15px 30px",
        padding: "20px",
        borderRadius: "16px",
        boxSizing: "border-box",
        "@media screen and (max-width: 800px)": {
            width: '100%'
        }
    },
    columns: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    lists: {
            fontSize: '16px', lineHeight: '20.42px', fontWeight: 400, "@media screen and (max-width:400px)": {
                textAlign: "center", fontSize: "13px", lineHeight: "16px"
            }
    }
})

export default Features