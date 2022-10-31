import classes from "../styles/ContactContent.module.css";
import ContactProfileField from "./ContactProfileField";
import {
  faEnvelope,
  faPhone,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactContent() {

 

  return (
    <div className={classes.contactContentContainer}>
      <div className={classes.contactContent}>
        <h6>Contact details</h6>
        <ContactProfileField icon={faEnvelope}>
          testing@mahfuj.com
        </ContactProfileField>
        <ContactProfileField icon={faPhone}>
          Phone: +123456789
        </ContactProfileField>
        <ContactProfileField icon={faGlobe}>
          Website: https://www.google.com
        </ContactProfileField>

      </div>
    </div>
  );
}
