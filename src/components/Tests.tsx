import React, { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Add, ContentCopy, Delete, Edit, MoreVert, PlayArrow } from "@mui/icons-material";
import { makeStyles, styled } from "@mui/styles";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

import { APIType, EndpointsType, OptionsType, TestResponse, TestType } from "../types";
import { useFormInputs, useHttpRequest } from "../hooks";
import { RunTestResponse } from "../interfaces";
import TestResultModal from "./TestResultModal";
import { Fallback } from "../components";

interface Props {
    id: string | undefined
}

const colors: any = {
    "run": "#49B443",
    "edit": "#1B5598",
    "delete": "#E64F36",
    "duplicate": "#E6BA36",
}

const methodColors: any = {
    "get": "#1B5598",
    "post": "#49B443",
    "patch": "#E6BA36",
    "delete": "#E64F36",
}

const testOptions: Array<TestType> = [
    { name: "Run", action: "run", icon: <PlayArrow />},
    { name: "Delete", action: "delete", icon: <Delete /> },
    // { name: "Edit", action: "edit", icon: <Edit /> },
    // { name: "Duplicate", action: "duplicate", icon: <ContentCopy /> },
]

const CustomButton = styled(Button)({
    "&.MuiButtonBase-root": {
        "&:hover": {
            background: "#F9F9F9",
            color: "#000",
        },
    }
})

const initialState = { name: "" }

const Tests:React.FC<Props> = ({id}) => {
    // !test objects
    const [tests, setTests] = useState<Array<TestResponse>>([])
    // !test objects

    const [endpoints, setEndpoints] = useState<Array<EndpointsType> | null>([]);
    const [creatingTest, setCreatingTest] = useState<boolean>(false);
    const {inputs, bind, select} = useFormInputs(initialState);
    const {error, loading, sendRequest} = useHttpRequest();
    const [api, setApi] = useState<APIType | null>(null);
    const { name } = inputs
    const cookies = new Cookies();
    const classes= useStyles();
    const [testResponse, setTestResponse] = useState<RunTestResponse | null>(null)
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    
    const [endpointName, setEndpointName] = useState<string>("");
    const [route, setRoute] = useState<string>("");
    const [method, setMethod] = useState<string>("");
    const [endpointId, setEndpointId] = useState<string>("");
    const handleEndpointChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        if(!name) {            
            setEndpointName("");
            setEndpointId("");
            setMethod("");
            setRoute("");
            return
        }
        const route = endpoints?.find((endpoint) => endpoint.name === name)?.route;
        const method = endpoints?.find((endpoint) => endpoint.name === name)?.method;
        const id = endpoints?.find((endpoint) => endpoint.name === name)?.id;
        if(!route || !method || !id) return;
        setEndpointName(name);
        setEndpointId(id);
        setMethod(method);
        setRoute(route);
    }

    const [headers, setHeaders] = useState<Array<OptionsType>>([])
    const [body, setBody] = useState<Array<OptionsType>>([])
    const [params, setParams] = useState<Array<OptionsType>>([])
    
    const addHeaderValue = (object: OptionsType) => {
        const {name, value} = object;
        let isHeader = headers.find((header) => header.name === name);
        if(isHeader) return isHeader.value = value;
        setHeaders(prev => [...prev, object]);
    }

    const addBodyValue = (object: OptionsType) => {
        const {name, value} = object;
        let isBody = body.find((item) => item.name === name);
        if(isBody) return isBody.value = value;
        setBody(prev => [...prev, object]);
    }

    const addParamsValue = (object: OptionsType) => {
        const {name, value} = object;
        let isParam = params.find((param) => param.name === name);
        if(isParam) return isParam.value = value;
        setParams(prev => [...prev, object]);
    }

    const handleHeaderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        addHeaderValue({name, value})
    }

    const handleBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        addBodyValue({name, value})
    }

    const handleParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        addParamsValue({name, value})
    }

    const fetchApiData = async(apiId: string | undefined): Promise<any> => {
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth-Token': `Bearer ${cookies.get("accessToken")}`
        };
        try {
            const apiData = await sendRequest(`/api/findOne/${apiId}`, "get", "VITE_CORE_URL", {}, headers);
            const endpointsData = await sendRequest(`/endpoints/${apiId}`, "get", "VITE_CORE_URL", {}, headers);

            const [api, endpoints] = await Promise.all([apiData, endpointsData]);
            if(api === undefined || endpoints === undefined) return
            setApi(api.data);
            setEndpoints(endpoints.data);
        } catch (error) {}
    };

    const addTest = async(e: FormEvent) => {
        e.preventDefault()
        if(!name) return toast.error("Test name cannot be empty!")
        if(!endpointName) return toast.error("Please select an endpoint!")
        const requestHeaders = {
            'Content-type': "application/json",
            'X-Zapi-Auth-Token': `Bearer ${cookies.get("accessToken")}`
        };
        const payload = {
            method,
            route,
            payload: {
                headers,
                body,
                params,
            },
            headers: "",
            requestStatus: "",
            url: "",
            profileId: cookies.get("profileId"),
            apiId: id,
            endpointId,
            name,
        }
        try {
            const data = await sendRequest(`/subscription/save-dev-test/`, "post", "VITE_CORE_URL", payload, requestHeaders)
            if(data === undefined) return
            toast.success(`${data.message}`)
        } catch (error) {}
        handleCancelCreating()
        getAllTests()
    };
    
    const getAllTests = async() => {
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth-Token': `Bearer ${cookies.get("accessToken")}`
        };
        try {
            const data = await sendRequest(`/subscription/get-dev-tests`, "get", "VITE_CORE_URL", "", headers)
            if(data === undefined) return
            setTests(data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const runTestAction = async(testId: string) => {
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth-Token': `Bearer ${cookies.get("accessToken")}`
        };
        try {
            const data = await sendRequest(`/subscription/api-dev-test/${testId}`, "post", "VITE_CORE_URL", undefined, headers)
            if(data === undefined) return
            setTestResponse(data)
        } catch (error) {}
    };

    const deleteTest = async(testId: string) => {
        const headers = {
            'Content-Type': "application/json",
            'X-Zapi-Auth-Token': `Bearer ${cookies.get("accessToken")}`
        };
        try {
            const data = await sendRequest(`/subscription/delete-test/${testId}`, "del", "VITE_CORE_URL", undefined, headers)
            if(data === undefined) return
            toast.success(`${data?.message}`)
        } catch (error) {}
        getAllTests()
    }

    const handleCancelCreating = () => {
        setCreatingTest(false);
        setEndpointName("");
        setMethod("");
        setRoute("");
        setHeaders([]);
        setBody([]);
        setParams([]);
    }
    
    useEffect(() => {
        fetchApiData(id)
    },[])

    useEffect(() => {
        getAllTests()
    },[])

    useEffect(() => {
        error && toast.error(`${error}`)
    },[error])

  return (
    <>
    {loading && <Fallback />}
    {testResponse && <TestResultModal {...testResponse} onClose={() => setTestResponse(null)} />}
    <Paper className={classes.paper}>
        <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={4}>
            <Box className={classes.inputs}>
                <input type="text" name="search" placeholder="Search tests" />
            </Box>
            {!creatingTest && (
                <Button onClick={() => setCreatingTest(true)} className={classes.button}>
                    Create Test
                </Button>
            )}
        </Stack>
        {creatingTest && (
            <form onSubmit={addTest} style={{margin: "0 0 2rem"}}>
                <Stack width="100%" direction="row" alignItems="center" spacing={2} my={2}>
                    <Box className={classes.inputs}>
                        <input type="text" name="name" {...bind} placeholder="Test name" />
                    </Box>
                    <Box className={classes.inputs}>
                        <button type="submit" disabled={!endpointName}>add</button>
                    </Box>
                    <Box className={classes.inputs}>
                        <button type="button" onClick={handleCancelCreating} style={{background: colors["delete"]}}>cancel</button>
                    </Box>
                </Stack>
                {name && endpoints && (
                    <Stack width="100%" direction="row" alignItems="center" spacing={2} my={2}>
                        <Box className={classes.inputs}>
                            <label>Endpoint name</label>
                            <select value={endpointName} onChange={handleEndpointChange}>
                                <option value="">SELECT ENDPOINT</option>
                                {endpoints.map((endpoint, index) => (
                                    <option key={index} value={endpoint.name}>
                                        {endpoint.name}
                                    </option>
                                ))}
                            </select>
                        </Box>
                        <Box className={classes.inputs}>
                            <label>Endpoint route</label>
                            <input type="text" value={route} disabled />
                        </Box>
                    </Stack>
                )}
                {name && endpoints && endpoints
                .filter((endpoint) => endpoint.name === endpointName)
                .map((endpoint, index) => (
                    <Stack key={index} width="100%" direction="column" spacing={2} my={1}>
                        <Stack>
                            <Typography sx={{fontSize: "14px",fontWeight: 500,color: "#081F4A"}}>Headers</Typography>
                            {endpoint.headers?.map((header, index) => (
                                <Stack key={index} width="100%" direction="row" alignItems="center" spacing={2} my={1}>
                                    <Typography sx={{fontSize: "13px",color: "#081F4A"}}>
                                        {header.name}
                                    </Typography>
                                    <input type="text" name={header.name} onChange={handleHeaderChange} required={header.required} className={classes.input} />
                                </Stack>
                            ))}
                        </Stack>
                        <Stack>
                            <Typography sx={{fontSize: "14px",fontWeight: 500,color: "#081F4A"}}>Body</Typography>
                            {endpoint.body?.map((key, index) => (
                                <Stack key={index} width="100%" direction="row" alignItems="center" spacing={2} my={1}>
                                    <Typography sx={{fontSize: "13px",color: "#081F4A"}}>
                                        {key.name}
                                    </Typography>
                                    <input type="text" name={key.name} onChange={handleBodyChange} required={key.required} className={classes.input} />
                                </Stack>
                            ))}
                        </Stack>
                        <Stack>
                            <Typography sx={{fontSize: "14px",fontWeight: 500,color: "#081F4A"}}>Query Params</Typography>
                            {endpoint.query?.map((param, index) => (
                                <Stack key={index} width="100%" direction="row" alignItems="center" spacing={2} my={1}>
                                    <Typography sx={{fontSize: "13px",color: "#081F4A"}}>
                                        {param.name}
                                    </Typography>
                                    <input type="text" name={param.name} onChange={handleParamsChange} required={param.required} className={classes.input} />
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                ))}
            </form>
        )}
        <Table>
            <TableHead className={classes.head}>
                <TableRow>
                    <TableCell className={classes.cell}>Name</TableCell>
                    <TableCell className={classes.cell}>Route</TableCell>
                    <TableCell className={classes.cell}>Status</TableCell>
                    <TableCell className={classes.cell}>Message</TableCell>
                    <TableCell className={classes.cell}>Time</TableCell>
                    {/* <TableCell className={classes.cell}>Status</TableCell> */}
                    <TableCell className={classes.cell}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tests && tests.map((test: TestResponse, index: number) => (
                    <TableRow key={index}>
                        <TableCell sx={{textTransform: "capitalize"}}>{test.name}</TableCell>
                        <TableCell sx={{display: "flex",alignItems: "center",gap: "0.5rem"}}>
                            <Typography sx={{color: methodColors[test.method],fontSize: "12px",fontWeight: 700, textTransform: "uppercase"}}>
                                {test.method}
                            </Typography>
                            {test.route}
                        </TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>{test.createdOn && new Date(test.createdOn).toLocaleString()}</TableCell>
                        <TableCell sx={{display: "flex",alignItems: "center",gap: "1rem"}}>
                            <>
                            <IconButton onClick={handleOpen}>
                                <MoreVert />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{}}>
                                <MenuItem onClick={handleClose}>
                                    <CustomButton onClick={() => runTestAction(test.id)} sx={{background: colors["run"],color: "#FFF"}}>run</CustomButton>
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <CustomButton onClick={() => deleteTest(test.id)} sx={{background: colors["delete"],color: "#FFF"}}>delete</CustomButton>
                                </MenuItem>
                            </Menu>
                            </>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
    </>
  )
};

const useStyles = makeStyles({
    paper: {
        padding: "1rem 0.5rem",
    },
    inputs: {
        width: "max-content",
        display: "flex",
        flexDirection: "column",
        fontSize: "14px",
        lineHeight: "24px",
        fontFamily: "var(--body-font)",
        "& label": {
            color: "#081F4A",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1,
        },
        "& input": {
          width: "100%",
          height: "40px",
          padding: "0 0.5rem",
          borderRadius: "4px",
          border: "1px solid #999",
          outline: "none",
        },
        "& select": {
            minWidth: "70px",
            height: "40px",
            borderRadius: "4px",
            border: "1px solid #999",
            outline: "none",
          },
          "& textarea": {
            resize: "none",
            width: "300px",
            height: "100px",
            borderRadius: "4px",
            border: "1px solid #999",
            outline: "none",
            padding: "0.5rem",
          },
          "& button": {
            width: "75px",
            height: "40px",
            background: "#49B443",
            color: "#FFF",
            border: "none",
            borderRadius: "4px",
            textTransform: "uppercase",
            fontSize: "12px",
            "&:disabled": {
                background: "#E0E0E0",
                color: "#484848",
                cursor: "not-allowed",
            },
            "& svg": {
                fontSize: "1.2rem"
            }
          },
          "& input[type=checkbox]": {
            width: "15px",
            height: "15px",
          },
    },
    button: {
        "&.MuiButtonBase-root": {
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            background: "#081F4A",
            color: "#FFF",
            padding: "3px 12px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            fontFamily: "var(--body-font)",
            cursor: "pointer",
            "&:hover": {
                background: "#081F4A",
            },
            "&:disabled": {
              background: "#E0E0E0",
              color: "#484848",
            },
        }
    },
    head: {
        "&.MuiTableHead-root": {
            background: "#081F4A",
        },
    },
    cell: {
        "&.MuiTableCell-root": {
            width: "auto",
            color: "#FFF",
            fontWeight: 500,
            fontSize: "16px",
            textTransform: "capitalize",
        }
    },
    input: {
        width: "150px",
        height: "25px",
        padding: "0 0.25rem",
        borderRadius: "4px",
        border: "1px solid #999",
        outline: "none",
    }
});

export default Tests