import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const auth0Options: Parameters<typeof Auth0Provider>[0] = {
  domain: process.env.REACT_APP_AUTH_DOMAIN || "",
  clientId: process.env.REACT_APP_AUTH_ID || "",
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider {...auth0Options}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
