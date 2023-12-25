"use client"
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface AppContextType {
  sectionOneVisible: boolean;
  setSectionOneVisible: Dispatch<SetStateAction<boolean>>;
  sectionTwoVisible: boolean;
  setSectionTwoVisible: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [sectionOneVisible, setSectionOneVisible] = useState(false);
  const [sectionTwoVisible, setSectionTwoVisible] = useState(false);

  const contextValues: AppContextType = {
    sectionOneVisible,
    setSectionOneVisible,
    sectionTwoVisible,
    setSectionTwoVisible,
  };

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
