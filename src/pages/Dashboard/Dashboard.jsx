import React, { useState } from "react";
import bg from "./../../assets/images/dashboard-bg.webp";
import tinyArrow from "./../../assets/icons/tiny-arrow.webp";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import profile from "./../../assets/icons/navbar/profile-picture.webp";
import Button from "../../components/Button/Button";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
// import { CountUp } from "react-countup/build/CountUp";

const Dashboard = () => {
  const navigate = useNavigate();
  const [listenCount, setListenCount] = useState("5234");
  const [revenueCount, setRevenueCount] = useState("1025");
  const [recentUpdates, setRecentUpdates] = useState([
    "“User name” followed you",
    "“User name” followed you",
    "“User name” followed you",
    "“User name” followed you",
    "“User name” followed you",
    "“User name” followed you",
    "“User name” followed you",
  ]);

  const updates = [
    {
      status: "success",
      text: "Your song “________________________________” is now streaming",
    },
    {
      status: "warning",
      text: "Your song “________________________________” is taken down from “jio saavn” for copyright issue",
    },
    {
      status: "success",
      text: "Your revenue withdrawal request is submitted successfully",
    },
  ];

  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
    // {
    //   name: "Page G",
    //   // uv: 3490,
    // },
    // {
    //   name: "Page H",
    //   // uv: 3490,
    // },
    // {
    //   name: "Page I",
    //   // uv: 3490,
    // },
    // {
    //   name: "Page J",
    //   // uv: 3490,
    // },
    // {},
    // {},
    // {},
    // {},
    // {},
    // {},
  ];

  return (
    <div
      className="h-screen w-screen bg-no-repeat bg-cover px-[100px] py-6 overflow-x-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex gap-5">
        <div className="w-2/3">
          <div className="flex gap-5">
            <div className="card w-1/2">
              <h5 className="text-subtitle-2 text-primary relative inline tracking-[1.5px] font-semibold">
                TOTAL STREAM
                <div className="absolute -right-1 -top-[4px]">
                  <img src={tinyArrow} alt="" />
                </div>
              </h5>

              <h1 className="text-heading-1">
                <CountUp
                  end={listenCount}
                  separator=""
                  duration={2}
                />
              </h1>
              <p className="text-subtitle-1">People Listened</p>
            </div>
            <div className="card w-1/2">
              <h5 className="text-subtitle-2 text-primary relative inline tracking-[1.5px] font-semibold">
                REVENUE
                <div className="absolute -right-1 -top-[4px]">
                  <img src={tinyArrow} alt="" />
                </div>
              </h5>
              <h1 className="text-heading-1">
                &#8377;
                <CountUp end={revenueCount} separator="" duration={2} />
              </h1>
              <p className="text-subtitle-1">Revenue Collected</p>
            </div>
          </div>
          <div className="w-full card mt-[40px] h-[46%] overflow-hidden">
            <h5 className="text-subtitle-2 text-primary relative inline tracking-[1.5px] font-semibold">
              MONTHLY REPORT
              <div className="absolute -right-1 -top-[4px]">
                <img src={tinyArrow} alt="" />
              </div>
            </h5>

            <ResponsiveContainer className="w-fit" height="100%" id="chart">
              <BarChart
                width="150px"
                height="40px"
                data={data}
                barSize={32}
                // barCategoryGap={10}
                barGap={0}
              >
                <Bar dataKey="uv" fill="#064088" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-1/3 bg-white shadow-lg p-3 h-fit">
          <h2 className="text-subtitle-1 text-primary font-semibold mb-2">
            YOUR PROFILE
          </h2>
          <div className="flex items-center gap-[10px]">
            <div className="inline-block relative">
              <img src={profile} alt="" />
              <div className="w-1 h-1 bg-success rounded-full absolute bottom-[2.5px] right-[1.5px]"></div>
            </div>

            <h2 className="text-subtitle-1 mt-2">1025 Followers</h2>
          </div>

          <ul className="mt-3">
            {recentUpdates.map((item, key) => (
              <li key={key} className="text-subtitle-1 mb-1">
                {item}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <div className="mt-3 inline-block mx-auto">
              <Button
                text="GO TO PROFILE"
                onClick={() => navigate("/profile")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-5">
        <h2 className="text-subtitle-1 text-primary font-semibold mb-2">
          UPDATES
        </h2>

        {updates.map(({ text, status }, key) => (
          <div className="flex gap-2 items-center my-3" key={key}>
            <div
              className={`w-1 h-1 ${status === "success" && "bg-interactive-dark-confirmation"
                } ${status === "warning" && "bg-interactive-light-destructive-focus"
                } rounded-full`}
            ></div>
            <h5 className="text-paragraph-2">{text}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
