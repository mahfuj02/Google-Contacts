import React, { useContext, useState } from "react";

const RefreshContext = React.createContext();

export function useRefresh() {
  return useContext(RefreshContext);
}

export function RefreshProvider({ children }) {
  const [needRefresh, setNeedRefresh] = useState(false);

  const refreshPage = () => {
    setNeedRefresh(!needRefresh);
  };

  

  return (
    <RefreshContext.Provider onRefresh={refreshPage}>
      {children}
    </RefreshContext.Provider>
  );
}
