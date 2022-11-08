import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../styles/Contact.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Delete from "./Delete";
import { REST_API_ENDPOINTS } from "../core/routes";
import { useNavigate } from "react-router-dom";
export default function Contact({ contact }) {
  const navigator = useNavigate();
  return (
    <div
      onClick={() => navigator(`person/${contact.id}/`)}
      className={`${classes.tableRow} ${classes.contactRow}`}
    >
      <div className={classes.column}>
        {/* <div  className={classes.checkbox}>
            <input type="checkbox"  value="05" onChange="onCheckboxChange(event)" />
          </div> */}
        {contact?.title}
      </div>
      <div className={classes.column}>{contact.email}</div>
      <div className={classes.column}>{contact.phone}</div>
      {/* <div className={classes.column}>{contact.label.title} </div> */}
      <div className={classes.column} style={{ width: "40px" }}>
        <div className={classes.actionButtons}>
          <Delete
            url={`${REST_API_ENDPOINTS.contacts}${contact.id}/`}
            value={"Contact"}
          />
          {/* <FontAwesomeIcon icon={faTrash} /> */}
        </div>
      </div>
    </div>
  );
}
