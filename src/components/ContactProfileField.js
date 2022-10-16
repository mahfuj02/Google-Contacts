import classes from "../styles/ContactProfileField.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ContactProfileField({icon, children}) {
  return (
    <div className={classes.field}>
      <div className="iconContainer">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="value">
        {children}
      </div>
    </div>
  );
}
