import Table from "../Table";
import Contacts from "../Contacts";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const location = useLocation();
  // const [url, setUrl] = useState(REST_API_ENDPOINTS.contacts)
  const filter = location.state;
  console.log("LabelFilter: ", filter);
  let url = REST_API_ENDPOINTS.contacts;
  if (filter) {
    console.log("onGOinggs...")
    // url.concat(filter.params);
    url = url + filter.params;
  }
  //  url = url + filter.params ;
  console.log("urls....", url);

  return (
    <>
      <Table />
      <Contacts url={url} />
    </>
  );
}
