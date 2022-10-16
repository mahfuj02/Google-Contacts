import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classes from "../styles/Contact.module.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
export default function Contact(){
    return(
        <div onclick="window.location='/pages/contact.html'" class={`${classes.tableRow} ${classes.contactRow}`}>
        <div  className={classes.column}>
          {/* <div  className={classes.checkbox}>
            <input type="checkbox"  value="05" onChange="onCheckboxChange(event)" />
          </div> */}
          Mahfuj Ahmed
        </div>
        <div  className={classes.column}>mahfuj02@gmail.com</div>
        <div  className={classes.column}>0170000</div>
        <div  className={classes.column}>Friends </div>
        <div  className={classes.column} style={{width: "40px"}}>
          <div  className={classes.actionButtons}>
            <FontAwesomeIcon icon={faTrash} onClick="" />
          </div>
        </div>
      </div>

    )
}