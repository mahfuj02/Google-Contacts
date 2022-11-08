import Table from "../Table";
import Contacts from "../Contacts";
import { REST_API_ENDPOINTS } from "../../core/routes";
export default function Home({url}) {
  console.log("HOME URL: ", url);
  url = url?url:REST_API_ENDPOINTS.contacts
  console.log("HOME URL 2nd: ", url);
  return (
    <>  
      <Table />
      <Contacts url={url} />
    </>
  );
}
