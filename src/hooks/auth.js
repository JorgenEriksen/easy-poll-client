import { createContext, useEffect, useState, useContext } from "react";
import { authenticateAccessToken } from "../utils/apiRequests";
import { getAccessToken, removeAccessToken } from "../utils/localstorage";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    authenticateAccessToken()
      .then((e) => {
        console.log("her?");
        if (e.isValid) {
          login(token, e.isAdmin);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log("her?"));
  }, []);

  const logout = () => {
    removeAccessToken();
    setValidAccessToken(null);
    setIsAdmin(false);
  };

  const login = (token, isAdmin) => {
    setValidAccessToken(token);
    setIsAdmin(isAdmin);
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <AuthContext.Provider
      value={{
        validAccessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
