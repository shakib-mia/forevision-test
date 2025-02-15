import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import axios from "axios";
import { backendUrl } from "../../constants";
import RecentUploadsItem from "../RecentUploadsItem/RecentUploadsItem";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Albums from "../Albums/Albums";
import { FaArrowUp } from "react-icons/fa";

const RecentUploads = () => {
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("songs");

  const { userData, token } = useContext(ProfileContext);

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // if (location.pathname !== "/all-songs") {
    // const isrcs = userData?.isrc?.split(",");
    const config = {
      headers: {
        token: sessionStorage.getItem("token") || token,
      },
    };
    if (userData) {
      axios
        .get(backendUrl + "recent-uploads", config)
        .then(({ data }) => setSongs(data))
        .catch((error) => navigate("/login"));
    }
    // }
  }, [userData.isrc, update]);

  // const songs = [
  //   {
  //     _id: "67a879cbb52d4663863f6545",
  //     artists: [
  //       {
  //         name: "Asif akbar",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "O Priya Tumi Kothay",
  //     albumType: "Single",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739094385083-1b_3000p.jpg",
  //     songName: "O priya tumi kothay",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739094427164-asif-akbar-music-world_o-priya-tumi-kothay.wav",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "onek dukkher gan",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "15:47",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00002",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88127b52d4663863f6549",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     UPC: "123456789",
  //     albumTitle: "alone",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739096214992-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     language: "Bengali",
  //     songName: "alone",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739096303252-alone-296348.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Romantic",
  //     description: "dfdfdfdf",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:18",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00003",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88493b52d4663863f654d",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "AAM",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739097163424-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "AAM",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739097187072-Amake_Amar_Moto_Thakte_Dao_Autograph_Prosenjit_Chatterjee_Anupam_Roy_Srijit_Mukherji_SVF.mp3",
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "ddd",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:33",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "dhkib",
  //     accepted: true,
  //     orderId: "FVDO00004",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a95d974bb5c4ea9e97013b",
  //     artists: [
  //       {
  //         name: "shakib",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00007",
  //     contentType: "Album",
  //     albumTitle: "Islamic Song",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739152399984-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Ami jodi konodin",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739152451863-ami_jodi_konodin.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Ghazal",
  //     mood: "Calm",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "07:55",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a9975368201b443fbb4530",
  //     artists: [
  //       {
  //         name: "Chanchal Chowdhury",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Gazi Mazharul Anwar",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Alauddin Ali",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00008",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "achen amar muktar",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739167437516-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739168986319-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Philosophical",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "12:05",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "forevision-social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //     language: "Bengali",
  //   },
  //   {
  //     _id: "67ab28fc43b4af7a12fddde4",
  //     artists: [
  //       {
  //         name: "Anupam Roy",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00009",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "Anupam Special",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739270046384-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739287204473-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Happy",
  //     releaseDate: "2025-02-11",
  //     liveDate: "2025-02-11",
  //     time: "16:35",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //   },
  //   {
  //     _id: "67a879cbb52d4663863f6545",
  //     artists: [
  //       {
  //         name: "Asif akbar",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "O Priya Tumi Kothay",
  //     albumType: "Single",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739094385083-1b_3000p.jpg",
  //     songName: "O priya tumi kothay",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739094427164-asif-akbar-music-world_o-priya-tumi-kothay.wav",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "onek dukkher gan",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "15:47",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00002",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88127b52d4663863f6549",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     UPC: "123456789",
  //     albumTitle: "alone",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739096214992-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     language: "Bengali",
  //     songName: "alone",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739096303252-alone-296348.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Romantic",
  //     description: "dfdfdfdf",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:18",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00003",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88493b52d4663863f654d",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "AAM",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739097163424-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "AAM",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739097187072-Amake_Amar_Moto_Thakte_Dao_Autograph_Prosenjit_Chatterjee_Anupam_Roy_Srijit_Mukherji_SVF.mp3",
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "ddd",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:33",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "dhkib",
  //     accepted: true,
  //     orderId: "FVDO00004",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a95d974bb5c4ea9e97013b",
  //     artists: [
  //       {
  //         name: "shakib",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00007",
  //     contentType: "Album",
  //     albumTitle: "Islamic Song",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739152399984-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Ami jodi konodin",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739152451863-ami_jodi_konodin.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Ghazal",
  //     mood: "Calm",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "07:55",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a9975368201b443fbb4530",
  //     artists: [
  //       {
  //         name: "Chanchal Chowdhury",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Gazi Mazharul Anwar",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Alauddin Ali",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00008",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "achen amar muktar",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739167437516-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739168986319-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Philosophical",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "12:05",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "forevision-social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //     language: "Bengali",
  //   },
  //   {
  //     _id: "67ab28fc43b4af7a12fddde4",
  //     artists: [
  //       {
  //         name: "Anupam Roy",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00009",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "Anupam Special",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739270046384-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739287204473-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Happy",
  //     releaseDate: "2025-02-11",
  //     liveDate: "2025-02-11",
  //     time: "16:35",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //   },
  //   {
  //     _id: "67a879cbb52d4663863f6545",
  //     artists: [
  //       {
  //         name: "Asif akbar",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "O Priya Tumi Kothay",
  //     albumType: "Single",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739094385083-1b_3000p.jpg",
  //     songName: "O priya tumi kothay",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739094427164-asif-akbar-music-world_o-priya-tumi-kothay.wav",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "onek dukkher gan",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "15:47",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00002",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88127b52d4663863f6549",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     UPC: "123456789",
  //     albumTitle: "alone",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739096214992-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     language: "Bengali",
  //     songName: "alone",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739096303252-alone-296348.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Romantic",
  //     description: "dfdfdfdf",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:18",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00003",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88493b52d4663863f654d",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "AAM",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739097163424-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "AAM",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739097187072-Amake_Amar_Moto_Thakte_Dao_Autograph_Prosenjit_Chatterjee_Anupam_Roy_Srijit_Mukherji_SVF.mp3",
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "ddd",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:33",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "dhkib",
  //     accepted: true,
  //     orderId: "FVDO00004",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a95d974bb5c4ea9e97013b",
  //     artists: [
  //       {
  //         name: "shakib",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00007",
  //     contentType: "Album",
  //     albumTitle: "Islamic Song",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739152399984-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Ami jodi konodin",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739152451863-ami_jodi_konodin.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Ghazal",
  //     mood: "Calm",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "07:55",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a9975368201b443fbb4530",
  //     artists: [
  //       {
  //         name: "Chanchal Chowdhury",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Gazi Mazharul Anwar",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Alauddin Ali",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00008",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "achen amar muktar",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739167437516-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739168986319-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Philosophical",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "12:05",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "forevision-social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //     language: "Bengali",
  //   },
  //   {
  //     _id: "67ab28fc43b4af7a12fddde4",
  //     artists: [
  //       {
  //         name: "Anupam Roy",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00009",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "Anupam Special",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739270046384-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739287204473-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Happy",
  //     releaseDate: "2025-02-11",
  //     liveDate: "2025-02-11",
  //     time: "16:35",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //   },
  //   {
  //     _id: "67a879cbb52d4663863f6545",
  //     artists: [
  //       {
  //         name: "Asif akbar",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "ethun babu",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "O Priya Tumi Kothay",
  //     albumType: "Single",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739094385083-1b_3000p.jpg",
  //     songName: "O priya tumi kothay",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739094427164-asif-akbar-music-world_o-priya-tumi-kothay.wav",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "onek dukkher gan",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "15:47",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00002",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88127b52d4663863f6549",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     UPC: "123456789",
  //     albumTitle: "alone",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739096214992-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     language: "Bengali",
  //     songName: "alone",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739096303252-alone-296348.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Romantic",
  //     description: "dfdfdfdf",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:18",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     orderId: "FVDO00003",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a88493b52d4663863f654d",
  //     artists: [
  //       {
  //         name: "1",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "1",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "1",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     price: 0,
  //     contentType: "Album",
  //     albumTitle: "AAM",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739097163424-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "AAM",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739097187072-Amake_Amar_Moto_Thakte_Dao_Autograph_Prosenjit_Chatterjee_Anupam_Roy_Srijit_Mukherji_SVF.mp3",
  //     genre: "Film",
  //     subGenre: "Sad",
  //     mood: "Sad",
  //     description: "ddd",
  //     releaseDate: "2025-02-09",
  //     liveDate: "2025-02-09",
  //     time: "16:33",
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     planName: "ForeVision-Social",
  //     songs: false,
  //     signature: "dhkib",
  //     accepted: true,
  //     orderId: "FVDO00004",
  //     status: "submitted",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a95d974bb5c4ea9e97013b",
  //     artists: [
  //       {
  //         name: "shakib",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "unknown",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00007",
  //     contentType: "Album",
  //     albumTitle: "Islamic Song",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739152399984-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Ami jodi konodin",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739152451863-ami_jodi_konodin.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Ghazal",
  //     mood: "Calm",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "07:55",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //   },
  //   {
  //     _id: "67a9975368201b443fbb4530",
  //     artists: [
  //       {
  //         name: "Chanchal Chowdhury",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Gazi Mazharul Anwar",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Alauddin Ali",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00008",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "achen amar muktar",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739167437516-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739168986319-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Philosophical",
  //     releaseDate: "2025-02-10",
  //     liveDate: "2025-02-10",
  //     time: "12:05",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "forevision-social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //     language: "Bengali",
  //   },
  //   {
  //     _id: "67ab28fc43b4af7a12fddde4",
  //     artists: [
  //       {
  //         name: "Anupam Roy",
  //         role: "Singer/Primary Artist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Lyricist",
  //       },
  //       {
  //         name: "Anupam Roy",
  //         role: "Composer",
  //       },
  //     ],
  //     selectedPlatforms: [
  //       "Meta",
  //       "TikTok",
  //       "SnapChat",
  //       "Triller",
  //       "YouTube Content ID",
  //       "YouTube Music",
  //     ],
  //     file: {},
  //     price: 0,
  //     orderId: "FVDO00009",
  //     contentType: "Album",
  //     UPC: "1234567890",
  //     albumTitle: "Anupam Special",
  //     albumType: "Single",
  //     artwork:
  //       "http://localhost:5000/uploads/art-work/file-1739270046384-1b_3000p.jpg",
  //     recordLabel: "ForeVision Digital",
  //     publisher: "ForeVision Digital",
  //     songName: "Achen Amar Muktar",
  //     language: "Bengali",
  //     songUrl:
  //       "http://localhost:5000/uploads/songs/file-smdshakibmia2001-1739287204473-achen-amar-muktar-cut.mp3",
  //     startMinutes: 0,
  //     startSeconds: 0,
  //     startMinutes2: 0,
  //     startSeconds2: 0,
  //     genre: "Film",
  //     subGenre: "Devotional",
  //     mood: "Happy",
  //     releaseDate: "2025-02-11",
  //     liveDate: "2025-02-11",
  //     time: "16:35",
  //     songs: false,
  //     signature: "shakib",
  //     accepted: true,
  //     userEmail: "smdshakibmia2001@gmail.com",
  //     status: "submitted",
  //     planName: "ForeVision-Social",
  //     emailId: "smdshakibmia2001@gmail.com",
  //     requested: true,
  //     updated: false,
  //   },
  // ];

  console.log(songs);

  return (
    <div className="w-full bg-grey-light rounded-2xl p-2 !pt-0 lg:p-4 pb-0 text-grey-dark relative h-[688px] overflow-hidden recent-uploads">
      <div
        className={`${
          activeTab === "songs" &&
          songs.filter((item) => !item.songs).length === 0
            ? "absolute left-0 right-0 mx-auto px-3"
            : "sticky"
        } top-0 left-0 bg-grey-light pt-2 lg:pt-4 z-[999]`}
        id="recent-upload-header"
      >
        <h5 className="text-heading-5-bold 2xl:text-heading-4-bold text-grey-dark mb-3">
          Recent Uploads
        </h5>
        <div className="relative flex w-fit mb-4 gap-3">
          {/* Tab Buttons */}
          <button
            className={`relative text-heading-6-bold px-0 pb-1 transition-all duration-300 ${
              activeTab === "songs" ? "text-primary" : "text-grey-dark"
            }`}
            onClick={() => setActiveTab("songs")}
          >
            Songs
            <span
              className={`absolute bottom-0 right-0 h-[2px] bg-primary transition-all duration-300 ${
                activeTab === "songs" ? "left-0" : "left-full"
              }`}
            ></span>
          </button>
          <button
            className={`relative text-heading-6-bold px-0 pb-1 transition-all duration-300 overflow-hidden ${
              activeTab === "albums" ? "text-primary" : "text-grey-dark"
            }`}
            onClick={() => setActiveTab("albums")}
          >
            Albums
            <span
              className={`absolute bottom-0  w-full h-[2px] bg-primary transition-all duration-300 ${
                activeTab === "albums" ? "left-0" : "-left-full"
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div
        className={`${
          songs.length ? "absolute w-full left-0 px-4" : "relative"
        }  ${activeTab === "albums" ? "h-[80%]" : "h-[100%]"}`}
        style={{
          top:
            activeTab === "albums"
              ? document.getElementById("recent-upload-header")?.clientHeight +
                8 +
                "px"
              : songs.filter((item) => !item.songs).length > 0
              ? document.getElementById("recent-upload-header")?.clientHeight +
                8 +
                "px"
              : 0,
        }}
      >
        {activeTab === "songs" && (
          <div className="flex flex-col gap-2">
            {songs.filter((item) => !item.songs).length > 0 ? (
              songs
                .filter((item) => !item.songs)
                .map((song, key) => (
                  <>
                    <RecentUploadsItem
                      songData={song}
                      {...song}
                      key={key}
                      setUpdate={setUpdate}
                      update={update}
                    />
                  </>
                ))
            ) : (
              <div className="flex justify-center items-center h-full text-grey-dark text-heading-5 text-center absolute left-0 right-0 top-0 bottom-0 m-auto">
                <div className="flex flex-col items-center gap-1">
                  Upload Your First Song <br />
                  <Button
                    // small={true}
                    onClick={() => navigate("/plans")}
                    className="text-interactive-light flex gap-2 items-center"
                  >
                    Get Started <FaArrowUp className="rotate-45" />
                  </Button>
                </div>
              </div>
            )}
            {location.pathname === "/" &&
              songs.filter((item) => !item.songs).length > 5 && (
                <div
                  className={`${
                    songs.filter((item) => !item.songs).length > 14
                      ? "sticky"
                      : "sticky"
                  } -bottom-[2.25rem] left-0 w-full bg-grey-light flex justify-center py-2`}
                >
                  <Button onClick={() => navigate("/all-songs")}>
                    View All Songs
                  </Button>
                </div>
              )}
          </div>
        )}

        {activeTab === "albums" && <Albums />}
      </div>
    </div>
  );
};

export default RecentUploads;
