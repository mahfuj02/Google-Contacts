import classes from "../../styles/ContactProfile.module.css";
import { Link, useParams } from "react-router-dom";

// import { useState } from "react";
import {
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import LabelPicker from "../LabelPicker";
import ContactProfileField from "../ContactProfileField";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ContactProfile() {
  const [contact, setContact] = useState("");
  const { id } = useParams();

  const singleContact = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/contacts/${id}`
    );
    setContact(data);
  };

  useEffect(() => {
    singleContact();
  }, []);

  return (
    <>
      <div className={classes.contactHeader}>
        <div className="avatar">A</div>
        <div className={classes.nameSection}>
          <div className={classes.name}>{contact.title}</div>
          <div className={classes.labelsSection}>
            <div className={classes.labels}>
              {contact.label &&
                contact.label.map((label) => (
                  <div className={classes.label}>{label.title}</div>
                ))}
            </div>
            <LabelPicker />
          </div>
        </div>
        <div className={classes.actionSection}>
          <Link to="/edit-person">
            {" "}
            <button className="editButton primary-button button">
              Edit
            </button>{" "}
          </Link>
          <button className="deleteButton button">Delete</button>
        </div>
      </div>
      <div className={classes.contactContentContainer}>
        <div className={classes.contactContent}>
          <h6>Contact details</h6>
          <ContactProfileField icon={faEnvelope}>
            {/* testing@mahfuj.com */}
            {contact.email}
          </ContactProfileField>
          <ContactProfileField icon={faPhone}>
            Phone: {contact.phone}
          </ContactProfileField>
          <ContactProfileField icon={faGlobe}>
            Website: https://www.google.com
          </ContactProfileField>
        </div>
      </div>
    </>
  );
}
