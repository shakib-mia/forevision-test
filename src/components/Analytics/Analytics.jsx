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

const Analytics = ({ songData, platformData }) => {
  const { userData } = useContext(ProfileContext);

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
  const { revenueByPlatform, viewByPlatform } = platformData;

  const revenueArray = Object.entries(revenueByPlatform).map(
    ([platform, revenue]) => {
      return { platform, revenue };
    }
  );

  console.log(revenueArray);
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00c49f",
    "#0088fe",
    "#ffbb28",
    "#ff6361",
    "#d0ed57",
    "#a4de6c",
    "#d0ed57",
    "#a4de6c",
  ];

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const data02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];

  // const COLORS = [
  //   '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00c49f', '#0088fe',
  //   '#ffbb28', '#ff6361', '#d0ed57', '#a4de6c', '#d0ed57', '#a4de6c'
  // ];

  return (
    <div className="mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto">
      {/* <ResponsiveContainer width={"100%"} height={300}> */}
      <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
      {/* </ResponsiveContainer> */}

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_revenue_against_isrc" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_views_against_isrc" fill="#82ca9d" />
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
