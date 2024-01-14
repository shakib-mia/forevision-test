import { Route, Routes, useLocation } from "react-router-dom";
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
  // const navigate = useNavigate();

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

    if (token) {
      axios
        .get(`https://api.forevisiondigital.in/getUserData`, config)
        .then(({ data }) => {
          if (data.data !== null) {
            setUserData(data.data);
          } else {
            // navigate("/signup-details");
          }
        });
    }
  }, [token]);

  // if(userData._id === );

  return (
    <>
      <ProfileContext.Provider value={store}>
        {token?.length && <BottomBar />}
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
    </>
  );
}

export default App;
