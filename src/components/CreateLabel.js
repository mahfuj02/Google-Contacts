import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { postRequest } from "../core/fetchers";
import { REST_API_ENDPOINTS } from "../core/routes";
import { useCookies } from "react-cookie";
import { useRefresh } from "../contexts/RefreshContext";
const initialValues = {
  title: "",
  success: false,
  error: false,
};

export default function CreateLabel() {
  const [status, setStatus] = useState(false);
  const [labels, setLabels] = useState(initialValues);
  const [cookie] = useCookies();
  const {onRefresh} = useRefresh()

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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setLabels({
      ...labels,
      [name]: value,
    });
    console.log("labels: ", labels);
  };
  const addLabelinfo = (e) => {
    e.preventDefault();

    postRequest(REST_API_ENDPOINTS.labels, labels, cookie.server_token).then(
      () => {
        onRefresh();
      }
    );
    closeDialog();
  };

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
          <form
            action=""
            onSubmit={addLabelinfo}
            className={classes.dialogContentContainer}
          >
            <div className={classes.dialogTitle}>Create Contact</div>
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
