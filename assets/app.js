import "@/styles/app.css";
import React from "react";
import ReactDOM from "react-dom";
import Application from "@/components/Application";
import { ApplicationProvider } from "@/contexts/ApplicationContext";

ReactDOM.render(
  <React.StrictMode>
    <ApplicationProvider>
        <Application />
    </ApplicationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
