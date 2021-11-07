import "@/styles/app.css";
import React from "react";
import ReactDOM from "react-dom";
import Application from "@/components/Application";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ApplicationProvider>
      <BrowserRouter basename="/dashboard">
        <Application />
      </BrowserRouter>
    </ApplicationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
