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

  // console.log(userData);

  /* Working api calls starts here */

  useEffect(() => {
    if (token && location.pathname !== "/login") {
      const config = {
        headers: {
          token,
        },
      };
      axios
        .get(backendUrl + "token-time", config)
        .then(({ data }) => setTokenDetails(data))
        .catch((err) => {
          // console.log(err.response);
          if (err.response.status === 401) {
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
    if (userData.emailId) {
      axios
        .get(backendUrl + "check-requested/" + userData.emailId)
        .then(({ data }) => setFoundRequested(data));
    }
  }, [userData, refetch]);

  const [planStore, setPlanStore] = useState({
    planName: userData.yearlyPlanStartDate?.length
      ? "Yearly Plan"
      : location.search?.split("?")[1],
    price: userData.yearlyPlanStartDate
      ? 99900
      : location.search?.split("?")[2],
  });

  useEffect(() => {
    setPlanStore({
      planName: userData.yearlyPlanStartDate?.length
        ? "Yearly Plan"
        : location.search?.split("?")[1],
      price: userData.yearlyPlanStartDate
        ? 99900
        : location.search?.split("?")[2],
    });
  }, [userData]);

  /* Working api calls ends here */

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
                {<Navbar />}
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
    </div>
  );
}

export default App;
