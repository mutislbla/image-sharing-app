import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { LoginRoute } from "./utils/loginRoute";
import HomePage from "./pages/home";
import Register from "./pages/register";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import UserProfile from "./pages/userProfile";
import AddPost from "./pages/addPost";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />

          <Route
            path={"/homepage"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <HomePage />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/profile"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <Dashboard />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/profile/:id"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <UserProfile />
                </LoginRoute>
              </>
            }
          />
          <Route
            path={"/post/add"}
            element={
              <>
                <LoginRoute>
                  <Navbar />
                  <AddPost />
                </LoginRoute>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
