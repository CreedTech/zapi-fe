import {
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useHttpRequest } from "../hooks";
import { getFreeApis } from "../redux/slices/freeApiSlice";
import { FREEUSEAPIDATA } from "../testdata";
import { toast } from "react-toastify";
import { Spinner } from "../assets";
import caretDown from "../assets/images/caret-down.png";

// const core_url = import.meta.env.VITE_CORE_URL
const core_url = "VITE_CORE_URL";
const X_ZAPI_FREE_TOKEN = import.meta.env.VITE_FREE_REQUEST_TOKEN;

const Hero: React.FC = () => {
  const classes = useStyles();
  const [apiId, setApiId] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState("");
  const dispatch = useAppDispatch();
  const { freeApis } = useAppSelector((store) => store.freeApis);
  const [apiName, setApiName] = useState<string>("");
  const { loading, sendRequest } = useHttpRequest();

  const handleChange = (event: SelectChangeEvent) => {
    setApiId(event.target.value);
  };

  useEffect(() => {
    const api = freeApis.find((api) => api.id === apiId);
    if (!api) return;
    setApiName(api.name);
  }, [apiId]);

  const pathName = apiName.replace(/ /g, "").toLowerCase();

  const nameOfApi = FREEUSEAPIDATA.find((api) => api.name == pathName);

  useEffect(() => {
    if (nameOfApi) {
      setQuery(JSON.stringify(nameOfApi.samplePayload, undefined, 4));
      setData("");
    }
    if (apiId.length === 0) {
      setQuery("");
    }
  }, [nameOfApi, apiId]);

  useEffect(() => {
    dispatch(getFreeApis());
  }, []);

  const headers = {
    "X-ZAPI-FREE-TOKEN": X_ZAPI_FREE_TOKEN,
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await sendRequest(
        `/subscription/free-request/${apiId}`,
        "post",
        core_url,
        JSON.parse(query),
        headers
      );
      setData(res.data);
    } catch (error) {
      if (query === null || !query) {
        toast.error("Select an API before you make a request");
      } else {
        toast.error("Request unsuccessful");
      }
    }
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

  return (
    <div className={classes.hero}>
      <div className={classes.heroText}>
        <Typography
          gutterBottom
          variant="h1"
          sx={{
            fontFamily: "Space Grotesk",
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: "2.87rem",
            paddingBottom: "1.5rem",
            color: "#071B85",
            "@media screen and (max-width:400px)": {
              marginTop: "7rem",
            },
          }}>
          The Artificial Intelligence (AI) API Marketplace
        </Typography>
        <Typography
          gutterBottom
          variant="h2"
          sx={{
            padding: "0 4rem",
            fontFamily: "Space Grotesk",
            fontWeight: 400,
            fontSize: "1.5rem",
            lineHeight: "2.5rem",
            paddingBottom: "2rem",
            color: "#071B85",
            "@media screen and (max-width:600px)": {
              padding: "0rem",
              fontSize: ".9rem",
            },
          }}>
           Z-API allows you to harness the power of AI on your applications without stress. Use powerful AI APIs developed by machine learning engineers all over the world 
        </Typography>
      </div>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <FormControl
            sx={{
              minWidth: 110,
              ".MuiOutlinedInput-notchedOutline": {
                border: 0,
                borderRadius: 0,
                outline: 0,
              },
              ".css-1w8tldt-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                { border: 0, borderRadius: 0, outline: "none" },
            }}>
            <Select
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": {
                  border: 0,
                  borderRadius: 0,
                  outline: 0,
                  color: "red",
                },
              }}
              className={classes.select}
              value={apiId}
              onChange={handleChange}
              autoWidth
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                style: {
                  backgroundColor: "#eaeaea",
                  fontSize: ".8rem",
                  outline: "none",
                  border: 0,
                  borderRadius: 0,
                },
              }}>
              <MenuItem sx={{ minWidth: 120, fontSize: ".8rem" }} value="">
                Select An Api
              </MenuItem>
              {freeApis?.map((api: any) => (
                <MenuItem
                  sx={{ minWidth: 120, fontSize: ".8rem" }}
                  key={api.id}
                  value={api.id}>
                  {api.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            disabled
            variant="standard"
            type="text"
            className={classes.input}
            value={"https://zapi.com/" + pathName}
            style={{ paddingLeft: "1rem" }}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: ".9rem" },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!query || apiId.length === 0 || !isValidJsonString(query)}
          className={classes.send}>
          {loading ? <Spinner /> : "Send"}
        </button>
      </form>
      <div className={classes.actionBoxes}>
        <TextField
          inputProps={{
            style: { color: !isValidJsonString(query) ? "red" : "black" },
          }}
          style={{ backgroundColor: "#f1f8fd" }}
          className={classes.box}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          multiline
          rows="8.5"
        />
        <TextField
          className={classes.box}
          defaultValue={data}
          fullWidth
          multiline
          rows="8.5"
        />
      </div>
    </div>
  );
};

export default Hero;

const useStyles = makeStyles({
  hero: {
    width: "100%",
    paddingTop: "10rem",
    background: "#FFFFFF",
    paddingRight: "5rem",
    paddingLeft: "5rem",
    "@media screen and (max-width: 768px)": {
      padding: "8rem .5rem 0rem .5rem",
    },
    "@media screen and (max-width: 400px)": {
      paddingTop: "0rem",
    },
  },
  heroText: {
    textAlign: "center",
    paddingTop: "2rem",
    "@media screen and (max-width: 950px)": {
      "& br": {
        display: "none",
      },
    },
  },
  form: {
    display: "flex",
    width: "100%",
    border: "none",
    "@media screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  formGroup: {
    display: "flex",
    flexGrow: "1",
    marginBottom: "5px",
  },
  select: {
    border: "none",
    outline: "none",
    // padding: "1rem",
    // borderRadius: "5px 0px 0px 5px",
    cursor: "pointer",
    backgroundColor: "#eaeaea",
    color: "#071B85",
    fontWeight: 500,
    fontSize: "1rem",
    fontFamily: "Space Grotesk",
    paddingRight: "0rem",
    appearance: "none",
    borderRadius: "0px",
    "@media screen and (max-width: 500px)": {
      width: "100%",
    },
    "& ::part(optgroup)": {
      marginButtom: "5rem",
    },
    "& .MuiSelect-select": {
      borderRadius: "0",
    },
  },

  input: {
    background: "rgba(19, 50, 159, 0.05)",
    flex: 1,
    border: "none",
    height: "3.5rem",
    outline: "none",
    fontFamily: "Space Grotesk",
    color: "#071B85",
    display: "flex",
    justifyContent: "center",
    "&::placeholder": {
      fontWeight: 400,
      fontSize: "1rem",
      fontFamily: "Space Grotesk",
      color: "#071B85",
    },
  },
  send: {
    height: "100%",
    background: "#081F4A",
    borderRadius: "0px 4px 4px 0px",
    padding: "1.12rem 2rem",
    border: "none",
    fontWeight: 500,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "Space Grotesk",
    color: "#FFEA00",
    "&:disabled": {
      backgroundColor: "rgb(214, 217, 219)",
      cursor: "default",
      color: "black",
      opacity: "0.5",
    },
    "@media screen and (max-width: 500px)": {
      flexDirection: "column",
    },
  },
  box: {
    background: "#EDF5Fd",
    // border: "1px solid #161616",
    borderRadius: "1px",
    "&:hover": {
      boxShadow:
        "0px 0px 8px rgba(26, 32, 36, 0.32), 0px 40px 64px rgba(91, 104, 113, 0.24)",
      // border: "2px solid #161616",
    },
  },
  actionBoxes: {
    display: "flex",
    gap: "1rem",
    paddingTop: "2.5rem",
    "@media screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  inputForm: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    "@media screen and (max-width: 500px)": {
      flexDirection: "column",
      width: "100%",
      padding: "0",
      margin: "0",
    },
  },
});
