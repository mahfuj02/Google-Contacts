// import Account from "./Account";
import Search from "./Search";
import classes from "../styles/Nav.module.css";
import logo from "../assets/images/userIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const isAuthenticated = false;
const Nav = ({ toggleFunc}) => {

  const {logout} = useAuth()
  
  return (
    <div className={classes.header}>
      <div to="/" className={`${classes.logoSection} `}>
        <div className="iconSection">
          <FontAwesomeIcon
            className={classes.toggleIcon}
            icon={faBars}
            onClick={toggleFunc}
          />
        </div>
        <Link
          to="/"
          className={`${classes.logo} link`}
          onclick="window.location='/index.html'"
        >
          <img src={logo} alt="Contact" style={{ width: "40px" }} /> Contacts
        </Link>
      </div>
      <Search />

      {/* <Account /> */}

      {isAuthenticated ? (
        <div className={classes.actionSection}>
          <div className={classes.logotButton}>
            <Link to="/">
              {" "}
              <FontAwesomeIcon icon={faSignOut} />{" "}
            </Link>
          </div>
          {/* <img src={profile} alt="profile" /> */}
        </div>
      ) : (
        <div className={classes.actionSection}>
          <div className={classes.logotButton}>
            <Link className="nav-link" to="/login">
              Log In
            </Link>
          </div>
          {/* <img src={profile} alt="profile" /> */}
        </div>
      )}
    </div>
  );
};

export default Nav;
