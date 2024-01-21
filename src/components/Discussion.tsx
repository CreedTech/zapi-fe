import {
    Typography,
    Link,
    Box,
    Pagination,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { usePagination } from "../hooks";
import ZapiHomeLogo from "../assets/images/ZapiHomeLogo.png";
import { Add } from "@mui/icons-material";
import { useContextProvider } from "../contexts/ContextProvider";
import { DiscussionType } from "../types";
import { ChatRounded } from "@mui/icons-material";

interface Props {
    discussions: Array<DiscussionType>
}

const Discussion: React.FC<Props> = ({ discussions }) => {
    const classes = useStyles()
    const [tab, setTab] = useState<number>(0)
    const { handleClicked } = useContextProvider();
    const PER_PAGE = 6;
    const count = Math.ceil(discussions.length / PER_PAGE);
    const _DATA = usePagination(discussions, PER_PAGE);
    const [page, setPage] = useState(1);

    const handleChange = (event: unknown, value: number) => {
        setPage(value);
        _DATA.jump(value);
    };

    return (
        <Box className={classes.main}>
            <Box className={classes.discussion_tab}>
                <Box className={classes.header}>
                    {discussions.length == 0 ? (
                        <Typography
                            sx={{
                                marginBottom: "10px",
                                fontSize: "21px",
                                fontWeight: "bold",
                                color: "#264276",
                                padding: "5px",
                            }}>
                                Discussions
                        </Typography>
                    ) : (
                        <></>
                    )}
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        sx={{backgroundColor: "#264276", color: "#fff", width: "200px", height: "2.5rem"}}
                        className={classes.newDiscussion}
                        onClick={() => handleClicked("addDiscussion")}>
                        <Add /> <Typography sx={{ fontSize: "14px" }}>New Discussion</Typography>
                    </Button>
                </Box>
            </Box>
            <Box className={classes.discussions_container}>
                <Box
                    sx={{
                        width: '90%',
                        height: 'auto',
                        borderRadius: 0,
                    }}
                >
                    {discussions.length == 0 ?
                        (
                            <>
                                {_DATA.currentData().map((discussion: any) => (
                                    <Box className={classes.discussion_thread} key={discussion.id}>
                                        <Box className={classes.discussion_row}>
                                            <img src={ZapiHomeLogo} alt="zapi-Home" />
                                            <Box className={classes.discussion_column}>
                                                <Typography variant="body1" fontWeight={500}>
                                                    <Link sx={{textDecoration:'none',color: "#071b85"}} href={`/discussion/${discussion.id}`} >
                                                        {discussion.title}
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2" fontWeight={400}>
                                                    Commented on - {new Date(discussion?.createdOn).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                                <Pagination
                                    count={count}
                                    className={classes.pagination}
                                    size="large"
                                    page={page}
                                    color="primary"
                                    shape="circular"
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "110px", width: "100%" }}>
                                <ChatRounded sx={{ fontSize: "32px", color: "#264276", }} />
                                <Typography sx={{fontSize:"18px",color:"#515D99"}}>There are no discussions in this API.</Typography>
                            </Box>
                        )}
                </Box>
            </Box>
        </Box>
    )
}

export default Discussion;

const useStyles = makeStyles({
    main: {
        height: "auto",
    },
    discussion_tab: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        "@media screen and (max-width: 1024px)": {
            flexDirection: "column",
        },
    },
    header: {
        display: "flex",
        flexDirection: "column",
        color: "#071B85",
    },
    newDiscussion: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "8px 16px",
        gap: "16px",
        width: "200px",
        lineHeight: "46px",
        background: "#071B85",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#FFFFFF",
        border: "none",
        fontWeight: "500",
        fontSize: "16px",
        "@media screen and (max-width: 1024px)": {
            marginBottom: "1rem",
            width: "385px",
        },
        "@media screen and (max-width: 500px)": {
        },
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
        borderBottom: "1px solid #071B85",
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
        paddingLeft: '2rem',
    },
    pagination: {
        display: "flex",
        padding: '1rem',
        position: "relative",
        bottom: "0",
        justifyContent: "center",
    },
});
