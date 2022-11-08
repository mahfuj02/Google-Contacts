import { useEffect } from "react";
import {useCookies} from "react-cookie"

import classes from "../../styles/Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { userCreatePostRequest } from "../../core/fetchers";
import { REST_API_ENDPOINTS } from "../../core/routes";


export default function Login() {

  const [cookie, setCookie] = useCookies();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // CreateUser(tokenResponse.access_token);
      const response = await userCreatePostRequest(REST_API_ENDPOINTS.googleLogin,
         tokenResponse.access_token);
 
         console.log("response: ", response);
      setCookie("user", response.user_info);
      setCookie("server_token", response.token);
    },
  });

  useEffect(() => {
    console.log("User Cookie: ", cookie.user);
  }, [cookie.user]);
  
  return (
    <div className={classes.btnContainer}>
      <button
        type="button"
        onClick={login}
        className={classes.loginWithGoogleBtn}
      >
        Sign in with Google
      </button>
      </div>
  );
}
