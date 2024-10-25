import React, { useContext, useEffect, useRef, useState } from "react";
import RevenueDetailsItem from "../RevenueDetailsItem/RevenueDetailsItem";
import { IoMdDownload } from "react-icons/io";
import Button from "../Button/Button";
import generatePDF from "react-to-pdf";
import SongDetailsPdfPreview from "../SongDetailsPdfPreview/SongDetailsPdfPreview";
// import { jsonToExcel } from "../../utils/jsonToExcel";
import { ProfileContext } from "../../contexts/ProfileContext";
import { utils, write } from "xlsx";
import { jsonToExcel } from "../../utils/jsonToExcel";
import axios from "axios";
import { backendUrl } from "./../../constants";

const RevenueDetails = ({ setDetails, songs, details }) => {
  const detailsRef = useRef(null);
  const [preview, showPreview] = useState(false);
  const { userData } = useContext(ProfileContext);
  const [crbtCodes, setCrbtCodes] = useState([]);
  // console.log(userData);
  const items = songs
    .filter((song) => song.isrc === details)
    .sort((item1, item2) =>
      item1.platformName.localeCompare(item2.platformName)
    );

  // console.log({ songs, items });

  let groupedData = items.reduce((acc, cur) => {
    if (!acc[cur.platformName]) {
      acc[cur.platformName] = { ...cur, "final revenue": 0, total: 0 };
    }
    acc[cur.platformName]["final revenue"] += cur["final revenue"];
    acc[cur.platformName].total += cur.total;
    return acc;
  }, {});

  // Convert the groupedData object back to an array if needed
  let result = Object.values(groupedData);

  const options = [
    // "song_name",
    "platformName",
    // "album",
    // "track_artist",
    // "label",
    // "isrc",
    "total",
    // "after tds revenue",
    "final revenue",
  ];

  // console.log(result);

  const createPdf = async () => {
    // headerElement.style.display = "none";

    const pdf = await generatePDF(detailsRef, {
      filename: `Revenue_Details_of_${result[0].song_name}.pdf`,
      page: {
        // default is 'A4'
        format: "A4",
        // scale: 2,
        // format: "letter",
        // default is 'portrait'
        orientation: "portrait",
      },
    });

    showPreview(false);
    setDetails("");

    // console.log(pdf);
  };

  const convertToExcel = () => {
    // console.log(items);
    // const newItems = items.map(item => item.Views = item.total)
    const newItems = [];
    for (const item of items) {
      item.ISRC = item.isrc;
      item.Album = item.album;
      item["Song Name"] = item.song_name;
      item.Artist = item.track_artist;
      item.Label = item.label;
      item["Platform Name"] = item.platformName;
      item.Views = item.total;
      item.Revenue = item["after tds revenue"];
      item["Revenue After ForeVision Deduction"] = item["final revenue"];
      delete item.uploadDate;
      delete item.total;
      delete item["after tds revenue"];
      delete item["final revenue"];
      delete item.platformName;
      delete item.isrc;
      delete item.label;
      delete item.song_name;
      delete item.track_artist;
      delete item.date;
      delete item.album;

      newItems.push(item);
    }

    console.log(newItems);
    jsonToExcel(newItems, `Revenue_Details_of_${result[0].song_name}.xlsx`);
  };

  useEffect(() => {
    axios
      .get(backendUrl + `/crbt-codes/${result[0].isrc}`)
      .then(({ data }) => setCrbtCodes(data));
  }, [result[0], result[0].isrc]);

  return (
    <>
      <div
        className={`w-screen h-screen fixed top-0 left-0 z-[9999] flex justify-center items-center backdrop-blur-[1px] flex-col ${
          preview ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="w-11/12 xl:w-3/5 h-[80vh] relative overflow-x-visible rounded-2xl overflow-y-auto p-2 xl:p-3 xl:px-5"
          style={{ backgroundColor: "#ffffffd9" }}
        >
          <button
            onClick={() => setDetails("")}
            className="absolute text-interactive-light-destructive-focus text-heading-3 top-2 right-2 opacity-50"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z"
                fill="black"
              />
            </svg>
          </button>

          <div className="xl:ml-4 xl:mt-2">
            <p
              // style={{ fontSize: "37.9px", lineheight: "24px" }}
              className="xl:ml-3 xl:mb-3 text-heading-6-bold xl:text-heading-4-bold text-grey-dark my-1"
            >
              {result[0]?.song_name}
            </p>
            <p
              // style={{ fontSize: "37.9px", lineheight: "24px" }}
              className="text-heading-6-bold xl:text-heading-4-bold text-grey-dark xl:ml-3"
            >
              {result[0].isrc}
            </p>

            <ul className="flex flex-col gap-1 pl-3 mt-4 flex-wrap">
              {crbtCodes.length > 0 ? (
                crbtCodes.map((item) => (
                  <li key={item._id}>
                    <div className="flex gap-2">
                      <span>Bsnl (E): {item["Bsnl (E)"]}</span>
                      <span>Bsnl (S): {item["Bsnl (S)"]}</span>
                      <span>Idea: {item["Idea"]}</span>
                      <span>Vodafone: {item["Vodafone"]}</span>
                    </div>
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
          {/* //  list heading  */}
          <ul className="grid grid-cols-3 gap-3 mt-5 mb-2 text-subtitle-1 xl:text-heading-6-bold text-grey-dark items-center">
            {options.map((item, key) => (
              <li
                key={key}
                style={{ color: "#1B96FF" }}
                className={`${
                  item === "isrc" ? "uppercase" : "capitalize"
                } text-center`}
              >
                {item === "uploadTime"
                  ? "Month"
                  : item.includes("_")
                  ? item.split("_").join(" ")
                  : item === "final revenue"
                  ? "Revenue"
                  : item === "total"
                  ? "Total Stream"
                  : item === "platformName"
                  ? "Platform Name"
                  : item}
              </li>
            ))}
          </ul>

          {/* List */}
          <RevenueDetailsItem result={result} details={details} songs={songs} />
        </div>
        <div className="hidden lg:flex justify-center mt-2 gap-3">
          <Button
            containerClassName={"flex items-center"}
            // disabled={!loaded}
            onClick={() => showPreview(true)}
          >
            DOWNLOAD PDF <IoMdDownload className="text-paragraph-1" />
          </Button>

          <Button
            containerClassName={"flex items-center"}
            // disabled={!loaded}
            onClick={convertToExcel}
          >
            DOWNLOAD EXCEL <IoMdDownload className="text-paragraph-1" />
          </Button>
        </div>
      </div>
      {preview && (
        <SongDetailsPdfPreview
          setDetails={setDetails}
          details={details}
          songs={songs}
        />
      )}
    </>
  );
};

export default RevenueDetails;
