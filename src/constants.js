import home from "./assets/icons/navbar/home.webp";
import dashboard from "./assets/icons/navbar/layout.webp";
import layer from "./assets/icons/navbar/layers.webp";
import tasks from "./assets/icons/navbar/checkbox.webp";
import reports from "./assets/icons/navbar/pie-chart.webp";
import plans from "./assets/icons/navbar/tag.webp";
import Home from "./pages/Home/Home";
// import RequireAuth from "./RequireAuth";
// import Dashboard from "./pages/Dashboard/Dashboard";
import ProfileVerification from "./pages/ProfileVerification/ProfileVerification";
import YoutubeOac from "./pages/YoutubeOac/YoutubeOac";
import YoutubeClaimRelease from "./pages/YoutubeClaimRelease/YoutubeClaimRelease";
import PromotionalTool from "./pages/PromotionalTool/PromotionalTool";
import VideoDistribution from "./pages/VideoDistribution/VideoDistribution";
import LinkFacebookAndInstagramProfile from "./pages/LinkFacebookAndInstagramProfile/LinkFacebookAndInstagramProfile";
import FbInstaWhitelisting from "./pages/FbInstaWhitelisting/FbInstaWhitelisting";
import YoutubeVideoTakedown from "./pages/YoutubeVideoTakedown/YoutubeVideoTakedown";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import SignupDetails from "./pages/SignupDetails/SignupDetails";
import OngoingProjects from "./pages/OngoingProjects/OngoingProjects";
import PreviousProjects from "./pages/PreviousProjects/PreviousProjects";
import Profile from "./pages/Profile/Profile";
import Revenue from "./pages/Revenue/Revenue";

export const navItem = [
  {
    icon: home,
    text: "Home",
    path: "/",
  },
  {
    icon: dashboard,
    text: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: layer,
    text: "Projects",
    // path: "/projects",
    dropdownItem: [
      {
        text: "Ongoing",
        dropdownPath: "/projects/ongoing",
      },
      {
        text: "Previous",
        dropdownPath: "/projects/previous",
      },
    ],
  },
  {
    icon: tasks,
    text: "Tasks",
    path: "/tasks",
  },
  {
    icon: reports,
    text: "Reports",
    path: "/reports",
  },
  {
    icon: plans,
    text: "Plans",
    // path: "/plans",
    dropdownItem: [
      {
        text: "item 1",
        dropdownPath: "/plans/1",
      },
      {
        text: "item 1",
        dropdownPath: "/plans/2",
      },
      {
        text: "item 1",
        dropdownPath: "/plans/3",
      },
      {
        text: "item 1",
        dropdownPath: "/plans/4",
      },
      {
        text: "item 1",
        dropdownPath: "/plans/5",
      },
    ],
  },
  {},
  // {
  //   icon: setting,
  //   text: "Settings",
  //   path: "/settings",
  // },
  // {
  //   icon: comments,
  //   text: "Comments",
  //   path: "/comments",
  // },
];

export const getVideoDistributions =
  "http://adztronaut.com/music/admin/api/getVideoDistribution";

export const getYoutubeOac =
  "http://adztronaut.com/music/admin/api/getYoutubeOac";

export const imageDomain = "https://adztronaut.com/music/admin/";

export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const user = JSON.parse(localStorage.getItem("user"));

export const routes = [
  {
    path: "/",
    page: <Home />,
  },
  {
    path: "/verified-on-resso",
    page: (
      // <RequireAuth>
      <ProfileVerification />
      // </RequireAuth>
    ),
  },

  {
    path: "/youtube-oac",
    page: <YoutubeOac />,
  },
  {
    path: "/youTube-claim-release",
    page: <YoutubeClaimRelease />,
  },
  {
    path: "/promotional-tool",
    page: <PromotionalTool />,
  },
  {
    path: "/video-distribution",
    page: <VideoDistribution />,
  },
  {
    path: "/link-facebook-and-instagram-profile-with-songs",
    page: <LinkFacebookAndInstagramProfile />,
  },
  {
    path: "/facebook-insta-whitelisting",
    page: <FbInstaWhitelisting />,
  },
  {
    path: "/youtube-video-takedown",
    page: <YoutubeVideoTakedown />,
  },
  {
    path: "/login",
    page: <Login />,
  },
  {
    path: "/signup",
    page: <SignUp />,
  },
  {
    path: "/forgot-password",
    page: <ForgetPassword />,
  },
  {
    path: "/signup-details",
    page: <SignupDetails />,
  },

  {
    path: "/projects/ongoing",
    page: (
      // <RequireAuth>
      <OngoingProjects />
      // </RequireAuth>
    ),
  },
  {
    path: "/projects/previous",
    page: (
      // <RequireAuth>
      <PreviousProjects />
      // </RequireAuth>
    ),
  },

  {
    path: "/profile",
    page: (
      // <RequireAuth>
      <Profile />
      // </RequireAuth>
    ),
  },

  {
    path: "/profile/:id",
    page: <Profile />,
  },
  {
    path: "/revenue",
    page: <Revenue />,
  },
];

/**
  
 Required apis

 1. profile
    a. 
 
 
 
 
 
 
 */
