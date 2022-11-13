import classes from "../../styles/CreateContact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
  faCamera,
  faL,
} from "@fortawesome/free-solid-svg-icons";

import { useCookies } from "react-cookie";
import LabelPicker from "../LabelPicker";
import { useEffect, useReducer, useState } from "react";
import { getRequest, updateRequest } from "../../core/fetchers";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRefresh } from "../../contexts/RefreshContext";
import _ from "lodash";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "label":
      action.value.forEach((label) => {
        label.chacked = false;
      });
      action.value.forEach((label) => {
        action.chackedLabel.forEach((chackedLabel) => {
          if (label.id === chackedLabel.id) {
            label.chacked = true;
          }
        });
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

export default function EditContact() {
  const [values, setValues] = useState(initialValues);
  const [labelList, setLabelList] = useState(0);
  const [currentLabel, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [cookie] = useCookies();
  const { id } = useParams();
  const navigate = useNavigate();
  const { onRefresh } = useRefresh();
  const [dialogStatus, setDialogStatus] = useState(false);

  function convertLabelObjectToArray(labels) {
    labels.map((label) => labelList.push(label.id));
  }
  const fetchLabels = async (label) => {
    const fetchData = await getRequest(
      REST_API_ENDPOINTS.labels,
      cookie.server_token
    );
    setLoading(true);
    dispatch({
      type: "label",
      value: fetchData,
      chackedLabel: label,
    });
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    const { contactInfo } = location.state;
    const labels = fetchLabels(contactInfo.label);

    if (!loading) {
      console.log(currentLabel, " ::..edit contact: ", contactInfo);
    }

    // dispatch({
    //   type:"label",
    //   value:labels

    // })
    // convertLabelObjectToArray(contactInfo.label);
    setValues({
      ...contactInfo,
      label: labelList,
    });

    // navigate(location.pathname, { replace: true });
  }, [dialogStatus]);

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
    values.label = labelList;
    labelList = [];
  };

  const updateContactInfo = () => {
    updateRequest(
      `${REST_API_ENDPOINTS.contacts}${id}/`,
      values,
      cookie.server_token
    ).then(() => {
      onRefresh();
      navigate(`/person/${id}/`);
    });
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

  // function ShowlabelDialog() {
  //   if (status) {
  //     setStatus(false);
  //   } else {
  //     setStatus(true);
  //   }
  // }

  const changeDialog = () => {
    console.log("this is called")
    setDialogStatus(!dialogStatus);
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
            {!loading && (
              <LabelPicker
                addLabel={addLabel}
                labelList={currentLabel}
                handleChange={handleLabelChange}
                updateDialogStatus={changeDialog}
                dialogStatus={dialogStatus}

                // updatedLabel={values.label}
              />
            )}
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
