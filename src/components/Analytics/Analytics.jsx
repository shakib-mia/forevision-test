import React, { useContext, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PlatformsChart from "../PlatformsChart/PlatformsChart";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
// import { Chart as ChartJS, ArcElement } from "chart.js";

const Analytics = ({ songData }) => {
  const [songs, setSongs] = useState([]);
  const [isrcs, setIsrcs] = useState([]);
  // console.log(so);
  // const songs = [];

  const revenueByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song["after tds revenue"];
    return acc;
  }, {});

  const viewsByPlatform = songs.reduce((acc, song) => {
    if (!acc[song.platformName]) {
      acc[song.platformName] = 0;
    }
    acc[song.platformName] += song.total;
    return acc;
  }, {});

  // const platformData = { revenueByPlatform, viewsByPlatform };

  // const { revenueByPlatform, viewsByPlatform } = platformData;

  const revenueArray = Object.entries(revenueByPlatform).map(
    ([platform, revenue]) => {
      return { platform, revenue };
    }
  );

  const viewsArray = Object.entries(viewsByPlatform).map(
    ([platform, views]) => {
      return { platform, views };
    }
  );

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
            // navigate("/login");
            setToken("");
            // toast.error("Token has expired", {
            //   position: "bottom-center",
            // });
          }
        });
    }
  }, [userData?.first_name, userData?.partner_name]);

  useEffect(() => {
    if (isrcs.length > 0) {
      // setBestSong("Loading...");
      // Show the loading toast
      // const loadingToast = toast.loading("Loading...", {
      //   position: "top-center",
      // });

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
                // setSongs([...songs, song]);

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
        // toast.dismiss(loadingToast);
        // Display the success toast
        // toast.success("Success", { position: "top-center" });
        const { aggregatedMusicData } = calculateAggregatedTotals(songs);

        const finalRevenueValues = aggregatedMusicData.map(
          (item) => item["Total Revenue Against ISRC"]
        );

        // Find the maximum value
        const maxFinalRevenue = Math.max(...finalRevenueValues);
        const maxRevenueEarner = aggregatedMusicData.find(
          (item) => item["Total Revenue Against ISRC"] === maxFinalRevenue
        );

        // setLoaded(true);
        // console.log(aggregatedMusicData);
        // setBestSong(maxRevenueEarner?.song_name);
      });
    } else {
      // setBestSong("No songs found");
    }
  }, [isrcs.length]);

  const calculateAggregatedTotals = (songs) => {
    const grand_total = {};
    const final_revenue = {};
    // console.log(songs);
    // const final_after_tds = {};
    // const total_lifetime_views = {};

    console.log(songs);

    songs?.forEach((music) => {
      const { isrc } = music;
      if (grand_total.hasOwnProperty(isrc)) {
        // console.log(music);
        grand_total[isrc] += parseFloat(music["final revenue"]);
      } else {
        grand_total[isrc] = parseFloat(music["final revenue"]);
      }

      // Calculate music_after_tds_revenue total
      // if (final_revenue.hasOwnProperty(isrc)) {
      //   final_after_tds[isrc] = parseFloat(final_after_tds[isrc])
      //     ? parseFloat(final_after_tds[isrc]) +
      //       parseFloat(music["after tds revenue"])
      //     : 0 + parseFloat(music["after tds revenue"]);
      //   total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc])
      //     ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music["total"])
      //     : 0 + parseFloat(music["total"]);
      // } else {
      //   final_after_tds[isrc] = parseFloat(final_after_tds[isrc])
      //     ? parseFloat(final_after_tds[isrc]) +
      //       parseFloat(music["after tds revenue"])
      //     : 0 + parseFloat(music["after tds revenue"]);
      //   total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc])
      //     ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music["total"])
      //     : 0 + parseFloat(music["total"]);
      // }
    });

    const aggregatedMusicData = Object.keys(grand_total).map((isrc) => ({
      isrc,
      ...songs.find((item) => item.isrc === isrc),
      "Total Revenue Against ISRC": grand_total[isrc],
      // "Total Views Against ISRC": total_lifetime_views[isrc],
    }));

    // console.log(grand_total);

    // const aggregatedRevenueTotal = Object.keys(final_revenue).map((isrc) => ({
    //   isrc,
    //   ...songs.find((item) => item.isrc === isrc),
    //   "after tds revenue": final_revenue[isrc],
    // }));

    return {
      aggregatedMusicData,
      // aggregatedRevenueTotal,
      // final_after_tds,
      // total_lifetime_views,
    };
  };

  const {
    aggregatedMusicData,
    // aggregatedRevenueTotal,
    // final_after_tds,
    // total_lifetime_views,
  } = calculateAggregatedTotals(songs);

  console.log(aggregatedMusicData);

  return (
    <div className="mt-3 px-1 2xl:px-6 py-1 2xl:py-4 rounded-[10px] overflow-auto">
      <div className="flex justify-between mt-6 mb-7 w-4/5 mx-auto">
        <div className="w-5/12">
          <PlatformsChart revenueData={revenueArray} label={"Revenue"} />
          <p className="uppercase text-center mt-3">
            Total Revenue By Platforms
          </p>
        </div>
        <div className="w-5/12">
          <PlatformsChart revenueData={viewsArray} label={"Views"} />
          <p className="uppercase text-center mt-3">Total Views By Platforms</p>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={aggregatedMusicData}>
            <XAxis dataKey="song_name" className="text-button" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total Revenue Against ISRC" fill="#2B52DD" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={aggregatedMusicData}>
            <XAxis dataKey="song_name" className="text-button" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total Views Against ISRC" fill="#2E844A" />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex gap-3 justify-center mt-5">
          <div className="flex gap-1 items-center">
            <div className="bg-[#8884d8] w-1 h-1"></div>
            <h5>Total Revenues</h5>
          </div>

          <div className="flex gap-1 items-center">
            <div className="bg-[#82ca9d] w-1 h-1"></div>
            <h5>Total Views</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
