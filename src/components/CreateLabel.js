import classes from "../styles/CreateLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateLabel() {
  const [status, setStatus] = useState(false);
  const [label, setLabel] = useState("")
  const history = useNavigate()


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
  const addLabelinfo = async () => {
    let labelData = new FormData()
    labelData.append('title', label)

     await axios({
      method: 'post',
      url:`${process.env.REACT_APP_API_URL}/api/contacts/`,
      data: labelData
    }).then((response) => {
      console.log(response.data)
      history.push('/')
    }).catch((error) =>{
      console.log("error :", error)
    })
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
              <input type="text" placeholder="Type the label" onChange={(e) => setLabel(e.target.value)} />
            </div>
            <div className={classes.dialogFooter}>
              <button className={classes.cancelBtn} onclick={closeDialog}>
                Cancel
              </button>
              <button type="submit" onSubmit={addLabelinfo}>Save</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
