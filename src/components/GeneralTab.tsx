import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  SyntheticEvent,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ImageRounded } from "@mui/icons-material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Switch,
  SelectChangeEvent,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import Cookies from "universal-cookie";

import {
  useAppDispatch,
  useAppSelector,
  useFormInputs,
  useHttpRequest,
} from "../hooks";
import ImageUpload from "./ImageUpload";
import { editAPI } from "../redux/slices/userSlice";
import { Spinner } from "../assets";
import axios from "axios";
import { toast } from "react-toastify";
import ZAPI from "../images/zapi-logo.png";
import { useContextProvider } from "../contexts/ContextProvider";
import UploadFile from "./UploadFile";

enum APIVisibility {
  PRIVATE = "private",
  PUBLIC = "public",
}

const core_url = "VITE_CORE_URL";

const GeneralTab: React.FC = () => {
  const [description, setDescription] = useState<String>("");
  const [about, setAbout] = useState<String>("");
  const [api_website, setApi_website] = useState<String>("");
  const [term_of_use, setTerm_of_use] = useState<String>("");
  const { apis, categories } = useAppSelector((store) => store.apis);
  const [base_url, setBase_url] = useState<String>("");
  const [visibility, setVisibility] = useState<String>(APIVisibility.PUBLIC);
  const [categoryId, setCategoryId] = useState<String>("");
  const [read_me, setRead_me] = useState<String>("");
  const [logo_url, setLogo_url] = useState<any>("");
  const { error, loading, sendRequest } = useHttpRequest();
  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  const { triggerRefresh } = useContextProvider();
  const classes = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  // const [img, setImg] = useState(null);
  const [image, setImage] = useState<string | File>("");
  const { userApis } = useAppSelector((store: any) => store.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const api = userApis.find((api: any) => api?.id === id);
  const userData = {
    about: api?.about,
    api_website: api?.api_website,
    base_url: api?.base_url,
    categoryId: api?.categoryId,
    description: api?.description,
    read_me: api?.read_me,
    term_of_use: api?.term_of_use,
    visibility: api?.visibility,
  };

  const setFields = () => {
    if (api) {
      setLogo_url(api?.logo_url);
      setDescription(api?.description),
        setAbout(api?.about),
        setApi_website(api?.api_website),
        setTerm_of_use(api?.term_of_use),
        setBase_url(api?.base_url),
        setVisibility(api?.visibility),
        setCategoryId(api.categoryId),
        setRead_me(api?.read_me);
    }
  };

  useEffect(() => {
    setFields();
  }, [id]);

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    if (visibility === APIVisibility.PUBLIC) {
      setVisibility(APIVisibility.PRIVATE);
    } else {
      setVisibility(APIVisibility.PUBLIC);
    }
  };

  const payload = {
    about,
    api_website,
    base_url,
    categoryId,
    description,
    read_me,
    term_of_use,
    visibility,
  };

  const isChanged = JSON.stringify(payload) === JSON.stringify(userData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const data = await sendRequest(
        `/api/${id}?profileId=${profileId}`,
        "patch",
        core_url,
        payload,
        headers
      );
      if (!data.success) return;
      dispatch(editAPI(payload));
      navigate("/developer/dashboard");
    } catch (error) {}
  };

  const handleDiscard = (e: any) => {
    e.preventDefault();

    setDescription(""),
      setAbout(""),
      setApi_website(""),
      setTerm_of_use(""),
      setBase_url(""),
      setVisibility(""),
      setCategoryId(""),
      setRead_me("");

    setFields();
  };

  const imageUpload = async (e: any) => {
    e.preventDefault();
    if (!image) {
      toast.error("Select an Image to upload!");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      const headers = {
        "Content-Type": "multi-part/form-data",
      };
      if (image === null) return;
      try {
        const data = await sendRequest(
          `/api/api-logo/${id}`,
          "post",
          core_url,
          formData,
          headers
        );
        setLogo_url(data.data);
        setTimeout(() => {
          navigate("/developer/dashboard");
        }, 2000);
      } catch (error) {}
    }
  };

  const clearImageField = () => {
    setImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="body1" fontSize="24px" fontWeight={800}>
            General Information
          </Typography>
          <form>
            <Box>
              <UploadFile
                label="Upload Logo"
                handleChange={(e: any) => setImage(e.target.files![0])}
                visible={image ? true : false}
                logo_url={logo_url}
                imageUpload={imageUpload}
                imageReject={(e: any) => {
                  e.preventDefault();
                  clearImageField();
                  triggerRefresh();
                }}
                inputRef={inputRef}
              />
            </Box>
            <Box mt={2}>
              <InputLabel htmlFor="category" id="category">
                Category
              </InputLabel>
              <FormControl>
                <Select
                  required
                  value={categoryId}
                  name="categoryId"
                  onChange={(e) => setCategoryId(e.target.value)}
                  sx={{ width: "320px", height: "40PX" }}>
                  {categories.map(
                    (value: any) =>
                      value && (
                        <MenuItem key={value.id} value={value.id}>
                          {value.name}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              <InputLabel htmlFor="description">Short Description</InputLabel>
              <TextField
                required
                value={description}
                variant="outlined"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                multiline
                id="description"
                rows={4}
                fullWidth={true}
                helperText="Describe in few words what’s this API do"
              />
            </Box>
            <Box mt={2}>
              <InputLabel htmlFor="read_me">Read Me (optional)</InputLabel>
              <TextField
                value={read_me == null ? "" : read_me}
                variant="outlined"
                onChange={(e) => setRead_me(e.target.value)}
                multiline
                id="read_me"
                rows={4}
                fullWidth={true}
                helperText="Describe in detail what’s API do and how it might be helpful"
              />
            </Box>
            <Box mt={2}>
              <InputLabel htmlFor="documentation">
                Documentation (optional)
              </InputLabel>
              <TextField
                variant="outlined"
                value={about == null ? "" : about}
                name="about"
                onChange={(e) => setAbout(e.target.value)}
                multiline
                rows={4}
                id="documentation"
                fullWidth={true}
                helperText="Use this section to provide detailed documentation of your API and to highlight its benefits and features."
              />
            </Box>
            <Box mt={2}>
              <InputLabel htmlFor="api_website">Website(optional)</InputLabel>
              <TextField
                placeholder="https://"
                value={api_website == null ? "" : api_website}
                name="api_website"
                onChange={(e) => setApi_website(e.target.value)}
                variant="outlined"
                id="website"
                fullWidth={true}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body1" fontSize="20px" fontWeight={800}>
                Visibility
              </Typography>
              <Typography variant="body1" fontSize="16px" fontWeight={400}>
                Switching your API visibility to Public make it searchable and
                accessible to everyone.
              </Typography>
              <Box
                sx={{
                  padding: "30px",
                  border: "1px solid black",
                  marginBottom: "20px",
                }}>
                <Stack direction="row" spacing={2}>
                  <Box>
                    {visibility === APIVisibility.PUBLIC ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </Box>
                  <Box>
                    {visibility === APIVisibility.PUBLIC ? (
                      <>
                        <Typography fontWeight={600}>
                          API Project is Public
                        </Typography>
                        <Typography>
                          Accessible to hundreds of thousands of developers on
                          the Hub
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography fontWeight={600}>
                          API Project is Private
                        </Typography>
                        <Typography>
                          It&apos;s not visible on the Hub and new users
                          can&apos;t access it
                        </Typography>
                      </>
                    )}
                    <Switch
                      value={visibility}
                      checked={visibility === APIVisibility.PUBLIC}
                      name="visibility"
                      onChange={handleSwitch}
                    />
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ padding: "30px", border: "1px solid black" }}>
                <Typography variant="body1" fontSize="18px" fontWeight={600}>
                  Base URL
                </Typography>
                <Typography variant="body1" fontSize="18px" fontWeight={400}>
                  Add a base URL, configure multiple URLs, override URLs, and
                  select a load balancer
                </Typography>
                <InputLabel htmlFor="website">URL</InputLabel>
                <Stack direction="row">
                  <TextField
                    required
                    value={base_url}
                    name="base_url"
                    onChange={(e) => setBase_url(e.target.value)}
                    placeholder="https://"
                    variant="outlined"
                    id="website"
                    fullWidth={true}
                  />
                </Stack>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="body1" fontSize="20px" fontWeight={800}>
                Additional Information
              </Typography>
              <InputLabel htmlFor="terms">Terms of Use (optional)</InputLabel>
              <TextField
                variant="outlined"
                value={term_of_use == null ? "" : term_of_use}
                multiline
                rows={4}
                name="term_of_use"
                onChange={(e) => setTerm_of_use(e.target.value)}
                fullWidth={true}
              />
            </Box>
            <Box>
              <Stack direction="row" spacing={2} mt={5}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isChanged}
                  className={classes.saveBtn}>
                  {loading ? <Spinner /> : "Save"}
                </button>
                <button className={classes.discardBtn} onClick={handleDiscard}>
                  Discard
                </button>
              </Stack>
            </Box>
          </form>
        </div>
      </Paper>
    </>
  );
};

export default GeneralTab;

const useStyles = makeStyles({
  paper: {
    width: "950px",
    marginTop: "20px",
    padding: "2rem 2rem",
  },
  container: {
    background: "inherit",
    borderRadius: "5px",
    width: "600px",
    padding: "20px",
    "@media screen and (max-width: 900px)": {
      width: "auto",
    },
  },
  previewContainer: {
    position: "relative",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  imgPreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
  },
  uploadBtn: {
    padding: "5px 10px",
    border: "1px solid rgb(214, 217, 219)",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  imagePreview: {
    height: "150px",
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
});
