import classes from "../../styles/CreateContact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faGlobe,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import LabelPicker from "../LabelPicker";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

export const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 60_000,
});

const initialValues = {
  title: "",
  email: "",
  phone: "",
  image: null,
  website: "",
  success:false,
  error:false
};

export default function CreateContact() {
  const [values, setValues] = useState(initialValues);
  // const [image, setImage] = useState(null)
  const history = useNavigate()

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

  const addContactInfo =  () => {
    
    let formData = new FormData()
    formData.append('title', values.title)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    if(values.image !== null)formData.append('image', values.image)

    // FormData.forEach((value, key) => {
    //   console.log("key %s: value %s", key, value);
    //   })
    // for(let data in formfield.entries()){
    //   console.log(data[0], ' -' , data[1]);
    // }
    // client.post("/api/contacts/", formfield, {
    //   headers: {
    //     // "content-type": "multipart/form-data",
    // },
    // }).then(response =>console.log("Success"))
    // .catch(error => console.log("Error"))
     axios({
      method: 'post',
      url:`${process.env.REACT_APP_API_URL}/api/contacts/`,
      data: formData
    }).then((response) => {
      console.log(response.data)
      history.push('/')
      values.success = true;
      values.error = false;
    }).catch((error) =>{
      values.error = true;
      values.success = false;
    })

  }

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
            <label for="avatarFilePickerInput">
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </button>
        </div>

        <div class={classes.nameSection}>
          <div class={classes.name}></div>
          <div class={classes.labelsSection}>
            <div class={classes.labels}></div>
            <LabelPicker />
          </div>
        </div>

        <div className={classes.actionSection}>
          <button className="editButton primary-button button"  onClick={addContactInfo} >Save</button>
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
