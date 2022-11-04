import Contact from "./Contact";
import { Link } from "react-router-dom";
import classes from '../styles/Contacts.module.css'
import { useState, useEffect } from "react";
export default function Contacts() {
  const [contacts, setContacts] = useState(null);

  // useEffect(() => {
  //   const fetchContacts = async () => {
  //     const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts/`);
  //     const data = await res.json();
  //     setContacts(data);
  //     //  console.log(data, "  contacts ", contacts);
  //   };
  //   fetchContacts();
  // }, [contacts]);
  console.log(contacts, "  contactss....")

  return (
    <div className={classes.tablebody}>
    
      { contacts && contacts.slice(0,20).map((contact) => (
        <Link className="link" to={'person/' + contact.id}>
          <Contact contact={contact}></Contact>
        </Link>
      ))}
    </div>
  );
}