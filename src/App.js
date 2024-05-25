import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import Construction from "./pages/Construction/Construction";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl, routes } from "./constants";
import BottomBar from "./components/BottomBar/BottomBar";
import { ProfileContext } from "./contexts/ProfileContext";
import { useEffect, useState } from "react";
import axios from "axios";
// import Construction from "./pages/Construction/Construction";

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
  const [tokenDetails, setTokenDetails] = useState({});
  const [foundRequested, setFoundRequested] = useState({});
  const [refetch, setRefetch] = useState(true);
  const navigate = useNavigate();

  /* Working api calls starts here */

  useEffect(() => {
    if (token) {
      axios
        .get(backendUrl + "token-time", {
          headers: {
            token,
          },
        })
        .then(({ data }) => setTokenDetails(data))
        .catch((err) => {
          if (err.response.data.name === "TokenExpiredError") {
            setToken("");
            sessionStorage.removeItem("token");
            toast.error("Token has expired", {
              position: "bottom-center",
            });
            navigate("/login");
          }
        });
    }
  }, [token]);

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
    tokenDetails,
    foundRequested,
    refetch,
    setRefetch,
    // timeStamp,
  };

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    if (token) {
      axios.get(backendUrl + `getUserData`, config).then(({ data }) => {
        if (data?.data !== null) {
          // console.log(data.data);
          setUserData(data.data);
        } else {
          // navigate("/signup-details");
        }
      });
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(backendUrl + "check-requested/" + userData.emailId)
      .then(({ data }) => setFoundRequested(data));
  }, [userData, refetch]);

  /* Working api calls ends here */

  return (
    <>
      {/* <Construction /> */}
      <ProfileContext.Provider value={store}>
        {token ? token.length && <BottomBar /> : <></>}
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
