import classes from "../../styles/Login.module.css";
import {useGoogleLogin } from "@react-oauth/google";
import getServerCode from "../../services/googleLogin";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Login() {

  const navigate = useNavigate()

  const { login } =useAuth()
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
