import React from "react";
import {
  Bar,
  BarChart,
  // Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = ({ songData }) => {
  console.log(songData);

  return (
    <div className="mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto">
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="total_revenue_against_isrc" fill="#8884d8" />
          {/* <Bar dataKey="total_views_against_isrc" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={songData}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="song_name" className="text-button" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="total_revenue_against_isrc" fill="#8884d8" /> */}
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
