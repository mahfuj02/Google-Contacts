import React, { useContext } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {REST_API_ENDPOINTS} from "../core/routes"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let userInfo;

  function CreateUser(googleToken, route, setCookie) {
    fetch(
      REST_API_ENDPOINTS.googleLogin,

      // `${process.env.REACT_APP_API_URL}/login/google/`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ access_token: googleToken }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // userInfo = { ...data.user_info };
        // console.log("Current User: ", userInfo);
        // setCookie("adminToken", data?.token);
        getUserInfo(data?.token);

        // route.push(
        //   route.query.from ? decodeURIComponent(`${route.query.from}`) : "/"
        // );
      });
  }
  const getUserInfo = (token, dispatch) => {
    fetch(`http://127.0.0.1:8000/user-info/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("from serverdata: ", data)
        userInfo ={...data}
        console.log(userInfo," user inof..")
        // dispatch(setUserInfo(data));
      });
      return userInfo;
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      CreateUser(tokenResponse.access_token);
      console.log("OnSUccess...");
      navigate("/");
    },
  });
  const logout = googleLogout();

  const value = {
    getUserInfo,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
