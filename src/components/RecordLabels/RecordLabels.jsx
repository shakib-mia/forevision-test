import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";

const RecordLabels = () => {
  const [labels, setLabels] = useState([]);
  const { token } = useContext(ProfileContext);

  //   console.log(token);

  useEffect(() => {
    const config = {
      headers: {
        token,
      },
    };

    axios
      .get(backendUrl + "record-labels", config)
      .then(({ data }) => setLabels(data));
  }, []);

  return (
    <div
      className={`w-full bg-grey-light rounded-2xl p-4 text-grey-dark relative overflow-y-auto`}
    >
      <h4 className="text-heading-4-bold">Record Labels</h4>
      <ul className="flex flex-col gap-1 mt-2">
        {labels.map((item, key) => (
          <li
            key={item}
            className={item.status === "Active" ? "opacity-100" : "opacity-50"}
          >
            {key + 1}. {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordLabels;
