import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routes } from "./constants";
import BottomBar from "./components/BottomBar/BottomBar";
import { ProfileContext } from "./contexts/ProfileContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});
  // const [userData, setUserData] = useState(
  //   JSON.parse(sessionStorage.getItem("user")) || {}
  // );
  const [prevRoute, setPrevRoute] = useState("");
  const location = useLocation();
  const [profileData, setProfileData] = useState({});
  const [uId, setUId] = useState("");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  const store = {
    userData,
    setUserData,
    prevRoute,
    setPrevRoute,
    profileData,
    setProfileData,
    token,
    setToken,
    uId,
    setUId,
  };

  // console.log(userData);

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    axios
      .get(`https://forevision-digital.onrender.com/getUserData`, config)
      .then(({ data }) => {
        if (data.data !== null) {
          setUserData(data.data);
        }
        // if (location.pathname === "/" && data.length === 0) {
        // navigate("/signup-details");
        // }
      });
  }, [token]);

  // if(userData._id === );

  return (
    <ProfileContext.Provider value={store}>
      {/* {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/" &&
        location.pathname !== "/forgot-password" &&
        !location.pathname.includes("/profile") &&
        location.pathname !== "/revenue" &&
        location.pathname !== "/signup-details" && <Navbar />} */}
      {token && <BottomBar />}
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
