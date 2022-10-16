import Account from "./Account";
import Search from "./Search";
import classes from "../styles/Nav.module.css";
import logo from "../assets/images/userIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Nav({ toggleFunc }) {
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
      <Account />
    </div>
  );
}
