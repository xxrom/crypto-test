import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";
import { Helmet } from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Helmet>
        <title>CryptoPortal</title>

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <App />
    </div>
  </React.StrictMode>,

  document.getElementById("root")
);

/*
        <script src="https://cdn.tailwindcss.com"></script>

        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  * */
