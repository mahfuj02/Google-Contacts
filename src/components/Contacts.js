import Contact from "./Contact";
import classes from "../styles/Contacts.module.css";
import { useState, useEffect } from "react";
import { getRequest, SwrRequest } from "../core/fetchers";
import { useRefresh } from "../contexts/RefreshContext";
import { useCookies } from "react-cookie";

export default function Contacts({ url }) {
  const [contacts, setContacts] = useState(null);
  const [cookie] = useCookies();
  const { needRefresh } = useRefresh();

  const fetchContacts = async () => {
    const fetchData = await getRequest(url, cookie.server_token);
    setContacts(fetchData);
    console.log(contacts)
  };

  useEffect(() => {
    fetchContacts();
  }, [needRefresh, url]);

  return (
    <div className={classes.tablebody}>
      {contacts &&
        contacts.map((contact) => (
          <Contact key={contact.id} contact={contact}></Contact>
        ))}
    </div>
  );
}
