import classes from "../styles/CreateContactContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";


import { useState } from "react";

const initialValues = {
  title: "",
  email: "",
  phone: "",
  website: "",
};

export default function CreateContactContent() {

  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e) => {
    e.preventDefault();
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };
    console.log("values,,,", values);

  return (
    <>
      <form id="createcontactform">
        <div className={classes.contactEditorContent}>
          <div className={classes.row}>
            <div className={classes.iconColumn}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={classes.inputColumn}>
            <input type="text" placeholder="Full Name" value={values.title} onChange={handleInputChange} name="title" /> 
            </div>
            {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
          </div>
          <div className={classes.row}>
            <div className={classes.iconColumn}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className={classes.inputColumn}>
            <input type="email" placeholder="Email" value={values.email} name="email" onChange={handleInputChange} /> 
            </div>
            {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
          </div>
          <div className={classes.row}>
            <div className={classes.iconColumn}>
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className={classes.inputColumn}>
            <input type="text" placeholder="Phone" value={values.phone} name="phone" onChange={handleInputChange} /> 
            </div>
            {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
          </div>
          <div className={classes.row}>
            <div className={classes.iconColumn}>
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <div className={classes.inputColumn}>
            <input type="text" placeholder="website" value={values.website} name="website" onChange={handleInputChange} /> 
            </div>
            {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
          </div>

        </div>
      </form>
    </>
  );
}
