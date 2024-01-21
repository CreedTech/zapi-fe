import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import {
    Typography,
    Box,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { HomeNavbar, Footer } from "../sections";
import { useHttpRequest } from "../hooks";
import ZapiHomeLogo from "../assets/images/ZapiHomeLogo.png";
import { Fallback, ChildrenDiscussions } from "../components";
import { ChildrenDiscussionType, DiscussionType } from "../types";
import ReactGA from "react-ga4";

const core_url = "VITE_CORE_URL";

const SingleDiscussionPage: React.FC = () => {
    const { error, loading, sendRequest } = useHttpRequest();
    const [discussion, setDiscussion] = useState<Array<DiscussionType> | null>(null)
    const [discussions, setDiscussions] = useState<Array<ChildrenDiscussionType> | null>(null)
    const classes = useStyles()
    const cookies = new Cookies();
    const { id } = useParams();
    ReactGA.send({ hitType: "pageview", page: "/discussion/id" });

    const api_id = JSON.parse(localStorage.getItem("api_id") || '');

    const getApiNestedDiscussionData = async (apiId: string | undefined, discussionId: string | undefined) => {
        if (!discussionId) return
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth_Token': `Bearer ${cookies.get("accessToken")}`
        }
        try {
            const apiDiscussion = await sendRequest(`/discussion/api/${apiId}`, "get", core_url, {}, headers)
            const apiNestedDiscussion = await sendRequest(`/discussion/${discussionId}`, "get", core_url, {}, headers)
            const [discussion, discussions] = await Promise.all([apiDiscussion, apiNestedDiscussion])
            if (discussion === undefined || discussions === undefined) console.log("No discussion for now")
            setDiscussion(discussion.data)
            setDiscussions(Object.values(discussions.data.comments))
            localStorage.setItem("discussion_id", JSON.stringify(id));
        } catch (error) { }
    }

    const memoizedApiCall = useMemo(() => (getApiNestedDiscussionData(api_id, id)), [])

    useEffect(() => { memoizedApiCall }, [])

    const singleDiscussion = discussion?.find(disc => disc.id === id)

    if (loading) return <Fallback />

    return (
        <>

            {discussions && (
                <>
                    <HomeNavbar />
                    <Box className={classes.main}>
                        <Box className={classes.discussions_container}>
                            <Box
                                sx={{
                                    width: '90%',
                                    height: 'auto',
                                    borderRadius: 0,
                                }}
                            >
                                <Box className={classes.discussion_thread}>
                                    <Typography variant="h4" fontWeight={500} style={{ marginBottom: '2rem' }}>{singleDiscussion?.title}</Typography>
                                    <Box className={classes.discussion_row}>
                                        <img src={ZapiHomeLogo} alt="zapi-Home" />
                                        <Box className={classes.discussion_column}>
                                            {/* <Typography variant="body2" fontWeight={400}>User24</Typography> */}
                                            <Typography variant="body2" fontWeight={400}>Commented on -{new Date(singleDiscussion?.createdOn ?? "").toLocaleDateString()}</Typography>
                                            <Typography variant="body2" fontWeight={500}>{singleDiscussion?.body}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <ChildrenDiscussions discussions={discussions} />
                    <Footer />
                </>
            )
            }
        </>
    )
}


export default SingleDiscussionPage;
const useStyles = makeStyles({
    main: {
        height: "auto",
        padding: "7rem 0rem 0rem 0",
    },
    discussions_container: {
        width: "100%",
        height: 'auto',
        display: 'flex',
        justifyContent: "center",
        marginBottom: '3rem'
    },

    discussion_thread: {
        background: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "start",
        color: "#071B85",
        padding: "16px",
    },
    discussion_column: {
        display: "flex",
        justifyContent: "start",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        color: "#071B85",
    },
    discussion_row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: "35px",
        flexWrap: "wrap",
        color: "#071B85",
    },
});
