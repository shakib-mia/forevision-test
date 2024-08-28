import React, { useContext, useEffect, useState } from "react";
import SongUploadFormContainer from "../../components/SongUploadFormContainer/SongUploadFormContainer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SongUploadProgress from "../../components/SongUploadProgress/SongUploadProgress";
import { ProfileContext } from "../../contexts/ProfileContext";
import { checkTheDateIsBefore } from "../../utils/checkTheDateIsBefore";

const SongUploadNew = () => {
  const [screen, setScreen] = useState("albumDetails");
  const location = useLocation();
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      if (userData.yearlyPlanEndDate) {
        if (checkTheDateIsBefore(userData.yearlyPlanEndDate)) {
          navigate("/song-upload?yearly-plan?0");
        }
      }
    }
  }, []);

  if (!location.search.includes("?")) {
    return <Navigate to="/plans" state={{ from: location }} replace></Navigate>;
  }

  return (
    <div className="lg:ml-7 lg:pt-6 pt-2 px-1">
      <h4 className="text-heading-5-bold lg:text-heading-4-bold text-grey capitalize">
        Plan :{" "}
        {location.search.split("?")[1]?.includes("-")
          ? location.search.split("?")[1]?.split("-")?.join(" ")
          : location.search.split("?")[1]}
      </h4>

      <SongUploadProgress screen={screen} setScreen={setScreen} />

      <SongUploadFormContainer screen={screen} setScreen={setScreen} />
    </div>
  );
};

export default SongUploadNew;
