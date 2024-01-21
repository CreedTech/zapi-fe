import "./init";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { ContextProvider } from "./contexts/ContextProvider";
import { Amplify } from "aws-amplify";
import Cookies from "universal-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
const cookies = new Cookies();
const client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const vite_identity_url = import.meta.env.VITE_IDENTITY_URL;
const vite_core_url = import.meta.env.VITE_CORE_URL;
const vite_socket_url = import.meta.env.VITE_SOCKET_URL;

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "VITE_IDENTITY_URL",
        endpoint: vite_identity_url,
      },
      {
        name: "VITE_AI_URL",
        endpoint:
          "https://qnanswer-api.pk25mf6178910.eu-west-3.cs.amazonlightsail.com/q_and_a",
      },
      {
        name: "VITE_SOCKET_URL",
        endpoint: vite_socket_url,
      },
      {
        name: "VITE_CORE_URL",
        endpoint: vite_core_url,
        custom_header: async () => {
          return {
            "X-Zapi-Auth-Token": `Bearer ${cookies.get("accessToken")}`,
          };
        },
      },
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ContextProvider>
          <GoogleOAuthProvider clientId={client_Id}>
            <App />
          </GoogleOAuthProvider>
        </ContextProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
