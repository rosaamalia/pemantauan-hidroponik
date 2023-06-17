"use client";

import { createContext, useState } from "react";

const AkunContext = createContext();

export function AkunProvider({ children }) {
  const [akunData, setAkunData] = useState(null);

  const contextValue = {
    akunData,
    updateAkunData: setAkunData,
  };

  return (
    <AkunContext.Provider value={contextValue}>{children}</AkunContext.Provider>
  );
}

export default AkunContext;
