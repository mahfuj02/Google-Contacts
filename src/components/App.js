import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import ContactProfile from "./pages/ContactProfile";
import EditContact from './pages/EditContact'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-contact" element={<CreateContact />} />
          <Route path="/person" element={<ContactProfile />} />
          <Route path="/edit-person" element={<EditContact />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
