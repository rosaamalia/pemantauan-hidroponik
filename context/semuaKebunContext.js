"use client";

import { createContext, useState, useEffect } from "react";
import { api } from "@utils/api";

const SemuaKebunContext = createContext();

export function SemuaKebunProvider({ children }) {
  const [semuaKebunData, setSemuaKebunData] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    async function fetchData() {
      try {
        const response = await api.get("/api/kebun/", {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setSemuaKebunData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const contextValue = {
    semuaKebunData,
    updateSemuaKebunData: setSemuaKebunData,
  };

  return (
    <SemuaKebunContext.Provider value={contextValue}>
      {children}
    </SemuaKebunContext.Provider>
  );
}

export default SemuaKebunContext;
