import React, { useContext } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  LineChart,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ProfileContext } from "../../contexts/ProfileContext";
import { Line, Pie } from "react-chartjs-2";
import PlatformsChart from "../PlatformsChart/PlatformsChart";
// import { Chart as ChartJS, ArcElement } from "chart.js";

const Analytics = ({ songData, platformData }) => {
  const { userData } = useContext(ProfileContext);
  // ChartJS.register(ArcElement, Tooltip, Legend);

  // const chartData = {
  //   labels: platforms,
  //   datasets: [
  //     {
  //       label: "Revenue",
  //       data: revenues,
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.6)",
  //         "rgba(54, 162, 235, 0.6)",
  //         "rgba(255, 206, 86, 0.6)",
  //         "rgba(75, 192, 192, 0.6)",
  //         "rgba(153, 102, 255, 0.6)",
  //         "rgba(255, 159, 64, 0.6)",
  //         "rgba(199, 199, 199, 0.6)",
  //         "rgba(83, 102, 255, 0.6)",
  //         "rgba(75, 159, 64, 0.6)",
  //         "rgba(255, 206, 132, 0.6)",
  //         "rgba(54, 99, 235, 0.6)",
  //         "rgba(255, 99, 64, 0.6)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //         "rgba(199, 199, 199, 1)",
  //         "rgba(83, 102, 255, 1)",
  //         "rgba(75, 159, 64, 1)",
  //         "rgba(255, 206, 132, 1)",
  //         "rgba(54, 99, 235, 1)",
  //         "rgba(255, 99, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Revenue by Platform",
  //     },
  //   },
  // };

  // console.log(platformData);
  const { revenueByPlatform, viewsByPlatform } = platformData;

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

  // const viewArra
  // console.log(viewsArray);

  // const COLORS = [
  //   '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f', '#0088fe',
  //   '#ffbb28', '#ff6361', '#d0ed57', '#a4de6c', '#d0ed57', '#a4de6c'
  // ];

  // console.log(revenueArray);

  return (
    <div className="mt-3 px-1 2xl:px-6 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto">
      {/* <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={revenueArray}>
          <XAxis dataKey="platform" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2B52DD" />
        </BarChart>
      </ResponsiveContainer> */}
      <div className="flex justify-between mt-6 mb-7">
        <div className="w-5/12">
          <PlatformsChart revenueData={revenueArray} label={"Revenue"} />
        </div>
        <div className="w-5/12">
          <PlatformsChart revenueData={viewsArray} label={"Views"} />
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Total Revenue Against ISRC" fill="#2B52DD" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
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
  );
};

export default Analytics;
