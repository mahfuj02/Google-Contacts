import classes from "../styles/Sidevar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faChevronDown,
  faChevronUp,
  faTag,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import CreateLabel from "./CreateLabel";
export default function Sidevar() {
  const levelRef = useRef();
  const [status, setStatus] = useState(false);

  function dropDownLevel() {
    if (status) {
      setStatus(false);
      levelRef.current.style.display = "none";
    } else {
      setStatus(true);
      levelRef.current.style.display = "block";
    }
  }

  return (
    <>
      <div className={classes.sidebar}>
        <Link
          to="/new-contact"
          className={`${classes.createContactBtn} link`}
          onclick="window.location = '/pages/contact-editor.html'"
        >
          <svg width="30" height="30" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
          Create contact
        </Link>

        <div className={classes.links}>
          <Link to="/" className={`${classes.link} ${classes.active} link`}>
            <div className={classes.content}>
              <FontAwesomeIcon icon={faUser} /> Contacts
            </div>
            <div className={classes.counter}>500</div>
          </Link>
          <div className={classes.divider}></div>
          <div className={classes.dropdownSection}>
            <div className={classes.link} onClick={dropDownLevel}>
              <div className={classes.content}>
                {status ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
                Labels
              </div>
            </div>

            <div className={classes.dropdownContent} ref={levelRef}>
              <div className={classes.link}>
                <div className={classes.content}>
                  <FontAwesomeIcon icon={faTag} /> Label 1
                </div>
                <div className={classes.counter}>500</div>

                <div className={classes.actions}>
                  <div className={classes.actionButton}>
                    <FontAwesomeIcon icon={faPencil} />
                  </div>
                  <div className={classes.actionButton}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </div>
              <CreateLabel />
            </div>
          </div>
          <div className={classes.divider}></div>
        </div>
      </div>
    </>
  );
}
