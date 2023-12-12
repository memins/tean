import React, { useState } from "react";
import DarkModeContext from "./DarkModeContext";

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
