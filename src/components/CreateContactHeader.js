import classes from "../styles/ContactHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCamera } from "@fortawesome/free-solid-svg-icons";
import LabelPicker from "./LabelPicker";
export default function CreateContactHeader() {
  return (
    <>
      <div className={classes.contactEditorHeader}>
        <div className={"avatar cameraIconButton"}>
          <FontAwesomeIcon className="fa fa-user" icon={faUser} />

          <button>
            <input
              type="file"
              id="avatarFilePickerInput"
              //   onChange="onFileChange(this.files)"
            />
            <label for="avatarFilePickerInput">
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </button>
        </div>

        <div class={classes.nameSection}>
          <div class={classes.name}></div>
          <div class={classes.labelsSection}>
            <div class={classes.labels}></div>
            <LabelPicker />
          </div>
        </div>

        <div className={classes.actionSection}>
          <button form="createcontactform" className="editButton primary-button button ">Save</button>
        </div>
      </div>
    </>
  );
}
