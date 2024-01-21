import { useState } from "react";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import { removeEndpoint } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { Paper } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useFormInputs,
  useHttpRequest,
} from "../hooks";
import { Spinner } from "../assets";
import { removeApi } from "../redux/slices/apiSlice";

// const core_url = import.meta.env.VITE_CORE_URL
const core_url = "VITE_CORE_URL";

const SettingsPage: React.FC = () => {
  const [status, setStatus] = useState("");
  const [popup, setPop] = useState(false);
  const { error, loading, sendRequest } = useHttpRequest();
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const cookies = new Cookies();
  const profileId = cookies.get("profileId");
  // const [delete, setDelete] = useState("")
  let payload: object;

  const handleClickDelete = () => {
    setPop(!popup);
  };

  const closePopup = () => {
    setPop(false);
  };
  function onChangeValue(event: any) {
    setStatus(event.target.value);
  }

  const handleDeleteApi = async (e: any) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    try {
      const data = await sendRequest(
        `/api/${id}?profileId=${profileId}`,
        "del",
        core_url,
        payload,
        headers
      );
      if (!data || data === undefined) return;
      toast.success(data.data.message);
      navigate("/developer/dashboard");
    } catch (error) {}
  };

  return (
    <Paper elevation={1} className={classes.paper}>
      <div className="text-col">
        <h3>Transfer Ownership</h3>
      </div>
      <div className="col-col">
        <span>
          Transfer ownership of this API to another ZAPI user or team
        </span>
      </div>
      <div className="col-4">
        <h3>Transfer to</h3>
      </div>

      <div>
        <div onChange={onChangeValue}>
          <div className="name-handler">
            <input
              id="gender"
              type="radio"
              value="User"
              className="radio"
              name="User"
              disabled={true}
              checked={status === "User"}
            />
            <label className="users">User</label>
          </div>
          <div className="name-handler">
            <input
              id="gender"
              type="radio"
              className="radio"
              value="Team"
              name="Team"
              disabled={true}
              checked={status === "Team"}
            />
            <label className="users">Team</label>
          </div>

          {status === "User" ? (
            <div className="form-outer">
              <div className="container">
                <div className="form">
                  <span className="icon">
                    <SearchIcon className="icon2" />{" "}
                  </span>
                  <input
                    id="input-input"
                    className="search-col"
                    placeholder="Search ZAPI users"
                  />
                </div>
              </div>
            </div>
          ) : status === "Team" ? (
            <div className="form">
              <div className="form">
                <select className="select-inputs">
                  <option value="1" disabled selected hidden>
                    Select a team...
                  </option>
                  <option id="select-inputs" disabled={true}>
                    <button id="ishidden">None</button>
                  </option>
                </select>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <button className="button-1">Transfer Ownership</button>

      <div className="name-pro">
        <h3 className="name-col">Delete API Project</h3>
      </div>
      <span className="more-text">
        Permanently deleting this API project will remove it from the ZAPI
        Hub <br />
        Listing, will destroy your team's data from Requests, Testing and
        Descriptions. <br /> This action is not reversible
      </span>
      <br />
      <div>
        <button
          onClick={handleClickDelete}
          data-selected={false}
          type="button"
          className="kvng1">
          <div className="kin101">Delete API Project</div>
        </button>

        {popup ? (
          <form className="del-main">
            <div className="del-con1">
              <span className="doc">Delete API Project</span>
              <span onClick={closePopup} className="xlm">
                {" "}
                X{" "}
              </span>
            </div>

            <div className="del-del">
              <span className="sue-del">
                Are you sure you want to permanentely delete this API Project?
                <br />
                This action CANNOT be undone.
              </span>
            </div>

            <div className="lose-del">
              <span className="sue-del">
                You will permanentely lose:
                <ul className="ul-num">
                  <li>Your API subscribers (1)</li>
                  <li>Your API data & analysis</li>
                  <li>Your API documentation</li>
                  <li>Any data from ZapiAPI Testing</li>
                  <li>
                    Any data from ZapiAPI Requests (previously known as Paw)
                  </li>
                </ul>
              </span>
            </div>
            <hr />

            <button onClick={handleDeleteApi} className="buttons-1">
              {loading ? <Spinner /> : "Delete API Project"}
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
    </Paper>
  );
};

const useStyles = makeStyles({
  paper: {
    width: "950px",
    marginTop: "20px",
    padding: "2rem 2rem",
  },
});

export default SettingsPage;
