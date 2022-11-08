import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import CreateContact from "./pages/CreateContact";
import ContactProfile from "./pages/ContactProfile";
import EditContact from "./pages/EditContact";
import Login from "./pages/Login";
import PrivateRoute from "../core/PrivateRoute";
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="385414291713-go7kf35ep3vv5ubgt5gg1446s1c1mig4.apps.googleusercontent.com">
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      {" "}
                      <Home />{" "}
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/new-contact"
                  element={
                    <PrivateRoute>
                      {" "}
                      <CreateContact />{" "}
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/person/:id"
                  element={
                    <PrivateRoute>
                      {" "}
                      <ContactProfile />{" "}
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-person/:id"
                  element={
                    <PrivateRoute>
                      {" "}
                      <EditContact />{" "}
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
              </Routes>
            </Layout>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
