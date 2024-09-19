import React, { createContext, useContext, useState } from "react";

interface AppState {
  name: string;
  message: string;
  color: string;
  image: any;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppState>({
  name: "",
  message: "",
  color: "",
  image: {},
  setName: () => {},
  setMessage: () => {},
  setColor: () => {},
  setImage: () => {},
});

AppContext.displayName = 'AppContext';

type Props = {
  children: React.ReactNode;
};

export const AppStateProvider = ({ children }: Props) => {
  const state = useProvideState();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

const useProvideState = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState();

  return {
    name,
    setName,
    message,
    setMessage,
    color,
    setColor,
    image,
    setImage,
  };
};

export const useAppState = () => {
  return useContext(AppContext);
};
