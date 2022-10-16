import classes from "../styles/Account.module.css";
import profile from "../assets/images/profilePhoto.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'
export default function Account() {
  return (
    <div className={classes.actionSection}>
      <div className={classes.logotButton}>
      <FontAwesomeIcon icon={faSignOut} />
        {/* <i className={SearchOutlinedIcon} aria-hidden="true"></i> */}
      </div>
      <img src={profile} alt="profile" />
    </div>
  );
}
