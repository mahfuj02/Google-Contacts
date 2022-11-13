import classes from "../styles/Search.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {REST_API_ENDPOINTS} from "../core/routes"

export default function Search() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const toComponentHome = () => {
    console.log(value, " ...");

    navigate("/", {
      state: { params: `?search=${value}`},
    });
  };

  return (
    <div className={classes.searchSection}>
      <div className={classes.searchContainer}>
        <button onClick={toComponentHome} className={classes.searchButton}>
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </button>
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={() => {}}
        />
        <button className={classes.clearSearchButton}>
          <div>{/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}</div>
        </button>

        <div className={classes.suggestions}>
          <div className={classes.suggestion}>
            <div className={classes.avatar}>A</div>
            <div className={classes.name}>David James</div>
            <div>-</div>
            <div className={classes.email}>david@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
