import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import ContactProfile from "./pages/ContactProfile";
import EditContact from "./pages/EditContact";
import Login from "./pages/Login";
// import Sidevar from "./Sidevar";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="385414291713-go7kf35ep3vv5ubgt5gg1446s1c1mig4.apps.googleusercontent.com">
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home></Home>} />
              <Route path="/new-contact" element={<CreateContact />} />
              <Route path="/person/:id" element={<ContactProfile />} />
              <Route path="/edit-person" element={<EditContact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
