import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CreateLabel from "./CreateLabel";

import { useCookies } from "react-cookie";

export default function LabelPicker({
  addLabel,
  labelList,
  handleChange,
  updateDialogStatus,
  dialogStatus,
}) {
 
  const [submited, setSubmited] = useState(false);
  useEffect(() => {
  }, [labelList]);

  const LocalLabels = (id) => {
    if (labelList.includes(id)) {
      let labelIndex = labelList.indexOf(id);
      labelList.splice(labelIndex, 1);
    } else {
      labelList.push(id);
    }
    // setLocalLabel(labelList);
    // console.log("current LabelList: ", labelList," locallabel: ", localLabel)
  };

  const MultipleCaller = (e) => {
    setSubmited(true)
    e.stopPropagation();
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
