import { useState  } from "react";
import classes from "../styles/Layout.module.css";
import Nav from "./Nav";
import Sidevar from "./Sidevar";
export default function Layout({ children }) {
  const [status, setStatus] = useState(true);

  function SidevarStatus(){
    if(status){
      setStatus(false);
    }else{
      setStatus(true);
    }
  }
  return (
    <>
      <Nav toggleFunc={SidevarStatus} />
      <div className={classes.contentContainer}>
        {status? <Sidevar />:""}
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </>
  );
}
