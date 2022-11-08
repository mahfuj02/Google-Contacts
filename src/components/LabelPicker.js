import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import CreateLabel from "./CreateLabel";

import { useCookies } from "react-cookie";

import { REST_API_ENDPOINTS } from "../core/routes";
import { getRequest } from "../core/fetchers";


export default function LabelPicker({addLabel, labelList}) {
  const [status, setStatus] = useState(false);
  const [labels, setLabels] = useState("");
  const [cookie] = useCookies();
  const ref = useRef(null);

  const fetchLabels = async () => {
    const fetchData = await getRequest(
      REST_API_ENDPOINTS.labels,
      cookie.server_token
    );
    setLabels(fetchData);
    console.log(labels)
  };

  useEffect(() => {
    fetchLabels();
  }, []);

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

  
  const LocalLabels = (id) => {
    console.log("id: ", id)
    if (labelList.includes(id)) {
      let labelIndex = labelList.indexOf(id);
      labelList.splice(labelIndex, 1);
      console.log("first values: ", labelList);
    } else {
      labelList.push(id);
    }
    console.log("labelLIst",labelList)
  };

  const MultipleCaller = (e) => {
    console.log("multipleCal: ",labelList)
    addLabel(labelList);
    labelList = [];
    closeDialog();
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
              {labels &&
                labels.map((label) => (
                  <div
                    className="label"
                    onClick={LocalLabels.bind(this, label.id)}
                    // onClick={() => labeList.push(label.id)}
                  >
                    <div className="iconSection">
                      <FontAwesomeIcon icon={faTag} />
                    </div>
                    <div className={classes.text}>{label.title}</div>
                    <div className={`"iconSection" ${classes.faCheck}`}>
                      {/* <FontAwesomeIcon  icon={faCheck} /> */}
                    </div>
                  </div>
                ))}
            </div>
            <div className={classes.dialogFooter}>
              <CreateLabel onClick={closeDialog} />
              <button onClick={MultipleCaller}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
