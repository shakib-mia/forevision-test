import React, { useContext, useEffect, useState } from "react";
import background from "../../assets/images/background.png";
import Button from "../../components/Button/Button";
import RevenueAnalytics from "../../components/RevenueAnalytics/RevenueAnalytics";
import balanceBG from "../../assets/images/balance-bg.svg";
import axios from "axios";
import { SongsContext } from "./../../contexts/SongsContext";
import { ProfileContext } from "../../contexts/ProfileContext";
import { toast } from "react-toastify";
import notFound from "../../assets/images/not-found.svg";
// import rupee from "../../assets/icons/rupee.svg"
// import { useNavigate } from 'react-router-dom';
import { backendUrl } from "../../constants";
import RevenueDetails from "../../components/RevenueDetails/RevenueDetails";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Analytics from "../../components/Analytics/Analytics";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

const Revenue = () => {
  const [songs, setSongs] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isrcs, setIsrcs] = useState([]);
  const currentTime = new Date().getHours();
  const [details, setDetails] = useState("");
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [bestSong, setBestSong] = useState("Loading...");

  useEffect(() => {
    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [currentTime]);

  const { userData, token, setToken, foundRequested } =
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
          .get(`${backendUrl}user-revenue/${item}`)
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

        // console.log(maxRevenueEarner);
        setBestSong(maxRevenueEarner.song_name);
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

  // console.log(calculateTotal('final revenue'));
  // console.log(total);
  let totalFinalRevenue = 0;
  for (const entry of aggregatedMusicData) {
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

  const phoneOptions = ["isrc", "song_name", "Total Revenue Against ISRC"];
  const phoneOptionsDetailsHeading = ["Platform Name", "Revenue"];
  const phoneOptionsDetails = ["platformName", "final revenue"];

  const items = songs
    .filter((song) => song.isrc === details)
    .sort((item1, item2) =>
      item1.platformName.localeCompare(item2.platformName)
    );

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

  const revenueByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song["final revenue"];
    return acc;
  }, {});

  const viewsByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song.total;
    return acc;
  }, {});

  const platformData = { revenueByPlatform, viewsByPlatform };

  return (
    <SongsContext.Provider value={{ songs }}>
      <div
        className="bg-[size:100%] bg-no-repeat xl:p-4 xl:pl-7 mb-6 xl:mb-0"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="h-full w-full bg-white 2xl:bg-grey-dark px-2 2xl:px-[60px] py-5 rounded-[20px]">
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
              <p className="text-subtitle-1 text-interactive-dark-active 2xl:text-white tracking-[0.5px] mt-1">
                Welcome to your revenue dashboard, Let’s see how much you’ve
                earned with us !{" "}
                <p className="2xl:hidden text-interactive-light-destructive">
                  To see the detailed version of the dashboard, please log in
                  from a desktop.
                </p>
              </p>
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
                  * Updated Till March, 2024
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
              <div
                className="w-full max-w-[21rem] 2xl:max-w-[24rem] ml-0 2xl:w-1/4 h-full 2xl:h-[380px] flex flex-col justify-between bg-grey-light 2xl:bg-white rounded-[24px] py-5 px-5 2xl:px-[38px] 2xl:py-[50px] bg-top bg-no-repeat 2xl:bg-contain"
                style={{ backgroundImage: `url(${balanceBG})` }}
              >
                <aside>
                  {/* <img
                    src={balanceBG}
                    className="absolute w-full h-auto left-0 top-0 z-0"
                    alt=""
                  /> */}
                  <h4 className="text-heading-4-bold text-white 2xl:text-grey relative">
                    Account <br className="2xl:hidden" /> Balance
                  </h4>
                  <h4 className="text-heading-4-bold text-grey mt-5 flex items-center gap-2 relative">
                    &#8377;{" "}
                    {Math.abs(
                      userData.lifetimeRevenue -
                        (userData.lifetimeDisbursed || 0)
                    ).toFixed(2)}
                  </h4>
                </aside>

                <div className="flex justify-center">
                  <Button
                    onClick={() => navigate("/revenue-form")}
                    disabled={
                      (
                        userData.lifetimeRevenue -
                        (userData.lifetimeDisbursed || 0)
                      ).toFixed(2) < 1000 ||
                      (foundRequested !== null && foundRequested._id)
                    }
                    text={"Request Withdraw"}
                  ></Button>
                </div>
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
              <div className="relative hidden 2xl:block">
                <FaChevronLeft
                  className="bg-transparent stroke-transparent text-heading-4 fixed left-[143px] top-[75vh] cursor-pointer bottom-0 z-[9999] text-white"
                  onClick={() =>
                    document.getElementsByClassName("owl-prev")[0].click()
                  }
                />
                <FaChevronRight
                  className="bg-transparent stroke-transparent text-heading-4 fixed right-5 top-[75vh] cursor-pointer bottom-0 z-[9999] text-white"
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
                    <ul className="grid grid-cols-9 gap-3 sticky top-0 mb-2">
                      {labels.map((item, key) => (
                        <li
                          key={"label-" + key}
                          className="capitalize text-center font-semibold"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    {aggregatedMusicData.map((song) => (
                      <ul className="grid grid-cols-9 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
                        {/* list item */}
                        {options.map((item) => {
                          return (
                            <li className="text-center">
                              {typeof song[item] === "number" &&
                              song[item].toString().split(".").length > 1 ? (
                                item === "after tds revenue" ? (
                                  final_after_tds[song.isrc].toFixed(8)
                                ) : (
                                  song[item].toFixed(8)
                                )
                              ) : item === "total" ? (
                                total_lifetime_views[song.isrc]
                              ) : item === "platformName" ? (
                                <button onClick={() => setDetails(song.isrc)}>
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

                  <Analytics
                    platformData={platformData}
                    songData={aggregatedMusicData}
                  />
                </OwlCarousel>
              </div>
            ) : (
              <div className="w-full flex justify-center py-7">
                <VscLoading className="animate-spin text-secondary-light text-heading-1" />
              </div>
            ))}
          {/* details item modal */}
          {details.length ? (
            <RevenueDetails
              setDetails={setDetails}
              options={options}
              songs={songs}
              details={details}
            />
          ) : (
            <></>
          )}

          {isrcs.length > 0 ? (
            <div className="2xl:hidden bg-grey-light p-2 rounded-[20px] mt-5">
              {filtered.length > 0 ? (
                <>
                  <div className="border border-primary-light rounded-full px-3 text-primary-light py-1 grid grid-cols-3 relative">
                    {phoneOptions.map((item, key) => (
                      <p
                        className={`text-paragraph-2 ${
                          key === 0
                            ? "text-left"
                            : key === 1
                            ? "text-center"
                            : "text-right"
                        } font-medium capitalize`}
                      >
                        {item.includes("_")
                          ? item.split("_").join(" ")
                          : item.split("_").join(" ")}
                      </p>
                    ))}
                    {/* <p className="text-paragraph-2 font-medium text-center">Song Name</p> */}
                    {/* <label className="text-paragraph-2 text-center font-medium flex items-center justify-center capitalize">{phoneData.split("_").join(" ")} <img src={chevron} className={`transition ${showOptions ? 'rotate-180' : 'rotate-0'}`} alt="chevron" /> <input className="hidden" type="checkbox" onChange={e => setShowOptions(e.target.checked)} /></label>
              {showOptions && <div className='w-fit h-[250px] overflow-y-auto flex flex-col items-center absolute left-0 right-0 m-auto bg-white top-[100%] shadow z-[9999]'>
                {options.map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center px-3 py-1' onClick={() => {
                  setShowOptions(false)
                  setPhoneData(item)
                }}>{item.split("_").join(" ")}</h6>)}
              </div>} */}
                    {/* <p className="text-paragraph-2 text-right font-medium">Final Revenue</p> */}
                  </div>

                  {aggregatedMusicData.map((song) => (
                    <ul className="grid grid-cols-3 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
                      {/* list item */}
                      {phoneOptions.map((item) => {
                        return (
                          <li
                            className="text-center"
                            onClick={() => setDetails(song.isrc)}
                          >
                            {typeof song[item] === "number" &&
                            song[item].toString().split(".").length > 1 ? (
                              item === "after tds revenue" ? (
                                final_after_tds[song.isrc].toFixed(8)
                              ) : (
                                song[item].toFixed(2)
                              )
                            ) : item === "total" ? (
                              total_lifetime_views[song.isrc]
                            ) : item === "platformName" ? (
                              <button
                                className="underline hover:no-underline"
                                onClick={() =>
                                  toast.error("This Feature is Coming Soon", {
                                    position: "bottom-center",
                                  })
                                }
                              >
                                See Details
                              </button>
                            ) : (
                              // ? <button onClick={() => handleExpand(song.isrc)}>See Details</button>
                              song[item]
                            )}
                          </li>
                        );
                      })}
                      {/* details item */}
                      {details && (
                        <div className="w-screen h-screen bg-[#00000011] shadow-xl fixed top-0 left-0 z-[9999] flex justify-center items-center">
                          <div className="w-5/6 h-[80vh] bg-white relative overflow-x-visible rounded-2xl overflow-y-auto p-3">
                            <button
                              onClick={() => setDetails("")}
                              className="sticky text-interactive-light-destructive-focus text-heading-3 top-0"
                            >
                              &times;
                            </button>
                            {/* //  list heading  */}
                            <ul className="grid grid-cols-2 gap-3">
                              {phoneOptionsDetailsHeading.map((item, key) => (
                                <li
                                  key={key}
                                  className="capitalize text-center"
                                >
                                  {item === "uploadTime"
                                    ? "Month"
                                    : item.includes("_")
                                    ? item.split("_").join(" ")
                                    : item}
                                </li>
                              ))}
                            </ul>

                            {/* //list  */}
                            {result.map((song2) => (
                              <ul className="grid grid-cols-2 justify-between">
                                {/* // list item  */}
                                {phoneOptionsDetails.map((item) => (
                                  <li className="text-center">
                                    {item === "final revenue"
                                      ? song2[item].toFixed(4)
                                      : song2[item]}
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        </div>
                      )}
                    </ul>
                  ))}
                  {/* {<img src={chevron} onClick={() => item === 8 ? setItem(songs.length - 1) : setItem(8)} className={`mx-auto ${item !== 8 ? 'rotate-180' : 'rotate-0'}`} alt="" />} */}
                </>
              ) : (
                <div className="text-center">
                  <VscLoading className="animate-spin text-secondary-light text-heading-1" />
                </div>
              )}
            </div>
          ) : (
            <div className="text-grey text-center 2xl:w-1/2 mx-auto 2xl:text-white">
              <img src={notFound} className="w-full 2xl:w-1/2 mx-auto" alt="" />
              <h6 className="text-heading-6-bold mb-2">
                Ooopps.. There is Nothing to show yet !! Upload your content and
                let it shine ! If you’ve uploaded already , let it perform in
                the various platforms .
              </h6>

              <h4 className="text-heading-4-bold">See you soon.</h4>
            </div>
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
