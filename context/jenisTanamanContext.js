"use client";

import { createContext, useState, useEffect } from "react";
import { api } from "@utils/api";

const JenisTanamanContext = createContext();

export function JenisTanamanProvider({ children }) {
  const [jenisTanamanData, setJenisTanamanData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/api/jenis-tanaman/");
        setJenisTanamanData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const contextValue = {
    jenisTanamanData,
    updateJenisTanamanData: setJenisTanamanData,
  };

  return (
    <JenisTanamanContext.Provider value={contextValue}>
      {children}
    </JenisTanamanContext.Provider>
  );
}

export default JenisTanamanContext;
