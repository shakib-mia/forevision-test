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
import { PlanContext } from "./contexts/PlanContext";
import "sweetalert2/src/sweetalert2.scss";
import Navbar from "./components/Navbar/Navbar";
import { checkTheDateIsBefore } from "./utils/checkTheDateIsBefore";
import Footer from "./components/Footer/Footer";

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
  const [recordLabels, setRecordLabels] = useState([]);
  const navigate = useNavigate();

  /* Working api calls starts here */

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          token,
        },
      };
      axios
        .get(backendUrl + "token-time", config)
        .then(({ data }) => setTokenDetails(data))
        .catch((err) => {
          console.log(err.response.data.name);
          if (err.response.data.name === "TokenExpiredError") {
            setToken("");
            sessionStorage.removeItem("token");
            toast.error("Token has expired", {
              position: "bottom-center",
            });
            navigate("/login");
          }
        });
      axios
        .get(backendUrl + "record-labels", config)
        .then(({ data }) => setRecordLabels(data));
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
    recordLabels,
    // timeStamp,
  };

  useEffect(() => {
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };

    if (token) {
      axios
        .get(backendUrl + `profile`, config)
        .then(({ data }) => {
          if (data?.data !== null) {
            // console.log(data.data);
            setUserData(data.data);
          } else {
            // navigate("/signup-details");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [token]);

  useEffect(() => {
    if (userData.emailId) {
      axios
        .get(backendUrl + "check-requested/" + userData.emailId)
        .then(({ data }) => setFoundRequested(data))
        .catch((error) => console.log(error));
    }
  }, [userData, refetch]);

  // console.log(location.search.split("?"));

  const [planStore, setPlanStore] = useState({
    planName: location.search?.split("?")[1],
    price: location.search?.split("?")[2],
  });

  /* Working api calls ends here */

  // console.log(store);

  return (
    <div className="bg-white w-screen h-screen">
      {/* <Construction /> */}
      <ProfileContext.Provider value={store}>
        <PlanContext.Provider value={{ planStore, setPlanStore }}>
          {token ? token.length && <BottomBar /> : <></>}
          {location.pathname !== "/login" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/forgot-password" &&
            location.pathname !== "/signup-details" &&
            !location.pathname.includes("payment") && (
              <>
                {store.token && <Sidebar />}
                {store.token && location.pathname !== "/profile" && <Navbar />}
              </>
            )}
          <Routes>
            {routes.map(({ page, path }, key) => (
              <Route key={key} path={path} element={page} />
            ))}
          </Routes>
          <ToastContainer />
        </PlanContext.Provider>
      </ProfileContext.Provider>

      <Footer />
    </div>
  );
}

export default App;
