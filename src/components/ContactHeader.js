import classes from "../styles/ContactHeader.module.css";

import LabelPicker from "./LabelPicker";

import { Link } from "react-router-dom";

export default function ContactHeader() {
  return (
    <div className={classes.contactHeader}>
      <div className="avatar">A</div>
      <div className={classes.nameSection}>
        <div className={classes.name}>Mahfuj Ahmed</div>
        <div className={classes.labelsSection}>
          <div className={classes.labels}>
            <div className={classes.label}>Label 1</div>
            <div className={classes.label}>Label 2</div>
            <div className={classes.label}>Label 3</div>
            <div className={classes.label}>Label 4</div>
          </div>
            <LabelPicker />
          
        </div>
      </div>
      <div className={classes.actionSection}>
       <Link to="/edit-person">  <button className="editButton primary-button button">Edit</button> </Link>
        <button className="deleteButton button">Delete</button>
      </div>
    </div>
  );
}
