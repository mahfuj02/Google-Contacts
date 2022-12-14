/* eslint-disable react-hooks/exhaustive-deps */
import classes from "../styles/Sidevar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faUser,
  faChevronDown,
  faChevronUp,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CreateLabel from "./CreateLabel";
import EditLabel from "./EditLabel";
import { REST_API_ENDPOINTS } from "../core/routes";
import { getRequest } from "../core/fetchers";
import { useRefresh } from "../contexts/RefreshContext";
import Delete from "./Delete";

export default function Sidevar() {
  const levelRef = useRef();
  const [status, setStatus] = useState(false);
  const [labels, setLabels] = useState("");
  const [activateLabel, setActivateLabel] = useState(0)
  // const [needRefresh, setNeedRefresh] = useState(false);
  const { needRefresh } = useRefresh();
  const [cookie] = useCookies();
  const navigate = useNavigate();

  function dropDownLevel() {
    if (status) {
      setStatus(false);
      levelRef.current.style.display = "none";
    } else {
      setStatus(true);
      levelRef.current.style.display = "block";
    }
  }

  const fetchLabels = async () => {
    const fetchData = await getRequest(
      REST_API_ENDPOINTS.labels,
      cookie.server_token
    );
    setLabels(fetchData);
  };

  useEffect(() => {
    fetchLabels();
  }, [needRefresh]);

  // const refreshPage = () => {
  //   setNeedRefresh(!needRefresh);
  // };
  const handleLabelClick = (id) => {
      setActivateLabel(id);
  }
  const toComponentHome = (id) => {
    handleLabelClick(id)
    navigate("/", {
      state: {
        params: `?label__id=${id}`,
      },
    });
  };
  return (
    <>
      <div className={classes.sidebar}>
        <Link to="/new-contact" className={`${classes.createContactBtn} link`}>
          <svg width="30" height="30" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
          Create contact
        </Link>

        <div className={classes.links}>
          <Link to="/" className={`${classes.link} ${activateLabel===0?classes.active:''} link`} onClick={() =>{handleLabelClick(0)}} >
            <div className={classes.content}>
              <FontAwesomeIcon icon={faUser} /> Contacts
            </div>
            <div className={classes.counter}>500</div>
          </Link>
          <div className={classes.divider}></div>
          <div className={classes.dropdownSection}>
            <div className={classes.link} onClick={dropDownLevel}>
              <div className={classes.content}>
                {status ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
                Labels
              </div>
            </div>

            <div className={classes.dropdownContent} ref={levelRef}>
              {labels &&
                labels.map((label) => (
                  // http://127.0.0.1:8000/api/contacts/?label__id=10
                  <div
                    onClick={() => toComponentHome(label.id)}
                    key={label.id}
                    className={`${classes.link} ${label.id===activateLabel?classes.active:"" }`}
                  >
                    <div className={classes.content}>
                      <FontAwesomeIcon icon={faTag} /> {label.title}
                    </div>
                    <div className={classes.counter}>{label.contacts}</div>

                    <div className={classes.actions}>
                      <div className={classes.actionButton}>
                        {/* <FontAwesomeIcon icon={faPencil} /> */}
                        <EditLabel label={label} />
                      </div>
                      <div className={classes.actionButton}>
                        {/* <FontAwesomeIcon icon={faTrash} /> */}
                        <Delete
                          url={`${REST_API_ENDPOINTS.labels}${label.id}/`}
                          value={"Label"}
                          // onRefresh={refreshPage}
                        />
                      </div>
                    </div>
                  </div>
                ))}

              <CreateLabel />
            </div>
          </div>
          <div className={classes.divider}></div>
        </div>
      </div>
    </>
  );
}
