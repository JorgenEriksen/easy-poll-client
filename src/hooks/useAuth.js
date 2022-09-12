import { createContext, useEffect, useState, useContext } from "react";
import { authenticateAccessTokenAPI } from "../utils/apiRequests";

import store from "../utils/localstorage";
import LinearProgress from "@mui/material/LinearProgress";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [validAccessToken, setValidAccessToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = store.getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authenticateAccessTokenAPI()
      .then((e) => {
        login(e);
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  }, []);

  const logout = () => {
    store.removeAccessToken();
    setValidAccessToken(null);
    setIsAdmin(false);
  };

  // token is always valid this function
  const login = (userData) => {
    setValidAccessToken(userData.accessToken);
    setIsAdmin(userData.isAdmin);
    setDisplayName(userData.displayName);
    store.setAccessToken(userData.accessToken);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <AuthContext.Provider
      value={{
        validAccessToken,
        isAdmin,
        displayName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
