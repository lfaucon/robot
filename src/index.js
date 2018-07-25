import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDnJNV4nfOvm5dvDJwY_aVcs7MwPBfO5MQ",
  authDomain: "robot-1badb.firebaseapp.com",
  databaseURL: "https://robot-1badb.firebaseio.com",
  projectId: "robot-1badb",
  storageBucket: "robot-1badb.appspot.com",
  messagingSenderId: "426482047248"
};
firebase.initializeApp(config);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
