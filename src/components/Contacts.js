import Contact from "./Contact";
import { Link } from "react-router-dom";
import classes from "../styles/Contacts.module.css";
import { useState, useEffect } from "react";
import { getRequest } from "../core/fetchers";
import { REST_API_ENDPOINTS } from "../core/routes";
import { useCookies } from "react-cookie";

export default function Contacts() {
  const [contacts, setContacts] = useState(null);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [cookie] = useCookies();
  
  const fetchContacts = async () => {
    const fetchData = await getRequest(
      REST_API_ENDPOINTS.contacts,
      cookie.server_token
    );
    setContacts(fetchData);
  };
  
  useEffect( () => {
    fetchContacts();
  }, [needRefresh]);

  const refreshPage = () => {
    setNeedRefresh(!needRefresh);
  };

  return (
    <div className={classes.tablebody}>
      {contacts &&
        contacts.map((contact) => (
          // <Link key={contact.id} className="link" to={"person/" + contact.id}>
            <Contact  contact={contact} onRefresh={refreshPage}></Contact>
          // </Link>
        ))}
    </div>
  );
}
