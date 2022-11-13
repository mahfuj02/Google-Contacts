import classes from "../../styles/CreateContact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import { useCookies } from "react-cookie";
import LabelPicker from "../LabelPicker";
import { useEffect, useReducer, useState } from "react";
import { getRequest, postRequest } from "../../core/fetchers";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { useRefresh } from "../../contexts/RefreshContext";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "label":
      action.value.forEach((label) => {
        label.chacked = false;
      });
      return action.value;

    case "selected":
      const label = _.cloneDeep(state);
      label[action.labelID].chacked = action.value;

      return label;

    default:
      return state;
  }
};

const initialValues = {
  title: "",
  email: "",
  phone: "",
  image: null,
  website: "",
  label: [],
  success: false,
  error: false,
};

export default function CreateContact() {
  const [values, setValues] = useState(initialValues);
  const [cookie] = useCookies();
  const [currentLabel, dispatch] = useReducer(reducer, initialState);
  const { onRefresh } = useRefresh();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dialogStatus, setDialogStatus] = useState(false);
  // const [image, setImage] = useState(null)

  function convertLabelObjectToArray(labels) {
    let labelArray = [];
    labels.map((label) => {
      if (label["chacked"]) {
        labelArray.push(label.id);
      }
    });
    return labelArray;
  }
  const fetchLabels = async () => {
    const fetchData = await getRequest(
      REST_API_ENDPOINTS.labels,
      cookie.server_token
    );
    dispatch({
      type: "label",
      value: fetchData,
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchLabels();
  }, [dialogStatus]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (e.target.name === "image") {
      value = URL.createObjectURL(e.target.files[0]);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const addLabel = (labels) => {
    let labelArray = convertLabelObjectToArray(labels);
    console.log(labelArray, "recieved converted data..");
    setValues({
      ...values,
      label: labelArray,
    }); // setDialogStatus(!dialogStatus);
  };
  const changeDialog = () => {
    console.log("this is called");
    setDialogStatus(!dialogStatus);
  };

  const handleLabelChange = (isSelect, index) => {
    console.log("handle label change called....");
    setLoading(true);
    if (isSelect) {
      isSelect = false;
    } else {
      isSelect = true;
    }
    dispatch({
      type: "selected",
      labelID: index,
      value: isSelect,
    });
    setLoading(false);
  };

  const addContactInfo = () => {
    // let formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("email", values.email);
    // formData.append("phone", values.phone);
    // if (values.image !== null) formData.append("image", values.image);
    // console.log(cookie.server_token);
    // console.log("Form data: ", formData, " values: ", values)
    postRequest(REST_API_ENDPOINTS.contacts, values, cookie.server_token).then(
      () => {
        onRefresh();
        navigate("/");
      }
    );
  };

  return (
    <>
      <div className={classes.contactEditorHeader}>
        <div className={"avatar cameraIconButton"}>
          {values.image ? (
            <img className="fa fa-user" src={values.image} alt="img" />
          ) : (
            <FontAwesomeIcon className="fa fa-user" icon={faUser} />
          )}

          <button>
            <input
              type="file"
              id="avatarFilePickerInput"
              name="image"
              src={values.image}
              onChange={handleInputChange}
            />
            <label htmlFor="avatarFilePickerInput">
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </button>
        </div>

        <div className={classes.nameSection}>
          <div className={classes.name}></div>
          <div className={classes.labelsSection}>
            <div className={classes.labels}></div>
            <LabelPicker
              addLabel={addLabel}
              labelList={currentLabel}
              handleChange={handleLabelChange}
              updateDialogStatus={changeDialog}
              dialogStatus={dialogStatus}

              // updatedLabel={values.label}
            />{" "}
          </div>
        </div>

        <div className={classes.actionSection}>
          <button
            className="editButton primary-button button"
            onClick={addContactInfo}
          >
            Save
          </button>
        </div>
      </div>
      <div className={classes.contactEditorContent}>
        <div className={classes.row}>
          <div className={classes.iconColumn}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className={classes.inputColumn}>
            <input
              type="text"
              placeholder="Full Name"
              value={values.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
        </div>
        <div className={classes.row}>
          <div className={classes.iconColumn}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div className={classes.inputColumn}>
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
        </div>
        <div className={classes.row}>
          <div className={classes.iconColumn}>
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div className={classes.inputColumn}>
            <input
              type="text"
              placeholder="Phone"
              value={values.phone}
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
        </div>
        <div className={classes.row}>
          <div className={classes.iconColumn}>
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className={classes.inputColumn}>
            <input
              type="text"
              placeholder="website"
              value={values.website}
              name="website"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className={classes.crossIconColumn}>
              <FontAwesomeIcon icon={crossIcon} />
            </div> */}
        </div>
      </div>
    </>
  );
}
