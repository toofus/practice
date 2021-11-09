import React, { useContext, lazy, Suspense, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
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

  const handleClickDrop = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 container mx-auto">
        <Menu as="div" className="lg:hidden relative bg-green-200">
          <Menu.Button className="p-2 block w-full">Open</Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className="absolute w-full bg-white flex flex-col divide-y p-3"
            >
              <Menu.Item as="li">
                <button onClick={() => handleClickDrop("/about")}>About</button>
              </Menu.Item>
              <Menu.Item as="li">
                <button onClick={() => handleClickDrop("/profile")}>
                  Profile
                </button>
              </Menu.Item>
              <Menu.Item as="li">
                <button>Home</button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="hidden lg:flex items-center justify-between space-x-2 p-2 bg-red-200">
          <ul className="flex-1 flex items-center space-x-2 bg-blue-200 p-2">
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

          <Menu as="div" className="relative bg-green-200">
            <Menu.Button className="p-2">Open</Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="ul"
                className="absolute right-0 w-56 origin-top-right bg-white flex flex-col divide-y p-3"
              >
                <Menu.Item as="li">
                  <button onClick={() => handleClickDrop("/about")}>
                    About
                  </button>
                </Menu.Item>
                <Menu.Item as="li">
                  <button onClick={() => handleClickDrop("/profile")}>
                    Profile
                  </button>
                </Menu.Item>
                <Menu.Item as="li">
                  <button>Home</button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

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
