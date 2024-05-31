import React from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const PlatformsChart = ({ revenueData, label }) => {
  //   console.log(revenueData);
  const labels = revenueData.map((item) => item.platform);
  const revenues = revenueData.map((item) => item.revenue || item.views);
  const backgroundColor = [
    "rgba(255, 99, 132, 0.6)", // Red
    "rgba(54, 162, 235, 0.6)", // Blue
    "rgba(255, 206, 86, 0.6)", // Yellow
    "rgba(75, 192, 192, 0.6)", // Green
    "rgba(153, 102, 255, 0.6)", // Purple
    "rgba(255, 159, 64, 0.6)", // Orange
    "rgba(255, 99, 71, 0.6)", // Tomato
    "rgba(255, 0, 255, 0.6)", // Magenta
    "rgba(0, 255, 255, 0.6)", // Cyan
    "rgba(255, 215, 0, 0.6)", // Gold
    "rgba(0, 128, 0, 0.6)", // DarkGreen
    "rgba(75, 0, 130, 0.6)", // Indigo
  ];
  const borderColor = backgroundColor.map((color) => color.replace("0.6", "1"));

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: revenues,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PlatformsChart;
