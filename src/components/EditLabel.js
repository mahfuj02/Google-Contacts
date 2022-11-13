import classes from "../styles/EditLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { updateRequest } from "../core/fetchers";
import { REST_API_ENDPOINTS } from "../core/routes";
import { useCookies } from "react-cookie";
import { useRefresh } from "../contexts/RefreshContext";
export default function EditLabel({ label }) {
  const [status, setStatus] = useState(false);
  const [labels, setLabels] = useState(label);
  const [cookie] = useCookies();
  const { onRefresh } = useRefresh();
  function ShowlabelDialog() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  function closeDialog() {
    if (status) {
      
      setStatus(false);
    }
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setLabels({
      ...labels,
      [name]: value,
    });
  };
  const updateLabelinfo = (e) => {
    e.preventDefault();
    updateRequest(
      `${REST_API_ENDPOINTS.labels}${labels.id}/`,
      labels,
      cookie.server_token
    ).then(() => {
      onRefresh();
    });
    closeDialog();
  };

  return (
    <>
      {/* <div className={classes.link} > */}
      <FontAwesomeIcon onClick={ShowlabelDialog} icon={faPencil} />
      {/* </div> */}
      {status && (
        <div id="labelEditorDialog" className={classes.dialog}>
          <div className={classes.dialogOverlay} onClick={closeDialog}></div>
          <form
            action=""
            onSubmit={updateLabelinfo}
            className={classes.dialogContentContainer}
          >
            <div className={classes.dialogTitle}>Edit Contact</div>
            <div className={classes.dialogContent}>
              <input
                type="text"
                placeholder="Type the label"
                value={labels.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className={classes.dialogFooter}>
              <button className={classes.cancelBtn} onClick={closeDialog}>
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
