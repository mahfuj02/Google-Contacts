// import Account from "./Account";
import Search from "./Search";
import classes from "../styles/Nav.module.css";
import logo from "../assets/images/userIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Nav = ({ toggleFunc }) => {
  const [cookie, removeCookie] = useCookies();
  const googleLogout = (response) => {
    removeCookie("user", { path: '/' });
    removeCookie("server_token",  {domain:'localhost:3000' , path: '/' });
  };

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
        >
          <img src={logo} alt="Contact" style={{ width: "40px" }} /> Contacts
        </Link>
      </div>
      <Search />

      {/* <Account /> */}

      {cookie.user ? (
        <div className={classes.actionSection}>
          <div className={classes.logotButton}>
            <Link to="/" onClick={googleLogout}>
              {" "}
              <FontAwesomeIcon icon={faSignOut} />
              {""}
            </Link>
            <span className={classes.username}>{cookie.user.username}</span>
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
