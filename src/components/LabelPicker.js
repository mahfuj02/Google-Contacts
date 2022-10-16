import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CreateLabel from "./CreateLabel";
export default function LabelPicker() {
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
      <div className={classes.labelsPickerButton} onClick={ShowlabelDialog}>
        <FontAwesomeIcon icon={faTag} />
      </div>
      {status && (
        <div className={classes.dialog} id="labelPickerDialog">
          <div className={classes.dialogOverlay} onClick={closeDialog}></div>

          <div className={classes.dialogContentContainer}>
            <div className={classes.dialogTitle}>Manage Labels</div>
            <div className="dialogContent">
              <div
                className="label"
                onclick="closeDialog(this.closest('.dialog'))"
              >
                <div className="iconSection">
                  <FontAwesomeIcon icon={faTag} />
                </div>
                <div className={classes.text}>Label 1</div>
                <div className="iconSection">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>

              <div
                className="label"
                onclick="closeDialog(this.closest('.dialog'))"
              >
                <div className="iconSection">
                  <FontAwesomeIcon icon={faTag} />
                </div>
                <div className={classes.text}>Label 1</div>
                <div className="iconSection">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
            </div>
            <div className={classes.dialogFooter} >
              <CreateLabel onClick={closeDialog} />
              <button>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
