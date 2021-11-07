import React, { useContext, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ApplicationContext } from "@/contexts/ApplicationContext";
import Dashboard from "@/pages/Dashboard";
const Profile = lazy(() => import("@/pages/Profile"));
const About = lazy(() => import("@/pages/About"));

const Application = () => {
  const { appEnv, menu } = useContext(ApplicationContext);
  let navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
    menu.open = !menu.open;
  };

  return (
    <>
      <div className={menu.open ? "block my-5" : "hidden"}>Menu Open</div>
      <div className="min-h-screen bg-gray-100">
        <ul className="flex items-center space-x-2">
          <li>
            <button onClick={() => handleClick("/")}>Dashboard</button>
          </li>
          <li>
            <button onClick={() => handleClick("/about")}>About</button>
          </li>
          <li>
            <button onClick={() => handleClick("/profile")}>Profile</button>
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
    </>
  );
};

export default Application;
