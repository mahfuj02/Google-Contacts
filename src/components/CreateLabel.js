import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function CreateLabel() {
  const [status, setStatus] = useState(false);
  function ShowlabelDialog() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
    console.log("status", status);
  }

  function closeDialog() {
    if (status) {
      setStatus(false);
    }
  }
  return (
    <>
      <div className={classes.link} onClick={ShowlabelDialog}>
        <div className={classes.content}>
          <FontAwesomeIcon icon={faPlus} />
          Create Label
        </div>
      </div>
      {status && (
        <div id="labelEditorDialog" className={classes.dialog}>
          <div className={classes.dialogOverlay} onClick={closeDialog}></div>
          <form action="" className={classes.dialogContentContainer}>
            <div className={classes.dialogTitle}>Create Contact</div>
            <div className={classes.dialogContent}>
              <input type="text" placeholder="Type the label" />
            </div>
            <div className={classes.dialogFooter}>
              <button className={classes.cancelBtn} onclick={closeDialog}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
