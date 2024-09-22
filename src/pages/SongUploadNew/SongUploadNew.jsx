import React, { useContext, useEffect, useState } from "react";
import SongUploadFormContainer from "../../components/SongUploadFormContainer/SongUploadFormContainer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SongUploadProgress from "../../components/SongUploadProgress/SongUploadProgress";
import { ProfileContext } from "../../contexts/ProfileContext";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { FaExclamation } from "react-icons/fa";
import { BsExclamationTriangle } from "react-icons/bs";
import TimerCircle from "../../components/TimerCircle/TimerCircle";
import axios from "axios";
import { backendUrl } from "../../constants";

const SongUploadNew = () => {
  // const [screen, setScreen] = useState("distribution");
  const [screen, setScreen] = useState("albumDetails");
  const location = useLocation();
  const { userData, token } = useContext(ProfileContext);
  const navigate = useNavigate();
  console.log(userData);
  // console.log(token);

  useEffect(() => {
    if (location.pathname.split("/")[1] !== "edit-song") {
      if (userData?.user_email) {
        // console.log(userData);
        if (userData.yearlyPlanEndDate) {
          if (checkTheDateIsBefore(userData.yearlyPlanEndDate)) {
            // navigate("/song-upload?yearly-plan?0");
            navigate("/album-upload");
          } else {
            // navigate("/plans");

            const AlertContent = () => (
              <div style={{ textAlign: "center" }}>
                {/* <div style={{ color: "#f39c12", fontSize: "2em" }}> */}
                <BsExclamationTriangle className="text-interactive-light-destructive mx-auto text-[5rem] mb-3" />
                {/* </div> */}
                <p>
                  Your yearly plan has expired. You will be redirected to the
                  plans page.
                </p>
                <TimerCircle />
              </div>
            );

            Swal.fire({
              title: ReactDOMServer.renderToString(<AlertContent />),
              timer: 5000,
              showConfirmButton: false,
              willClose: () => {
                navigate("/yearly-plan");
              },
            });
          }
        } else {
          // navigate("/plans");
          if (location.search.length === 0) {
            navigate("/plans");
          }
          // if(location.search)
        }
      }
    }
  }, [userData.user_email]);

  // if (!location.search.includes("?")) {
  //   return <Navigate to="/plans" state={{ from: location }} replace></Navigate>;
  // }

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   // console.log(location.pathname.split("/")[2]);
  //   axios
  //     .get(backendUrl + "songs/" + location.pathname.split("/")[2])
  //     .then(({ data }) => setData(data));
  // }, []);

  return (
    <div className="lg:ml-7 lg:pt-6 pt-2 px-1">
      {location.pathname.split("/")[1] !== "edit-song" && (
        <h4 className="text-heading-5-bold lg:text-heading-4-bold text-grey capitalize">
          Plan :{" "}
          {location.search.split("?")[1]?.includes("-")
            ? location.search.split("?")[1]?.split("-")?.join(" ")
            : location.search.split("?")[1]}
        </h4>
      )}

      <SongUploadProgress screen={screen} setScreen={setScreen} />

      <SongUploadFormContainer
        // data={data}
        screen={screen}
        setScreen={setScreen}
      />
    </div>
  );
};

export default SongUploadNew;
