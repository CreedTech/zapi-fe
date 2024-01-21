import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography, Button, Box } from "@mui/material";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { Tab, Tabs } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

import { HomeNavbar, Footer, APIDesc, Endpoints } from "../sections";
import { useHttpRequest } from "../hooks";
import { Discussion, Fallback, TabPanel, Reviews } from "../components";
import { APIType, DiscussionType, EndpointsType, ReviewType } from "../types";

const core_url = "VITE_CORE_URL";

const CustomTabs = styled(Tabs)({
    "&.MuiTabs-root": {
      width: "auto",
      fontSize: 500,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
});
  
const CustomTab = styled(Tab)({
    "&.MuiTab-root": {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontWeight: "normal",
        fontSize: "14px",
    },
    "&.Mui-selected": {
        backgroundColor: "#f1f1f1",
    },
});

const APIMoreInfo:React.FC = () => {
    const {error, loading, sendRequest} = useHttpRequest();
    const [tab, setTab] = useState<number>(0);
    const [api, setApi] = useState<APIType | null>(null);
    const [reviews, setReviews] = useState<Array<ReviewType> | null>(null);
    const [endpoints, setEndpoints] = useState<Array<EndpointsType> | null>(null);
    const [discussions, setDiscussions] = useState<Array<DiscussionType> | null>(null);
    const cookies = new Cookies();
    const classes = useStyles();
    const {id} = useParams();

    const getApiData = async(apiId: string | undefined) => {
        if(!apiId) return
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth_Token': `Bearer ${cookies.get("accessToken")}`
        }
        try {
            const reviewData = await sendRequest(`/api/reviews/${apiId}`, "get", core_url, {}, headers)
            const apiData = await sendRequest(`/api/findOne/${apiId}`, "get", core_url, {}, headers)
            const endpointsData = await sendRequest(`/endpoints/${apiId}`, "get", core_url, {}, headers)
            const apiDiscussion = await sendRequest(`/discussion/api/${apiId}`, "get", core_url, {}, headers)

            const [api, endpoints, discussions, reviews] = await Promise.all([apiData, endpointsData, apiDiscussion, reviewData])
            if(api === undefined || endpoints === undefined || discussions === undefined || reviews === undefined) return
            console.log({api, endpoints, discussions, reviews})
            setApi(api.data);
            setReviews(reviews.data);
            setEndpoints(endpoints.data);
            setDiscussions(discussions.data);
        } catch (error) {}
    }

    const memoizedApiCall = useMemo(() => (getApiData(id)),[])

    const handleTabChange = (e: ChangeEvent<unknown>, value: number) => setTab(value)

    useEffect(() => { memoizedApiCall },[])
    localStorage.setItem("api_id", JSON.stringify(api?.id));

    useEffect(() => {
        error && toast.error(`${error.message}`)
    },[error])

    if(loading) return <Fallback />

    return (
        <>
            
            {api && endpoints && discussions && reviews && (
                <>
                    <HomeNavbar />
                    
                    <APIDesc api={api} />

                    <Box className={classes.div}>
                        <CustomTabs value={tab} onChange={handleTabChange}>
                            <CustomTab label="Endpoints" />
                            <CustomTab label="Discussions" />
                            <CustomTab label="Reviews" />
                        </CustomTabs>
                        <Box className={classes.tabpanel}>
                            <TabPanel value={tab} index={0}>
                                <Endpoints api={api} endpoints={endpoints} />
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                <Discussion discussions={discussions} />
                            </TabPanel>
                            <TabPanel value={tab} index={2}>
                                <Reviews reviews={reviews} />
                            </TabPanel>
                        </Box>
                    </Box>

                    <Footer />
                </>
            )}
        </>
    )
}

const useStyles = makeStyles({
    tabpanel: {
        width: "100%",
        minHeight: "500px",
        margin: "1rem 0 0",
    },
    div: {
        padding: "0 4rem",
    }
})

export default APIMoreInfo;
