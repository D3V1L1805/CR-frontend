import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [tables, setTables] = useState([]);
    const [data, setData] = useState(null)

  return (
    <StateContext.Provider value={{ images, setImages, tables, setTables, data, setData }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
