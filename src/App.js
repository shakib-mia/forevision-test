import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./constants";
import BottomBar from "./components/BottomBar/BottomBar";
import Navbar from "./components/Navbar/Navbar";
import { ProfileContext } from "./contexts/ProfileContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [prevRoute, setPrevRoute] = useState("");
  const location = useLocation();
  const [profileData, setProfileData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  const store = {
    userData,
    setUserData,
    prevRoute,
    setPrevRoute,
    profileData,
    setProfileData,
    token,
    setToken,
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token") || token,
      },
    };

    if (userData.ID) {
      axios
        .get(
          `https://adztronaut.com/music/admin/api/getUserDataById/${userData.ID}`,
          config
        )
        .then(({ data }) => setProfileData(data.data && data.data[0]));
    }
  }, [userData.ID, token]);

  return (
    <ProfileContext.Provider value={store}>
      {/* {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/" &&
        location.pathname !== "/forgot-password" &&
        !location.pathname.includes("/profile") &&
        location.pathname !== "/revenue" &&
        location.pathname !== "/signup-details" && <Navbar />} */}
      <BottomBar />
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/signup-details" && <Sidebar />}
      <Routes>
        {routes.map(({ page, path }, key) => (
          <Route key={key} path={path} element={page} />
        ))}
      </Routes>

      <ToastContainer />
    </ProfileContext.Provider>
  );
}

export default App;
