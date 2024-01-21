import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { SyntheticEvent, useState } from "react";
import { useHttpRequest } from "../hooks";
import { toast } from "react-toastify";
import { Spinner } from "../assets";
import { EMAIL_REGEX } from "../utils";

const core_url = "VITE_CORE_URL";

const Modalpopup = ({ open, handleClose, setOpen }: any) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [load, setLoad] = useState(false)
  const { error, loading, sendRequest } = useHttpRequest();
  const isValid = name && email && body

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) return toast.error("Please input a valid email")
    setLoad(true)
    const payload = { name, email, body };
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        "/feedback/create",
        "post",
        core_url,
        payload,
        headers
      );
      if (!data) return;
      const {message} = data
      setLoad(false)
      toast.success(`${message}`)
      setName('')
      setEmail('')
      setBody('')
      setOpen(false)
    } catch (error) {
      setLoad(false)
      toast.error('Could not create your feedback')
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What's your feedback?
          </Typography>
          <TextField
            sx={textField}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={textField}
            id="standard-basic"
            label="Email"
            variant="standard"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            maxRows={6}
            minRows={6}
            placeholder="Give us your feedback"
            style={{
              width: "99%",
              height: "30%",
              marginTop: "5%",
              padding: "2%",
              fontSize: "1em",
            }}
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
          <Typography
            id="modal-modal-description"
            sx={{ my: 4, display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                width: "30em",
                background: "#081F4A",
                color: "white",
              }}
              variant="contained"
              disableElevation
              disableFocusRipple
              disabled={!isValid}
              onClick={handleSubmit}>
              {load ? <Spinner/> : 'Submit'}
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Modalpopup;

const style = {
  position: "absolute" as "absolute",
  display: "block",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "@media screen and (max-width: 495px)": {
    width: 350,
  },
};

const textField = {
  marginTop: "5px",
  marginBottom: "5px",
  width: "99%",
  fontSize: "1em",
};
