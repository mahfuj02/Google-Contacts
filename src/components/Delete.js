import classes from "../styles/DeleteLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { deleteRequest } from "../core/fetchers";
import { useCookies } from "react-cookie";
import { useRefresh } from "../contexts/RefreshContext";
export default function Delete({ url, value }) {
  const [status, setStatus] = useState(false);
  const [cookie] = useCookies();
  const { onRefresh } = useRefresh();

  function ShowlabelDialog() {
    if (status) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  function closeDialog(e) {
    e.stopPropagation();
    if (status) {
      setStatus(false);
    }
  }

  const deleteLabelinfo = (e) => {
    e.preventDefault();
    deleteRequest(url, cookie.server_token).then(() => {
      onRefresh();
    });
  };
  const multipleCaller = (e) => {
    deleteLabelinfo(e);
    closeDialog(e);
  };

  return (
    <>
      {/* <div className={classes.link} > */}

      <FontAwesomeIcon
        onClick={(e) => {
          e.stopPropagation();
          ShowlabelDialog();
        }}
        icon={faTrash}
      />
      {/* </div> */}
      {status && (
        <div id="labelEditorDialog" className={classes.dialog}>
          <div className={classes.dialogOverlay} onClick={closeDialog}></div>
          <form
            action=""
            // onSubmit={multipleCaller}
            className={classes.dialogContentContainer}
          >
            <div className={classes.dialogTitle}>Delete {value}?</div>
            <div className={classes.dialogContent}></div>
            <div className={classes.dialogFooter}>
              <button className={classes.cancelBtn} onClick={closeDialog}>
                Cancel
              </button>
              <button
                className={classes.deleteButton}
                type="submit"
                onClick={multipleCaller}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
