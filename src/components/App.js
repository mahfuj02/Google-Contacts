import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import ContactProfile from "./pages/ContactProfile";
import EditContact from './pages/EditContact';
import Login from "./GoogleSocialAuth";
// import Sidevar from "./Sidevar";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/new-contact" element={<CreateContact />} />
          <Route path="/person/:id" element={<ContactProfile />} />
          <Route path="/edit-person" element={<EditContact />} />
          <Route path="/login" element={<Login />} />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
