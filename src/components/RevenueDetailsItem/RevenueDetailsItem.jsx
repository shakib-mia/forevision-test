import React, { useState } from "react";
import MonthStreamCount from "../MonthStreamCount/MonthStreamCount";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const RevenueDetailsItem = ({ result, details, songs }) => {
  const [platform, setPlatform] = useState("");

  let songsByPlatform = [];
  songs.forEach((s) => {
    if (s.isrc === details && s.platformName === platform) {
      songsByPlatform.push(s);
    }
  });

  const songsByUniqueDate = [
    ...new Map(songsByPlatform.map((item) => [item["date"], item])).values(),
  ];

  let countByMonth = [];
  const check = songsByUniqueDate.forEach((s) => {
    let count = 0;
    let revenue = 0;
    songsByPlatform.forEach((songs) => {
      if (s.date === songs.date) {
        count = count + songs.total;
        revenue = revenue + songs["final revenue"];
      }
    });
    countByMonth.push({ count, date: s.date, revenue });
  });

  // console.log(result);

  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  return (
    <table className="w-full">
      {result.map((i) => (
        <MonthStreamCount songs={songs} details={details} i={i} />
      ))}

      {/* <div className="grid grid-cols-2 gap-2 items-center"> */}
      <ResponsiveContainer
        height={250}
        width={"100%"}
        className={"hidden lg:block"}
      >
        <AreaChart className="mb-5 mt-3" data={result}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2B52DD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2B52DD" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2B52DD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2B52DD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="platformName" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#2B52DD"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Legend
            content={
              <div className="text-center text-interactive-light-focus flex items-center gap-1 justify-center">
                <div className="w-1 h-1 bg-interactive-light-focus"></div> Views
              </div>
            }
          />
        </AreaChart>
      </ResponsiveContainer>

      <ResponsiveContainer
        height={250}
        width={"100%"}
        className={"hidden lg:block"}
      >
        <AreaChart
          data={result}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#41B658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#41B658" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#41B658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#41B658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="platformName" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="final revenue"
            // xAxis={}
            stroke="#41B658"
            fillOpacity={1}
            fill="url(#colorU)"
          />
          <Legend
            content={
              <div className="text-center text-interactive-light-confirmation-focus flex items-center gap-1 justify-center">
                <div className="w-1 h-1 bg-interactive-light-confirmation-focus"></div>{" "}
                Revenue
              </div>
            }
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* </div> */}
    </table>
  );
};

export default RevenueDetailsItem;
