import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
    } else {
      localStorage.removeItem("accessToken");
    }
    setToken(newToken);
  };

  const contextValue = {
    token,
    setToken: handleSetToken,
  }

  return (
    <AuthContext value={contextValue}>
      {children}
    </AuthContext>
  )
};


export const useAuth = () => {
  return useContext(AuthContext)
}