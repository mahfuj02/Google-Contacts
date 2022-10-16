import FormInput from "./FormInput";
import classes from "../styles/FormRow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function FormRow({icon, type, placeholder, crossIcon }) {
  return (
    <div className={classes.row}>
      <div className={classes.iconColumn}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={classes.inputColumn}>
        <FormInput type={type} placeholder={placeholder} />
        {/* <input type="text" placeholder="Full Name" /> */}
      </div>
      <div
        className={classes.crossIconColumn}
      >
        <FontAwesomeIcon  icon={crossIcon} />
      </div>
    </div>
  );
}
