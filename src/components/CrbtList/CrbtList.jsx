import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

const CrbtList = () => {
  const [crbts, setCrbts] = useState([]);
  const { token } = useContext(ProfileContext);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  useEffect(() => {
    axios
      .get(backendUrl + "crbt-codes/user", {
        headers: {
          token,
        },
      })
      .then(({ data }) => setCrbts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Song</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISRC</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {crbts.map((song, index) => (
            <React.Fragment key={song._id}>
              {/* Table Row */}
              <tr
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleAccordion(song._id)}
              >
                <td className="px-4 py-2">{song.Song}</td>
                <td className="px-4 py-2">{song.ISRC}</td>
                {/* <td className="px-4 py-2">
                  <button
                    onClick={() => toggleAccordion(song._id)}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                  >
                    {openAccordion === song._id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </td> */}
              </tr>

              {/* Accordion Row */}
              {
                <tr>
                  <td colSpan="5" className="px-4 bg-gray-50">
                    <div
                      className={`transition-all duration-700 overflow-hidden ${
                        openAccordion === song._id ? "h-[250px] py-4" : "h-0"
                      }`}
                    >
                      <p>
                        <span className="font-semibold">ISRC:</span> {song.ISRC}
                      </p>
                      <p>
                        <span className="font-semibold">Label:</span>{" "}
                        {song["Label Name"]}
                      </p>
                      <div className="mt-2">
                        <h4 className="font-semibold">Codes:</h4>
                        <ul className="list-disc ml-5">
                          <li>BSNL (E): {song["Bsnl (E)"]}</li>
                          <li>BSNL (S): {song["Bsnl (S)"]}</li>
                          <li>Idea: {song.Idea}</li>
                          <li>Vodafone: {song.Vodafone}</li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              }
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrbtList;
