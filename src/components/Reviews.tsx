import React, { useEffect, useState } from "react";
import { Card, CardContent, Box, Rating, Stack, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChatRounded } from "@mui/icons-material";

import { ReviewType } from "../types";

interface Props {
    reviews: Array<ReviewType>
}

const Reviews:React.FC<Props> = ({reviews}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box className={classes.wrapper}>
                {reviews.length !== 0 ? (
                    <Typography
                    sx={{
                        marginBottom: "10px",
                        fontSize: "21px",
                        fontWeight: "bold",
                        color: "#264276",
                        padding: "5px",
                    }}>
                        Reviews
                    </Typography>
                ) : (
                    <></>                
                )}   
            </Box>
            <Box className={classes.list}>
                {reviews.length !== 0 ? 
                (<>
                <Box>
                    {reviews.map((review, index) => (
                        <Card key={index} className={classes.card}>
                            <Typography sx={{fontSize: "16px", color: "#081F4A",fontWeight: 700}}>
                                By: 
                            </Typography>
                            <Rating size="small" defaultValue={review.rating} disabled />
                            <Typography sx={{fontSize: "14px", color: "#081F4A"}}>
                                {review.review}
                            </Typography>
                        </Card>
                    ))}
                </Box>
                </>):(
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "110px", width: "100%" }}>
                        <ChatRounded sx={{ fontSize: "32px", color: "#264276", }} />
                        <Typography sx={{fontSize:"18px",color:"#515D99"}}>No reviews on the API yet.</Typography>
                    </Box>
                )}

            </Box>
        </Box>
    )
};

const useStyles = makeStyles({
    container: {
        width: "100%",
    },
    wrapper: {
        width: "100%",
    },
    list: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
    },
    card: {
        width: "250px",
        minHeight: "100px",
        borderRadius: "4px",
        border: "1px solid #081F4A",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "0.5rem",
    },
    image: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        "& img": {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px solid #081F4A",
            objectFit: "cover",
        }
    }
});

export default Reviews
