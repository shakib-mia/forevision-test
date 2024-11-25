import React, { useContext, useEffect, useRef, useState } from "react";
import background from "../../assets/images/background.png";
import Button from "../../components/Button/Button";
import RevenueAnalytics from "../../components/RevenueAnalytics/RevenueAnalytics";
import axios from "axios";
import { SongsContext } from "./../../contexts/SongsContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import notFound from "../../assets/images/not-found.png";
// import rupee from "../../assets/icons/rupee.svg"
// import { useNavigate } from 'react-router-dom';
import { backendUrl } from "../../constants";
import RevenueDetails from "../../components/RevenueDetails/RevenueDetails";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Analytics from "../../components/Analytics/Analytics";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import Navbar from "../../components/Navbar/Navbar";
import { jsonToCsv } from "../../utils/jsonToCsv";
import * as XLSX from "xlsx";
import { IoMdDownload } from "react-icons/io";
import generatePDF, { usePDF } from "react-to-pdf";
import AccountBalance from "../../components/AccountBalance/AccountBalance";

const Revenue = () => {
  const [songs, setSongs] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isrcs, setIsrcs] = useState([]);
  const currentTime = new Date().getHours();
  const [details, setDetails] = useState("");
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [bestSong, setBestSong] = useState("Loading...");
  const [loaded, setLoaded] = useState(false);
  // const pdfBody = useRef(null);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [filterValue, setFilterValue] = useState("song_name");

  useEffect(() => {
    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [currentTime]);

  const { userData, token, setToken, foundRequested, dollarRate } =
    useContext(ProfileContext);
  // console.log(userData);
  useEffect(() => {
    if (userData?.first_name || userData?.partner_name) {
      const config = {
        headers: {
          token,
        },
      };
      axios
        .get(backendUrl + "user-revenue", config)
        .then(({ data }) => setIsrcs(data))
        .catch((error) => {
          // console.log(error);
          if (error.response.status === 401) {
            sessionStorage.removeItem("token");
            navigate("/login");
            setToken("");
            toast.error("Token has expired", {
              position: "bottom-center",
            });
          }
        });
    }
  }, [userData?.first_name, userData?.partner_name]);

  const calculateAggregatedTotals = (songs) => {
    const grand_total = {};
    const final_revenue = {};
    const final_after_tds = {};
    const total_lifetime_views = {};

    songs?.forEach((music) => {
      const { isrc } = music;
      if (grand_total.hasOwnProperty(isrc)) {
        // console.log(music);
        grand_total[isrc] += parseFloat(music["final revenue"]);
      } else {
        grand_total[isrc] = parseFloat(music["final revenue"]);
      }

      // Calculate music_after_tds_revenue total
      if (final_revenue.hasOwnProperty(isrc)) {
        final_after_tds[isrc] = parseFloat(final_after_tds[isrc])
          ? parseFloat(final_after_tds[isrc]) +
            parseFloat(music["after tds revenue"])
          : 0 + parseFloat(music["after tds revenue"]);
        total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc])
          ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music["total"])
          : 0 + parseFloat(music["total"]);
      } else {
        final_after_tds[isrc] = parseFloat(final_after_tds[isrc])
          ? parseFloat(final_after_tds[isrc]) +
            parseFloat(music["after tds revenue"])
          : 0 + parseFloat(music["after tds revenue"]);
        total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc])
          ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music["total"])
          : 0 + parseFloat(music["total"]);
      }
    });

    const aggregatedMusicData = Object.keys(grand_total).map((isrc) => ({
      isrc,
      ...songs.find((item) => item.isrc === isrc),
      "Total Revenue Against ISRC": grand_total[isrc],
      "Total Views Against ISRC": total_lifetime_views[isrc],
    }));

    // console.log(grand_total);

    const aggregatedRevenueTotal = Object.keys(final_revenue).map((isrc) => ({
      isrc,
      ...songs.find((item) => item.isrc === isrc),
      "after tds revenue": final_revenue[isrc],
    }));

    return {
      aggregatedMusicData,
      aggregatedRevenueTotal,
      final_after_tds,
      total_lifetime_views,
    };
  };
  // Example usage
  const {
    aggregatedMusicData,
    aggregatedRevenueTotal,
    final_after_tds,
    total_lifetime_views,
  } = calculateAggregatedTotals(songs);

  // console.log(total_lifetime_views);

  useEffect(() => {
    if (isrcs.length > 0) {
      setBestSong("Loading...");
      // Show the loading toast
      const loadingToast = toast.loading("Loading...", {
        position: "top-center",
      });

      // Array to store promises
      const promises = [];

      for (const [isrcIndex, item] of isrcs.entries()) {
        // Create a promise for each axios.get call
        const promise = axios
          .get(`https://api.forevisiondigital.in/user-revenue/${item}`)
          .then(({ data }) => {
            if (data) {
              data.revenues.forEach((song, index) => {
                songs.push(song);

                const isLastSong = index === data.revenues.length - 1;

                if (isLastSong && isrcIndex === isrcs.length - 1) {
                  // Resolve the promise when the last song is processed
                  return Promise.resolve();
                }
              });
            }
          })
          .catch((error) => {
            if (error.status === 401) {
              sessionStorage.removeItem("token");
              // navigate("/login");
            }
          });

        // Add the promise to the array
        promises.push(promise);
      }

      // Use Promise.all to wait for all promises to complete
      Promise.all(promises).then(() => {
        // Dismiss the loading toast after all promises are resolved
        toast.dismiss(loadingToast);
        // Display the success toast
        toast.success("Success", { position: "top-center" });
        const { aggregatedMusicData } = calculateAggregatedTotals(songs);

        const finalRevenueValues = aggregatedMusicData.map(
          (item) => item["Total Revenue Against ISRC"]
        );

        // Find the maximum value
        const maxFinalRevenue = Math.max(...finalRevenueValues);
        const maxRevenueEarner = aggregatedMusicData.find(
          (item) => item["Total Revenue Against ISRC"] === maxFinalRevenue
        );

        setLoaded(true);
        // console.log(aggregatedMusicData);
        setBestSong(maxRevenueEarner?.song_name);
      });
    } else {
      setBestSong("No songs found");
    }
  }, [isrcs.length]);

  // console.log(aggregatedMusicData);

  var totalView = 0;

  // Iterate through the values and sum them up
  for (const key in total_lifetime_views) {
    if (total_lifetime_views.hasOwnProperty(key)) {
      totalView += total_lifetime_views[key];
    }
  }

  // console.log(totalView);

  const mergedArray = aggregatedMusicData.map((item1) => {
    // Find the corresponding item in the second array
    const item2 = aggregatedRevenueTotal.find(
      (item) => item.music_isrc === item1.music_isrc
    );

    // Merge properties from both arrays
    return {
      ...item1,
      music_after_tds_revenue: item2 ? item2.music_after_tds_revenue : 0, // Use 0 if not found
    };
  });

  const filtered = mergedArray.filter((item) => item.music_isrc !== "21");

  /**
   *
   *
   *
   *
   * calculation of total for header
   *
   *
   *
   */

  // const calculateTotal = (fieldName) => {
  //   return aggregatedMusicData.reduce((accumulator, object) => {
  //     return accumulator + parseFloat(object[fieldName]);
  //   }, 0);
  // }

  // console.log(calculateTotal('finalRevenue'));
  // console.log(total);
  let totalFinalRevenue = 0;
  for (const entry of aggregatedMusicData) {
    // console.log(entry);
    if (!isNaN(entry["Total Revenue Against ISRC"])) {
      totalFinalRevenue += entry["Total Revenue Against ISRC"];
    }
    // totalTotal += entry["total"];
  }

  const [data, setData] = useState([
    {
      heading: "Total Uploads",
      data: isrcs.length,
    },
    {
      heading: "Best Upload",
      data: bestSong,
    },
    {
      heading: "Total revenue",
      data: totalFinalRevenue || 0,
    },
    {
      heading: "Total Views",
      data: totalView || 0,
    },
  ]);

  useEffect(() => {
    setData([
      {},
      {
        heading: "Best Upload",
        data: bestSong,
      },
      {
        heading: "Total revenue",
        data: totalFinalRevenue || 0,
      },
      {
        heading: "Total Views",
        data: totalView || 0,
      },
    ]);
    // }
  }, [totalFinalRevenue, totalView, bestSong, isrcs]);

  const options = [
    "song_name",
    "platformName",
    "album",
    "track_artist",
    "label",
    "isrc",
    "total",
    "after tds revenue",
    "Total Revenue Against ISRC",
  ];

  const options2 = [
    "song_name",
    // "platformName",
    "album",
    "track_artist",
    "label",
    "isrc",
    "total",
    "after tds revenue",
    "Total Revenue Against ISRC",
  ];

  const labels = [
    "Song Name",
    "Platform Name",
    "Album",
    "Artist",
    "Label",
    "ISRC",
    "View",
    "Revenue",
    "Revenue After ForeVision Deduction",
  ];

  const labels2 = [
    "Song Name",
    // "Platform Name",
    "Album",
    "Artist",
    "Label",
    "ISRC",
    "View",
    "Revenue",
    "Revenue After ForeVision Deduction",
  ];

  const phoneOptions = ["isrc", "song_name", "Total Revenue Against ISRC"];
  const phoneOptionsDetailsHeading = ["Platform Name", "Revenue"];
  const phoneOptionsDetails = ["platformName", "after tds revenue"];

  const items = songs
    .filter((song) => song.isrc === details)
    .sort((item1, item2) =>
      item1.platformName?.localeCompare(item2.platformName)
    );

  let groupedData = items.reduce((acc, cur) => {
    if (!acc[cur.platformName]) {
      acc[cur.platformName] = { ...cur, finalRevenue: 0, total: 0 };
    }
    acc[cur.platformName]["finalRevenue"] += cur["finalRevenue"];
    acc[cur.platformName].total += cur.total;
    return acc;
  }, {});

  // Convert the groupedData object back to an array if needed
  let result = Object.values(groupedData);
  // console.log(result);
  // console.log(songs);
  const revenueByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song["final revenue"];
    return acc;
  }, {});

  // console.log(revenueByPlatform);

  const viewsByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song.total;
    return acc;
  }, {});

  const platformData = { revenueByPlatform, viewsByPlatform };

  const getExcel = () => {
    aggregatedMusicData.map((item) => {
      item.Album = item.album;
      item.ISRC = item.isrc;
      item["Record Label"] = item.label;
      item.Song = item.song_name;
      item["Track Artist"] = item.track_artist;
    });
    aggregatedMusicData.map((item) => {
      delete item["after tds revenue"];
      delete item["final revenue"];
      delete item.platformName;
      delete item.uploadDate;
      delete item.date;
      delete item.total;
      delete item.album;
      delete item.isrc;
      delete item.label;
      delete item.song_name;
      delete item.track_artist;
    });

    // aggregatedMusicData;
    const worksheet = XLSX.utils.json_to_sheet(aggregatedMusicData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ForeVision Digital - Revenue Report of ${userData.first_name} ${userData.last_name}.xlsx`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createPdf = async () => {
    // headerElement.style.display = "none";

    const pdf = await generatePDF(targetRef, {
      filename: `ForeVision Digital - Revenue Report of ${userData.first_name} ${userData.last_name}.pdf`,
      page: {
        // default is 'A4'
        format: "A4",
        // scale: 2,
        // format: "letter",
        // default is 'portrait'
        orientation: "portrait",
      },
    });

    // pdf;
  };
  // console.log(aggregatedMusicData);

  const handleSortChange = (e) => {
    setFilterValue(e.target.value);
  };

  // console.log(agg);

  return (
    <SongsContext.Provider value={{ songs }}>
      <div
        className="bg-[size:100%] bg-no-repeat lg:!pt-6 xl:p-4 xl:!pt-7 xl:pl-7 mb-6 xl:mb-4"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-full w-full bg-white 2xl:bg-grey-dark px-2 2xl:px-[60px] pt-7 pb-5 rounded-[20px]">
          <div className="flex flex-col 2xl:flex-row gap-3 items-center 2xl:items-end">
            <div className="w-full 2xl:w-3/4">
              <h4 className="text-heading-4-bold text-grey-dark 2xl:text-white">
                {greeting} <br />
                {userData?.first_name ? (
                  <span className="text-interactive-light 2xl:text-white">
                    <u>{userData?.first_name ? userData?.first_name : <></>}</u>{" "}
                    {userData?.last_name ? userData?.last_name : <></>}!
                  </span>
                ) : (
                  <span className="text-interactive-light 2xl:text-white">
                    <u>
                      {userData?.partner_name ? (
                        userData?.partner_name?.split(" ")[0]
                      ) : (
                        <></>
                      )}
                    </u>{" "}
                    {userData?.partner_name ? (
                      userData?.partner_name.split(" ")[1]
                    ) : (
                      <></>
                    )}
                    !
                  </span>
                )}
              </h4>
              <div className="text-subtitle-1 text-interactive-dark-active 2xl:text-white tracking-[0.5px] mt-1">
                <p>
                  Welcome to your revenue dashboard, Let’s see how much you’ve
                  earned with us !
                </p>{" "}
                <p className="2xl:hidden text-interactive-light-destructive">
                  To see the detailed version of the dashboard, please log in
                  from a desktop.
                </p>
              </div>
              {/* {filtered.length > 0 && <> */}
              <div className="flex justify-between items-end">
                <div className="mt-4 hidden 2xl:flex flex-col justify-center items-center w-fit">
                  <h6 className="text-heading-6-bold text-white mb-1">
                    Revenue Analytics
                  </h6>
                  <Button
                    className="px-2 py-1"
                    disabled={
                      (
                        userData.lifetimeRevenue -
                        (userData.lifetimeDisbursed || 0)
                      ).toFixed(2) < 1000 ||
                      (foundRequested !== null && foundRequested._id)
                    }
                    onClick={() => navigate("/revenue-form")}
                    text="Request Withdraw"
                  />
                </div>
                <p className="text-subtitle-1 text-interactive-dark-destructive-active tracking-[0.5px] mt-1 italic">
                  * Updated Till May 2024
                </p>
              </div>

              <div className="mt-[32px] mb-3 2xl:mb-0 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                {/* {data.map((item, key) => <RevenueAnalytics {...item} id={key} key={key} />)} */}
                {
                  <RevenueAnalytics
                    heading={"Total Uploads"}
                    data={isrcs.length || 0}
                  />
                }
                {
                  <RevenueAnalytics
                    heading={data[1].heading}
                    data={data[1].data}
                  />
                }
                {
                  <RevenueAnalytics
                    heading={data[2].heading}
                    data={data[2].data}
                  />
                }
                {
                  <RevenueAnalytics
                    heading={data[3].heading}
                    data={data[3].data}
                  />
                }
              </div>
              {/* </>} */}
            </div>
            {filtered.length > 0 && (
              <div className="w-full xl:w-1/4 h-[29rem]">
                <AccountBalance />
              </div>
            )}
          </div>
          {/* {withdrawModal ? (
            <WithdrawModal setWithdrawModal={setWithdrawModal} />
          ) : (
            ""
          )} */}

          {/* PC VIEW */}
          {isrcs.length > 0 &&
            (filtered.length ? (
              <div className="relative">
                <FaChevronLeft
                  className="bg-transparent stroke-transparent text-heading-4 absolute -left-[50px] top-[75vh] cursor-pointer bottom-0 z-[99] text-white hidden xl:block"
                  onClick={() =>
                    document.getElementsByClassName("owl-prev")[0].click()
                  }
                />
                <FaChevronRight
                  className="bg-transparent stroke-transparent text-heading-4 absolute -right-5 top-[75vh] cursor-pointer bottom-0 z-[99] text-white hidden xl:block"
                  onClick={() =>
                    document.getElementsByClassName("owl-next")[0].click()
                  }
                />
                <OwlCarousel
                  className="w-full hidden 2xl:block"
                  items={1}
                  nav
                  id="revenue-slider"
                >
                  <div className="mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto">
                    <div className="flex justify-end items-center">
                      {/* <div className="hidden xl:block w-1/2">
                        <div className="flex gap-2 w-full">
                          <div className="flex gap-1 items-center w-full">
                            <p>Sort By:</p>
                            <div className="relative w-1/3 bg-white rounded">
                              <select
                                className="bg-white p-2 pr-8 rounded border focus:outline-none appearance-none w-full"
                                onChange={handleSortChange}
                              >
                                <option value={"song_name"} selected>
                                  Song Name
                                </option>
                                <option value={"label"}>Label</option>
                              </select>
                              <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <div className="flex flex-col lg:flex-row items-end gap-0 whitespace-nowrap">
                        <Button disabled={!loaded} onClick={getExcel}>
                          DOWNLOAD EXCEL
                          <IoMdDownload className="text-paragraph-1" />
                        </Button>
                        <Button
                          containerClassName={"flex items-center"}
                          disabled={!loaded}
                          onClick={createPdf}
                        >
                          DOWNLOAD PDF
                          <IoMdDownload className="text-paragraph-1" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <ul className="grid-cols-9 gap-3 sticky top-0 mb-2 hidden xl:grid">
                        {labels.map((item, key) => (
                          <li
                            key={"label-" + key}
                            className="capitalize text-center font-semibold"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>

                      <ul className="grid-cols-3 gap-3 sticky top-0 mb-2 grid xl:hidden">
                        {phoneOptions.map((item, key) => (
                          <li
                            key={"label-" + key}
                            className="capitalize text-center font-semibold"
                          >
                            {item.includes("_")
                              ? item.split("_").join(" ")
                              : item === "Total Revenue Against ISRC"
                              ? "Revenue After ForeVision Deduction"
                              : item}
                          </li>
                        ))}
                      </ul>

                      {aggregatedMusicData
                        .sort((a, b) =>
                          typeof a[filterValue] === "string"
                            ? a[filterValue].localeCompare(b[filterValue])
                            : a[filterValue] > b[filterValue]
                        )
                        .map((song, key) => (
                          <div key={key}>
                            <ul className="hidden xl:grid grid-cols-9 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
                              {/* list item */}
                              {options.map((item, key) => {
                                return (
                                  <li className="text-center" key={key}>
                                    {typeof song[item] === "number" &&
                                    song[item].toString().split(".").length >
                                      1 ? (
                                      item === "after tds revenue" ? (
                                        final_after_tds[song.isrc].toFixed(8)
                                      ) : (
                                        song[item].toFixed(8)
                                      )
                                    ) : item === "total" ? (
                                      total_lifetime_views[song.isrc]
                                    ) : item === "platformName" ? (
                                      <button
                                        onClick={() => setDetails(song.isrc)}
                                      >
                                        See Details
                                      </button>
                                    ) : (
                                      song[item]
                                    )}
                                  </li>
                                );
                              })}
                            </ul>

                            <ul className="xl:hidden grid grid-cols-3 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
                              {phoneOptions.map((item, key) => {
                                return (
                                  <li
                                    className="text-center"
                                    onClick={() => setDetails(song.isrc)}
                                    key={key}
                                  >
                                    {typeof song[item] === "number" &&
                                    song[item].toString().split(".").length >
                                      1 ? (
                                      item === "Total Revenue Against ISRC" ? (
                                        song[item].toFixed(3)
                                      ) : (
                                        song[item].toFixed(8)
                                      )
                                    ) : item === "total" ? (
                                      total_lifetime_views[song.isrc]
                                    ) : item === "platformName" ? (
                                      <button
                                        onClick={() => setDetails(song.isrc)}
                                      >
                                        See Details
                                      </button>
                                    ) : (
                                      song[item]
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                    </div>

                    {loaded && (
                      <div
                        className="mt-3 p-7 absolute -z-50 -top-7 left-0"
                        ref={targetRef}
                      >
                        <div className="flex items-center justify-between mb-6 text-grey-dark">
                          <aside>
                            <h3 className="text-heading-3-bold">
                              ForeVision Digital
                            </h3>
                            <h4 className="text-heading-4-bold">
                              Revenue Report
                            </h4>
                            <h5 className="text-heading-5-bold">
                              {userData.first_name} {userData.last_name}
                            </h5>
                          </aside>
                          <aside className="text-right w-2/12">
                            <p>
                              Date:{" "}
                              {new Date().getDate() < 10
                                ? "0" + new Date().getDate()
                                : new Date().getDate()}
                              /
                              {new Date().getMonth() + 1 < 10
                                ? "0" + (new Date().getMonth() + 1)
                                : new Date().getMonth()}
                              /{new Date().getFullYear()}
                            </p>
                            <p>
                              {userData.billing_address},{" "}
                              {userData.billing_city},{" "}
                              {userData.billing_country}
                            </p>

                            <p>{userData.postal_code}</p>
                          </aside>
                        </div>
                        <ul className="grid grid-cols-8 gap-0 sticky top-0 mb-2">
                          {labels2.map((item, key) => (
                            <li
                              key={"label-" + key}
                              className="capitalize text-center font-semibold"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>

                        {aggregatedMusicData
                          .sort((a, b) =>
                            typeof a[filterValue] === "string"
                              ? a[filterValue].localeCompare(b[filterValue])
                              : a[filterValue] > b[filterValue]
                          )
                          .map((song, key) => (
                            <ul
                              className="grid grid-cols-3 2xl:grid-cols-8 gap-0 text-grey-dark py-1 rounded-md mb-1"
                              key={key}
                            >
                              {/* list item */}
                              {options2.map((item, key) => {
                                return (
                                  <li
                                    className="text-center hidden 2xl:block"
                                    key={key}
                                  >
                                    {/* {console.log(song)} */}
                                    {typeof song[item] === "number" &&
                                    song[item].toString().split(".").length >
                                      1 ? (
                                      item === "after tds revenue" ? (
                                        final_after_tds[song.isrc].toFixed(8)
                                      ) : (
                                        song[item].toFixed(8)
                                      )
                                    ) : item === "total" ? (
                                      total_lifetime_views[song.isrc]
                                    ) : item === "platformName" ? (
                                      <button
                                        onClick={() => setDetails(song.isrc)}
                                      >
                                        See Details
                                      </button>
                                    ) : (
                                      song[item]
                                    )}
                                  </li>
                                );
                              })}

                              {phoneOptions.map((item, key) => {
                                return (
                                  <li
                                    className="text-center 2xl:hidden"
                                    key={key}
                                  >
                                    {/* {console.log(song)} */}
                                    {typeof song[item] === "number" &&
                                    song[item].toString().split(".").length >
                                      1 ? (
                                      item === "after tds revenue" ? (
                                        final_after_tds[song.isrc].toFixed(8)
                                      ) : (
                                        song[item].toFixed(8)
                                      )
                                    ) : item === "total" ? (
                                      total_lifetime_views[song.isrc]
                                    ) : item === "platformName" ? (
                                      <button
                                        onClick={() => setDetails(song.isrc)}
                                      >
                                        See Details
                                      </button>
                                    ) : (
                                      song[item]
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          ))}
                      </div>
                    )}
                  </div>

                  {window.innerWidth > 1000 && (
                    <Analytics
                      platformData={platformData}
                      songData={aggregatedMusicData}
                    />
                  )}
                </OwlCarousel>
              </div>
            ) : (
              <div className="w-full flex justify-center py-7">
                <VscLoading className="animate-spin text-secondary-light text-heading-1" />
              </div>
            ))}
          {/* details item modal */}
          {details?.length ? (
            <RevenueDetails
              setDetails={setDetails}
              options={options}
              songs={songs}
              details={details}
            />
          ) : (
            <></>
          )}

          {isrcs.length === 0 && (
            <div className="text-grey text-center 2xl:w-1/2 mx-auto 2xl:text-white 2xl:hidden">
              <img src={notFound} className="w-full 2xl:w-1/2 mx-auto" alt="" />
              <h6 className="text-heading-6-bold mb-2">
                Ooopps.. There is Nothing to show yet !! Upload your content and
                let it shine ! If you’ve uploaded already , let it perform in
                the various platforms .
              </h6>

              <h4 className="text-heading-4-bold">See you soon.</h4>
            </div>
          )}
        </div>
      </div>
    </SongsContext.Provider>
  );
};

export default Revenue;
