import { useState } from "react";
import classes from "../styles/Layout.module.css";
import Nav from "./Nav";
import Sidevar from "./Sidevar";
import React from "react";
import { useCookies } from "react-cookie";

const Layout = (props) => {
  // const navigate = useNavigate();
  const [cookie] = useCookies();

  const [status, setStatus] = useState(true);

  function SidevarStatus() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }
  return (
    <>
      <div>
        {
          <>
            <Nav toggleFunc={SidevarStatus} />
            <div className={classes.contentContainer}>
              {status && cookie.user && <Sidevar />}
              <div className={classes.content}>{props.children}</div>
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Layout;
