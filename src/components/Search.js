import classes from "../styles/Search.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
  return (
    <div className={classes.searchSection}>
      <div className={classes.searchContainer}>
        <button className={classes.searchButton}>
          <div>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </button>
        <input type="text" placeholder="Search" onkeyup="searchKeyUp(event)" />
        <button
          className={classes.clearSearchButton}
          onclick="clearSearchInput()"
        >
          <div>
            <FontAwesomeIcon icon={ faMagnifyingGlass } />
          </div>
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
