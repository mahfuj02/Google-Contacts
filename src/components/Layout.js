import { useState } from "react";
import classes from "../styles/Layout.module.css";
import Nav from "./Nav";
import Sidevar from "./Sidevar";
import React from "react";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {

  
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();
  console.log("user Layout: ", getUserInfo);
  
  function SidevarStatus() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  function RedirectLogin() {
    navigate("/login");
  }
  return (
    <>
      <div>
        {
          <>
            <Nav toggleFunc={SidevarStatus} />
            <div className={classes.contentContainer}>
              {status && <Sidevar />}
              <div className={classes.content}>{props.children}</div>
              <div>{getUserInfo}</div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Layout;
