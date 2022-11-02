import React, { useContext } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //   const [loading, setLoading] = useState(false);
  //   const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //   getServerCode(tokenResponse.access_token);
      navigate("/");
    },
  });
  const logout = googleLogout();

  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
