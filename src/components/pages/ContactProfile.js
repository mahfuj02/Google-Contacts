import classes from "../../styles/ContactProfile.module.css";
import { Link, useParams } from "react-router-dom";

// import { useState } from "react";
import {
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import LabelPicker from "../LabelPicker";
import ContactProfileField from "../ContactProfileField";
import { useEffect, useState } from "react";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { getRequest, SwrRequest } from "../../core/fetchers";
export default function ContactProfile() {
  const [ContactProfile, setContactProfile] = useState("");

  const [cookie] = useCookies();
  const { id } = useParams();
  let lebelList = [];
  const fetchContactProfile = async () => {
    const profileData = await getRequest(
      `${REST_API_ENDPOINTS.contacts}${id}`,
      cookie.server_token
    );
    setContactProfile(profileData);
    console.log(ContactProfile);
  };
  useEffect(() => {
    fetchContactProfile();
  }, []);

  return (
    <>
      <div className={classes.contactHeader}>
        <div className="avatar">A</div>
        <div className={classes.nameSection}>
          <div className={classes.name}>{ContactProfile.title}</div>
          <div className={classes.labelsSection}>
            <div className={classes.labels}>
              {ContactProfile.label &&
                ContactProfile.label.map((label) => (
                  <div className={classes.label}>{label.title}</div>
                ))}
            </div>
            {/* <LabelPicker /> */}
          </div>
        </div>
        <div className={classes.actionSection}>
          <Link to={`/edit-person/${id}`} state={{contactInfo: ContactProfile}} >
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
            {ContactProfile.email}
          </ContactProfileField>
          <ContactProfileField icon={faPhone}>
            Phone: {ContactProfile.phone}
          </ContactProfileField>
          <ContactProfileField icon={faGlobe}>
            Website: https://www.google.com
          </ContactProfileField>
        </div>
      </div>
    </>
  );
}
