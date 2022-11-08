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
import { useEffect, useState } from "react";
import { updateRequest } from "../../core/fetchers";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRefresh } from "../../contexts/RefreshContext";

const initialValues = {
  id: 0,
  title: "",
  email: "",
  phone: "",
  image: null,
  website: "",
  label: [],
  success: false,
  error: false,
};
let labelList = [];

export default function EditContact() {
  const [values, setValues] = useState(initialValues);
  const location = useLocation();
  const [cookie] = useCookies();
  const { id } = useParams();
  const navigate = useNavigate();
  const { onRefresh } = useRefresh();

  function convertLabelArray(labels) {
    labels.map((label) => labelList.push(label.id));
  }
  useEffect(() => {
    const { contactInfo } = location.state;
    convertLabelArray(contactInfo.label);
    setValues({
      ...contactInfo,
      label: labelList,
    });
  }, []);
  // const [image, setImage] = useState(null)
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

  const addLabel = (labelList) => {
    console.log("labelList to create Con: ", labelList);
    values.label = labelList;
    labelList = [];
    console.log("labelList to create Con for values: ", values.label);
  };

  const updateContactInfo = () => {
    updateRequest(
      `${REST_API_ENDPOINTS.contacts}${id}/`,
      values,
      cookie.server_token
    ).then(
      () => {
        onRefresh();
        navigate(`/person/${id}/`);
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
            <LabelPicker addLabel={addLabel} labelList={labelList} />
          </div>
        </div>

        <div className={classes.actionSection}>
          <button
            className="editButton primary-button button"
            onClick={updateContactInfo}
          >
            Update
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
