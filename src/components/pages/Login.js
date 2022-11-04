import classes from "../../styles/Login.module.css";
import getServerCode from "../../services/googleLogin";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {


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
