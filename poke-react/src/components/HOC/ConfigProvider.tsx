// ConfigContext.tsx
import React, { createContext, useContext } from "react";
import {WORDING} from "../../const/text";

const ConfigContext = createContext(WORDING);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Optionally, you could store this in state if you plan to update it dynamically.
  return (
    <ConfigContext.Provider value={WORDING}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
