import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CreateLabel from "./CreateLabel";

export default function LabelPicker({
  addLabel,
  labelList,
  handleChange,
  updateDialogStatus,
  dialogStatus,
}) {
  const [submited, setSubmited] = useState(false);
  useEffect(() => {}, [labelList]);


  const MultipleCaller = (e) => {
    e.stopPropagation();
    addLabel(labelList);
    setSubmited(true);

  };
  return (
    <>
      <div className={classes.labelsPickerButton} onClick={updateDialogStatus}>
        <FontAwesomeIcon icon={faTag} />
      </div>
      {dialogStatus && !submited && (
        <div className={classes.dialog} id="labelPickerDialog">
          <div
            className={classes.dialogOverlay}
            onClick={updateDialogStatus}
          ></div>

          <div className={classes.dialogContentContainer}>
            <div className={classes.dialogTitle}>Manage Labels</div>
            <div className={`dialogContent`}>
              {labelList &&
                labelList.map((label, index) => (
                  <div
                    className={`label`}
                    onClick={(e) => handleChange(label["chacked"], index)}
                  >
                    <div className="iconSection">
                      <FontAwesomeIcon icon={faTag} />
                    </div>
                    <div
                      className={classes.text}
                    >{`${label["title"]} ${label["id"]}`}</div>
                    <div className={`"iconSection" ${classes.faCheck}`}>
                      {label["chacked"] && <FontAwesomeIcon icon={faCheck} />}
                    </div>
                  </div>
                ))}
            </div>
            <div className={classes.dialogFooter}>
              <CreateLabel onClick={updateDialogStatus} />
              <button onClick={MultipleCaller}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
