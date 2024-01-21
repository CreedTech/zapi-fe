import React, {
  FormEvent,
  useEffect,
  useState,
  SyntheticEvent,
  useRef,
} from "react";
import {
  IconButton,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
  Button,
  Box,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { toast } from "react-toastify";
import { Add, Remove, Grade, Loyalty, BorderColor } from "@mui/icons-material";
import Cookies from "universal-cookie";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useAppDispatch, useFormInputs, useHttpRequest } from "../hooks";
import { useNavigate } from "react-router-dom";
import { addEndpoint, getUserApis } from "../redux/slices/userSlice";
import EndpointTable from "./EndpointTable";
import TabPanel from "./TabPanel";
import { OptionsType } from "../types";
import { Spinner } from "../assets";
import { useContextProvider } from "../contexts/ContextProvider";
import ReactGA from "react-ga4";
import UploadFile from "./UploadFile";

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const CustomTab = styled(Tab)({
  width: "150px",
  // borderRadius: "10px",
  "&.MuiTab-wrapper": {
    height: "45px",
    // borderRadius: "10px",
  },
  "&.Mui-selected": {
    backgroundColor: "#081f4A",
    borderRadius: "10px",
    color: "white !important",
  },
});

const core_url = "VITE_CORE_URL";
const initialState = {
  name: "",
  route: "",
  method: "get",
  description: "",
  headers: "",
  headerType: "string",
  headerIsRequired: false,
  requestBody: "",
  requestBodyType: "string",
  requestBodyFormat: "application/json",
  requestBodyIsRequired: false,
  queryParams: "",
  queryParamType: "string",
  queryParamIsRequired: false,
};
interface Props {
  id: string | undefined;
}

const EndpointTab: React.FC<Props> = ({ id }) => {
  const { inputs, bind, select, toggle } = useFormInputs(initialState);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const { error, loading, sendRequest } = useHttpRequest();
  const [tab, setTab] = useState<number>(0);
  const [file, setFile] = useState<any>();
  const [JsonFile, setJsonFile] = useState<any>("");
  const [JsonData, setJsonData] = useState<any>("");
  const { triggerRefresh } = useContextProvider();
  const navigate = useNavigate();
  const {
    name,
    route,
    method,
    description,
    headers,
    headerType,
    headerIsRequired,
    requestBody,
    requestBodyType,
    requestBodyFormat,
    requestBodyIsRequired,
    queryParams,
    queryParamType,
    queryParamIsRequired,
  } = inputs;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleTabChange = (e: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const [headersArray, setHeadersArray] = useState<Array<OptionsType>>([]);
  const [requestBodyArray, setRequestBodyArray] = useState<Array<OptionsType>>(
    []
  );
  const [queryParamsArray, setQueryParamsArray] = useState<Array<OptionsType>>(
    []
  );

  ReactGA.send({ hitType: "pageview", page: "/endpointTab" });

  const addHeaders = (object: OptionsType) => {
    const { name } = object;
    if (!name) return toast.error("Add a valid string");
    if (
      headersArray.find((obj) => obj.name.toLowerCase() === name.toLowerCase())
    )
      return toast.error("Duplicate values");
    setHeadersArray((prevHeaders) => [...prevHeaders, object]);
  };

  const removeHeader = (name: string) =>
    setHeadersArray((current) =>
      current.filter((header) => header.name !== name)
    );

  const addRequestBody = (object: OptionsType) => {
    const { name } = object;
    if (!name) return toast.error("Add a valid string");
    if (
      requestBodyArray.find(
        (obj) => obj.name.toLowerCase() === name.toLowerCase()
      )
    )
      return toast.error("Duplicate values");
    setRequestBodyArray((reqBody) => [...reqBody, object]);
  };

  const removeRequestBody = (name: string) =>
    setRequestBodyArray((current) =>
      current.filter((reqBody) => reqBody.name !== name)
    );

  const addQueryParams = (object: OptionsType) => {
    const { name } = object;
    if (!name) return toast.error("Add a valid string");
    if (
      queryParamsArray.find(
        (obj) => obj.name.toLowerCase() === name.toLowerCase()
      )
    )
      return toast.error("Duplicate values");
    setQueryParamsArray((param) => [...param, object]);
  };

  const removeQueryParams = (name: string) =>
    setQueryParamsArray((current) =>
      current.filter((param) => param.name !== name)
    );

  const toggleAdding = () => {
    setHeadersArray([]);
    setRequestBodyArray([]);
    setQueryParamsArray([]);
    setIsAdding((prev) => !prev);
  };
  const toggleOptions = () => setIsOptionsOpen((prev) => !prev);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !route || !description)
      return toast.error("Name, route and description are required fields");
    const formData = new FormData();
    formData.append("file", file);
    const payload = {
      name,
      route,
      method,
      description,
      headers: headersArray,
      body: requestBodyArray,
      query: queryParamsArray,
      mediaType: requestBodyFormat,
    };
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/endpoints/new/${id}`,
        "post",
        core_url,
        payload,
        headers
      );
      if (!data || data === undefined) return;
      dispatch(addEndpoint(payload));
      const { message } = data;
      toast.success(`${message}`);
    } catch (error) {}
    setIsAdding(false);
    setHeadersArray([]);
    setRequestBodyArray([]);
    setQueryParamsArray([]);
    dispatch(getUserApis(profileId));
  };

  useEffect(() => {
    error && toast.error(`${error.message}`);
  }, [error]);

  useEffect(() => {
    method === "" && setIsOptionsOpen(false);
  }, [method]);

  const handleChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files![0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target!.result);
      setJsonFile(e.target!.result);
    };
  };

  const isValidJsonString = (query: string) => {
    if (!(query && typeof query === "string")) {
      return false;
    }

    try {
      JSON.parse(query);
      return true;
    } catch (error) {
      return false;
    }
  };
  const JsonKeysExists = (objectName: string, keyName: string) => {
    JSON.parse(JsonFile).hasOwnProperty(keyName);
    return toast.error(`{JSON file is missing ${keyName} key}`);
  };

  const checkField = (obj: any, fields: any) => {
    for (let field of fields) {
      if (!Array.isArray(field)) {
        if (obj?.[field] === undefined) return false;
      } else if (!obj?.[field[0]] || !checkField(obj[field[0]], field[1]))
        return false;
    }
    return true;
  };

  const fileUpload = async (e: any) => {
    e.preventDefault();
    if (!JsonFile) {
      toast.error("Select a file to upload");
    } else if (!isValidJsonString(JsonFile)) {
      toast.error("Invalid JSON file");
    } else {
      if (
        !JSON.parse(JsonFile).hasOwnProperty("info") ||
        !JSON.parse(JsonFile).hasOwnProperty("event") ||
        !JSON.parse(JsonFile).hasOwnProperty("item") ||
        !JSON.parse(JsonFile).hasOwnProperty("variable")
      ) {
        toast.error("JSON file is missing required key");
      } else {
        const parsedJson = JSON.parse(JsonFile);
        for (const key in parsedJson) {
          if (Object.prototype.hasOwnProperty.call(parsedJson, key)) {
            const element = parsedJson[key];
            // console.log(element)
          }
        }
        toast.success("Items uploadd successfully");
        const formData = new FormData();
        formData.append("JsonFile", JsonFile);
        const headers = {
          "Content-Type": "application/json",
        };
        if (JsonFile === null) return;
        try {
          const data = await sendRequest(
            `/endpoints/new/collection/${id}`,
            "post",
            core_url,
            parsedJson,
            headers
          );
          setJsonData(data.data);

          if (data.skipped.length === 0) {
            return toast.success("No items Skipped");
          } else {
            return toast.warning(
              `The following were skipped Skipped ${JSON.stringify(
                data.skipped
              )}`
            );
          }
          console.log(data.skipped);
          // setTimeout(() => {
          //   navigate("/developer/dashboard");
          // }, 2000);
        } catch (error) {}
        // }
      }
    }
  };
  const clearInputField = () => {
    setJsonFile("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Paper className={classes.paper}>
      <Stack direction="column" mb={6}>
        <Box>
          <Typography variant="body1" fontSize="20px" fontWeight={800}>
            API Definition
          </Typography>
        </Box>
        <Box className={classes.pageSubHeading}>
          <Typography variant="subtitle2" width="auto" fontWeight={400}>
            When publishing an API to the ZapiAPI Hub, you can either manually
            edit endpoint definitions, use a specification file.
          </Typography>
        </Box>
        {/* <Typography
          variant="body1"
          fontSize="24px"
          color="#081F4A"
          fontWeight={500}
          mt={2}>
          Endpoints
        </Typography> */}
        <CustomTabs
          sx={{
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px !important",
            background: "white",
            color: "black",
          }}
          value={tab}
          indicatorColor="primary"
          textColor="inherit"
          onChange={handleTabChange}>
          <CustomTab
            icon={<BorderColor />}
            iconPosition="start"
            label="Endpoints"
          />
          <CustomTab
            icon={<UploadFileIcon />}
            iconPosition="start"
            label="Upload"
          />
        </CustomTabs>
      </Stack>
      <Box>
        <TabPanel value={tab} index={0}>
          <Stack>
            <Stack direction="column" mb={6}>
              <Typography
                variant="body1"
                fontSize="24px"
                color="#081F4A"
                fontWeight={500}
                mt={2}>
                Endpoints
              </Typography>

              <Typography
                variant="body1"
                fontSize="16px"
                fontWeight={400}
                mb={1}>
                Changes made to the endpoints will be reflected in the Hub.
              </Typography>
              <Box className={classes.pageDescription}>
                <Typography>Add and define your API endpoints.</Typography>
              </Box>
              <Box className={classes.pageActions}>
                <Box className={classes.inputs}>
                  <input type="text" name="search" placeholder="Search..." />
                </Box>
                <Box>
                  <button
                    onClick={toggleAdding}
                    className={classes.button}
                    style={{ background: isAdding ? "#c5c5c5" : "#081F4A" }}>
                    {isAdding ? "Cancel" : "Add Endpoint"}
                  </button>
                </Box>
              </Box>
            </Stack>
            {isAdding && (
              <form onSubmit={handleSubmit}>
                <Stack
                  direction="row"
                  width="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  my={1}>
                  <Typography>Add Endpoint</Typography>
                  <button
                    type="submit"
                    className={classes.button}
                    style={{ background: "#10c96b" }}>
                    {loading ? <Spinner /> : "ADD"}
                  </button>
                </Stack>
                <Stack direction="column" spacing={1} mt={4} mb={1}>
                  <Box className={classes.inputs}>
                    <input
                      type="text"
                      name="name"
                      {...bind}
                      placeholder="Name"
                    />
                  </Box>
                  <Box className={classes.inputs}>
                    <textarea
                      name="description"
                      {...bind}
                      placeholder="Description"
                    />
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2} my={1}>
                  <Box className={classes.inputs}>
                    <select name="method" {...select}>
                      <option value="get">GET</option>
                      <option value="post">POST</option>
                      <option value="patch">PATCH</option>
                      <option value="delete">DELETE</option>
                    </select>
                  </Box>
                  <Box className={classes.inputs}>
                    <input
                      type="text"
                      name="route"
                      {...bind}
                      placeholder="Route"
                    />
                  </Box>
                  <IconButton
                    onClick={toggleOptions}
                    disabled={method === "post"}
                    title="Toggle Params">
                    {isOptionsOpen ? <Remove /> : <Add />}
                  </IconButton>
                </Stack>
                {(isOptionsOpen || method === "post") && (
                  <>
                    <Stack direction="column" spacing={1}>
                      <Stack direction="row" spacing={2}>
                        <Box className={classes.inputs}>
                          <input
                            type="text"
                            name="headers"
                            {...bind}
                            placeholder="Headers"
                          />
                        </Box>
                        <Box className={classes.inputs}>
                          <select name="headerType" {...select}>
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="file">File</option>
                            <option value="boolean">Boolean</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                            <option value="enum">Enum</option>
                          </select>
                        </Box>
                        <Box className={classes.inputs}>
                          <input
                            type="checkbox"
                            name="headerIsRequired"
                            {...toggle}
                          />
                        </Box>
                        <Box className={classes.inputs}>
                          <button
                            type="button"
                            onClick={() =>
                              addHeaders({
                                name: headers,
                                type: headerType,
                                required: headerIsRequired,
                              })
                            }>
                            <Add />
                          </button>
                        </Box>
                      </Stack>
                      {(method === "post" || method === "post") && (
                        <Stack direction="row" spacing={2}>
                          <Box className={classes.inputs}>
                            <input
                              type="text"
                              name="requestBody"
                              {...bind}
                              placeholder="Body"
                            />
                          </Box>
                          <Box className={classes.inputs}>
                            <select name="requestBodyType" {...select}>
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="file">File</option>
                              <option value="boolean">Boolean</option>
                              <option value="object">Object</option>
                              <option value="array">Array</option>
                              <option value="date">Date</option>
                              <option value="time">Time</option>
                              <option value="enum">Enum</option>
                            </select>
                          </Box>
                          <Box className={classes.inputs}>
                            <select name="requestBodyFormat" {...select}>
                              <option value="application/json">
                                application/json
                              </option>
                              <option value="application/xml">
                                application/xml
                              </option>
                              <option value="application/octet-stream">
                                application/octet-stream
                              </option>
                              <option value="text/plain">text/plain</option>
                              <option value="form-data">form-data</option>
                            </select>
                          </Box>
                          {requestBodyFormat === "form-data" && (
                            <Box
                              sx={{
                                display: "flex",
                                // justifyContent: "center",
                                alignItems: "center",
                                "& input": {
                                  width: "200px",
                                  // height: "40px",
                                  padding: "0.5rem 0.5rem",
                                  borderRadius: "4px",
                                  border: "1px solid #999",
                                  outline: "none",
                                },
                              }}>
                              <input
                                type="file"
                                onChange={(e) => setFile(e.target.files)}
                              />
                            </Box>
                          )}
                          <Box className={classes.inputs}>
                            <input
                              type="checkbox"
                              name="requestBodyIsRequired"
                              {...toggle}
                            />
                          </Box>
                          <Box className={classes.inputs}>
                            <button
                              type="button"
                              onClick={() =>
                                addRequestBody({
                                  name: requestBody,
                                  type: requestBodyType,
                                  required: requestBodyIsRequired,
                                })
                              }>
                              <Add />
                            </button>
                          </Box>
                        </Stack>
                      )}
                      <Stack direction="row" spacing={2}>
                        <Box className={classes.inputs}>
                          <input
                            type="text"
                            name="queryParams"
                            {...bind}
                            placeholder="Query"
                          />
                        </Box>
                        <Box className={classes.inputs}>
                          <select name="queryParamType" {...select}>
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="file">File</option>
                            <option value="boolean">Boolean</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                            <option value="enum">Enum</option>
                          </select>
                        </Box>
                        <Box className={classes.inputs}>
                          <input
                            type="checkbox"
                            name="queryParamIsRequired"
                            {...toggle}
                          />
                        </Box>
                        <Box className={classes.inputs}>
                          <button
                            type="button"
                            onClick={() =>
                              addQueryParams({
                                name: queryParams,
                                type: queryParamType,
                                required: queryParamIsRequired,
                              })
                            }>
                            <Add />
                          </button>
                        </Box>
                      </Stack>
                    </Stack>
                  </>
                )}
              </form>
            )}
            {isAdding && (isOptionsOpen || method === "post") && (
              <Stack direction="column" spacing={1} my={2}>
                <ul className={classes.list}>
                  Headers:{" "}
                  {headersArray.length > 0 &&
                    headersArray.map((header, index) => (
                      <li key={index}>
                        {header.name}: {header.type}{" "}
                        <button onClick={() => removeHeader(header.name)}>
                          <Remove />
                        </button>
                      </li>
                    ))}
                </ul>
                <ul className={classes.list}>
                  Request Body:{" "}
                  {requestBodyArray.length > 0 &&
                    requestBodyArray.map((req, index) => (
                      <li key={index}>
                        {req.name}: {req.type}{" "}
                        <button onClick={() => removeRequestBody(req.name)}>
                          <Remove />
                        </button>
                      </li>
                    ))}
                </ul>
                <ul className={classes.list}>
                  Query Params:{" "}
                  {queryParamsArray.length > 0 &&
                    queryParamsArray.map((param, index) => (
                      <li key={index}>
                        {param.name}: {param.type}{" "}
                        <button onClick={() => removeQueryParams(param.name)}>
                          <Remove />
                        </button>
                      </li>
                    ))}
                </ul>
              </Stack>
            )}
            <EndpointTable id={`${id}`} />
          </Stack>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Stack>
            <Stack direction="column" mb={6}>
              <Typography
                variant="body1"
                fontSize="24px"
                color="#081F4A"
                fontWeight={500}
                mt={2}>
                Update API Definition
              </Typography>

              <Typography
                variant="body1"
                fontSize="16px"
                fontWeight={400}
                mb={10}>
                We only make use of Postman collection for now.
              </Typography>
              <UploadFile
                label="Upload JSON"
                logo_url=""
                visible={JsonFile ? true : false}
                handleChange={handleChange}
                imageUpload={fileUpload}
                imageReject={(e: any) => {
                  e.preventDefault();
                  clearInputField();
                  triggerRefresh();
                }}
                inputRef={inputRef}
              />
              <Box className={classes.pageActions}>
                <Typography
                  variant="subtitle1"
                  fontSize="1rem"
                  color="#081F4A"
                  fontWeight={400}>
                  (application/json)
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default EndpointTab;

const useStyles = makeStyles({
  paper: {
    width: "100%",
    minWidth: "890px",
    marginTop: "20px",
    padding: "2rem",
    marginBottom: "2rem",
  },
  pageSubHeading: {
    paddingBottom: "1rem",
  },
  pageDescription: {
    paddingBottom: "1rem",
  },
  pageActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    width: "max-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "24px",
    fontFamily: "var(--body-font)",
    "& input": {
      width: "100%",
      height: "40px",
      padding: "0 0.5rem",
      borderRadius: "4px",
      border: "1px solid #999",
      outline: "none",
    },
    "& select": {
      minWidth: "100px",
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
      width: "60px",
      height: "40px",
      background: "#081F4A",
      color: "#FFF",
      border: "none",
      borderRadius: "4px",
    },
    "& input[type=checkbox]": {
      width: "15px",
      height: "15px",
    },
  },
  saveBtn: {
    padding: "15px 25px",
    backgroundColor: "#0814FA",
    color: "white",
    borderRadius: "5px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#333",
    },
    "&:disabled": {
      backgroundColor: "rgb(214, 217, 219)",
      cursor: "default",
      color: "black",
      opacity: "0.5",
    },
  },
  discardBtn: {
    padding: "15px 25px",
    borderRadius: "5px",
    outline: "none",
    backgroundColor: "#fff",
    border: "1px solid rgb(214, 217, 219)",
    color: "rgba(0, 0, 0, 0.87)",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    color: "#FFF",
    padding: "6px 16px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "uppercase",
    fontFamily: "var(--body-font)",
    transition: "0.5s all ease-in-out cubic-bezier(0.075, 0.82, 0.165, 1)",
    cursor: "pointer",
    "&:disabled": {
      background: "#E0E0E0",
      color: "#484848",
    },
  },
  list: {
    display: "flex",
    gap: "0.5rem",
    listStyle: "none",
    color: "#081F4A",
    fontSize: "14px",
    "& li": {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      background: "#C4C4C4",
      color: "#081F4A",
      padding: "1px 3px",
      borderRadius: "2px",
    },
    "& button": {
      width: "",
      height: "15px",
      background: "#C4C4C4",
      color: "#081F4A",
      border: "none",
      padding: 0,
      "& svg": {
        fontSize: "0.75rem",
      },
    },
  },
  input_file: {
    "& input[type=file]": {
      background: "black",
      color: "red",
      padding: "1em",
    },
  },
});
