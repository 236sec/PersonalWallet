"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type UserType = {
  id: string;
  name: string;
  email: string;
} | null;

type GlobalContextType = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

type GlobalProviderProps = {
  children: ReactNode;
};

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>(null);

  return (
    <GlobalContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
