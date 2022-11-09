import Contact from "./Contact";
import classes from "../styles/Contacts.module.css";
import { useState, useEffect } from "react";
import { getRequest } from "../core/fetchers";
import { useRefresh } from "../contexts/RefreshContext";
import { useCookies } from "react-cookie";

export default function Contacts({ url }) {
  const [contacts, setContacts] = useState(null);
  const [cookie] = useCookies();
  const { needRefresh } = useRefresh();

  const fetchContacts = async () => {
    console.log("fecth conts url: ",url)
    const fetchData = await getRequest(url, cookie.server_token);
    setContacts(fetchData);
    console.log(contacts)
  };

  useEffect(() => {
    fetchContacts();
    console.log("chnage urll...");
  }, [needRefresh, url]);

  return (
    <div className={classes.tablebody}>
      {contacts &&
        contacts.map((contact) => (
          // <Link key={contact.id} className="link" to={"person/" + contact.id}>
          <Contact contact={contact}></Contact>
          // </Link>
        ))}
    </div>
  );
}
