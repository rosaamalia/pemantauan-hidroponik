"use client";

import { createContext, useState } from "react";

const KebunContext = createContext();

export function KebunProvider({ children }) {
  const [kebunData, setKebunData] = useState(null);

  const contextValue = {
    kebunData,
    updateKebunData: setKebunData,
  };

  return (
    <KebunContext.Provider value={contextValue}>
      {children}
    </KebunContext.Provider>
  );
}

export default KebunContext;
