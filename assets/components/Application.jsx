import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import Dashboard from "@/pages/Dashboard";
const Profile = lazy(() => import("@/pages/Profile"));
const About = lazy(() => import("@/pages/About"));

const Application = () => {
  const { appEnv } = useContext(ApplicationContext);

  return (
    <BrowserRouter basename={appEnv.basePath}>
      <div className="min-h-screen bg-gray-100">
        <ul className="flex items-center space-x-2">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        <div className="mt-10">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Application;
