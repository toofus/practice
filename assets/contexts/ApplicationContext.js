import React, { createContext } from "react";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const value = { appEnv: window.appEnv };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
