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



// @channel Updated env variables

// VITE_IDENTITY_URL='https://development.identity.zapi.ai/api/v1'
// VITE_BASE_URL='https://development.core.zapi.ai/api/v1'
// VITE_CORE_URL='https://development.core.zapi.ai/api/v1'
// VITE_SOCKET_URL='https://development.notification.zapi.ai'
// VITE_AI_URL='https://qnanswer-api.pk25mf6178910.eu-west-3.cs.amazonlightsail.com/q_and_a'
// VITE_GOOGLE_CLIENT_ID='http://1053295469648-6k70pt4pl5b205ugmu09ru9dpo3ioqvf.apps.googleusercontent.com'
// VITE_DEFAULT_CATEGORY_ID='92275577-46d6-43c4-bb15-dc2fb4bb56f9'
// NODE_OPTIONS="--max-old-space-size=512"
// VITE_ENV=dev