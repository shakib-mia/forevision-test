import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useNavigate } from "react-router-dom";

const RecordLabels = () => {
  const [labels, setLabels] = useState([]);
  const { token } = useContext(ProfileContext);
  const navigate = useNavigate();

  //   console.log(token);

  useEffect(() => {
    const config = {
      headers: {
        token,
      },
    };

    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setLabels(data))
      .catch((err) => navigate("/login"));
  }, []);

  return (
    <div
      className={`w-full bg-grey-light rounded-2xl p-4 pt-0 text-grey-dark relative overflow-y-auto h-[500px]`}
    >
      <h4 className="text-heading-4-bold sticky top-0 pt-4 pb-2 left-0 bg-grey-light z-10">
        Record Labels
      </h4>
      <ul className="flex flex-col gap-1">
        {labels.map((item, key) => (
          <li
            key={item}
            className={item.status === "Active" ? "opacity-100" : "opacity-50"}
          >
            {key + 1}. {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordLabels;
