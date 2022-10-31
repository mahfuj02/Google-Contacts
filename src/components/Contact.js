import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../styles/Contact.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Contact({contact}) {
  return (
    <div
      onClick="window.location='/pages/contact.html'"
      class={`${classes.tableRow} ${classes.contactRow}`}
    >
      <div className={classes.column}>
        {/* <div  className={classes.checkbox}>
            <input type="checkbox"  value="05" onChange="onCheckboxChange(event)" />
          </div> */}
        {contact?.title}
      </div>
      <div className={classes.column}>{contact.email}</div>
      <div className={classes.column}>{contact.phone}</div>
      <div className={classes.column}>{contact.label} </div>
      <div className={classes.column} style={{ width: "40px" }}>
        <div className={classes.actionButtons}>
          <FontAwesomeIcon icon={faTrash} onClick="" />
        </div>
      </div>
    </div>
  );
}
