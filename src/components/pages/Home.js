import Table from "../Table";
import Contacts from "../Contacts";
import { REST_API_ENDPOINTS } from "../../core/routes";
import { useLocation } from "react-router-dom";
export default function Home() {
  const location = useLocation();
  // const [url, setUrl] = useState(REST_API_ENDPOINTS.contacts)
  const filter = location.state;
  let url = REST_API_ENDPOINTS.contacts;
  if (filter) {
    // url.concat(filter.params);
    url = url + filter.params;
  }

  return (
    <>
      <Table />
      <Contacts url={url} />
    </>
  );
}
