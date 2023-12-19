import React, { useContext, useEffect, useRef, useState } from 'react';
import background from "../../assets/images/background.png"
import Button from '../../components/Button/Button';
import RevenueAnalytics from '../../components/RevenueAnalytics/RevenueAnalytics';
import balanceBG from '../../assets/images/balance-bg.svg';
import InputField from "../../components/InputField/InputField";
import search from "../../assets/icons/navbar/search.webp"
import Sorting from '../../components/Sorting/Sorting';
// import RevenueItem from '../../components/RevenueItem/RevenueItem';
import chevron from "../../assets/icons/chevron-secondary.svg"
import axios from 'axios';
import { SongsContext } from "./../../contexts/SongsContext"
import notFound from "../../assets/images/not-found.svg"
import { ProfileContext } from '../../contexts/ProfileContext';
import DemoPDF from '../../components/DemoPDF/DemoPDF';
import { toast } from 'react-toastify';
// import notFound from "../../assets/images/not-found.svg"

const Revenue = () => {
  // const [badge, setBadge] = useState("");
  // const [item, setItem] = useState(8)
  const [songs, setSongs] = useState([]);
  const [greeting, setGreeting] = useState("")
  // const [showOptions, setShowOptions] = useState(false);
  // const [phoneData, setPhoneData] = useState('Song_Name');
  // const containerRef = useRef(null);
  const [isrcs, setIsrcs] = useState([])
  const [total, setTotal] = useState({
    revenue: 0,
    view: 0
  });
  // const [songs, setSongs] = useState([])

  const [demoVisible, setDemoVisible] = useState(false);
  const [details, setDetails] = useState([])


  const currentTime = new Date().getHours();


  useEffect(() => {
    if (currentTime >= 0 && currentTime < 12) {
      setGreeting("Good morning !");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good afternoon !");
    } else {
      setGreeting("Good evening !");
    }
  }, [currentTime])

  const { userData, token } = useContext(ProfileContext);
  // console.log(userData);
  useEffect(() => {

    axios
      .get("https://forevision-digital.onrender.com/user-revenue", {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        setIsrcs(data);
        // setSongs(data.data);
      }).catch(error => console.log(error));
  }, [token])

  // console.log(isrcs);
  useEffect(() => {
    if (isrcs.length > 0) {
      axios.post(`https://forevision-digital.onrender.com/songs-for-isrc`, { isrcs }).then(({ data }) => {
        setSongs(data);
        // console.log(data);
      }).catch(error => toast.error(error?.data?.message))
    }
  }, [isrcs, isrcs.length])

  const calculateAggregatedTotals = (songs) => {
    const grand_total = {};
    const final_revenue = {};
    const final_after_tds = {};
    const total_lifetime_views = {}

    songs?.forEach((music) => {
      const { isrc } = music;
      if (grand_total.hasOwnProperty(isrc)) {
        grand_total[isrc] += parseFloat(music['final revenue']);
      } else {
        grand_total[isrc] = parseFloat(music['final revenue']);
      }

      // Calculate music_after_tds_revenue total
      if (final_revenue.hasOwnProperty(isrc)) {
        final_after_tds[isrc] = parseFloat(final_after_tds[isrc]) ? parseFloat(final_after_tds[isrc]) + parseFloat(music['after tds revenue']) : 0 + parseFloat(music['after tds revenue']);
        total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc]) ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music['total']) : 0 + parseFloat(music['total']);
      } else {
        final_after_tds[isrc] = parseFloat(final_after_tds[isrc]) ? parseFloat(final_after_tds[isrc]) + parseFloat(music['after tds revenue']) : 0 + parseFloat(music['after tds revenue']);
        total_lifetime_views[isrc] = parseFloat(total_lifetime_views[isrc]) ? parseFloat(total_lifetime_views[isrc]) + parseFloat(music['total']) : 0 + parseFloat(music['total']);
      }
    });

    const aggregatedMusicData = Object.keys(grand_total).map((isrc) => ({
      isrc,
      ...songs.find((item) => item.isrc === isrc),
      total_revenue_against_isrc: grand_total[isrc],
    }));

    const aggregatedRevenueTotal = Object.keys(final_revenue).map((isrc) => ({
      isrc,
      ...songs.find((item) => item.isrc === isrc),
      "after tds revenue": final_revenue[isrc],
    }));

    return { aggregatedMusicData, aggregatedRevenueTotal, final_after_tds, total_lifetime_views };
  };
  // Example usage
  const { aggregatedMusicData, aggregatedRevenueTotal, final_after_tds, total_lifetime_views } = calculateAggregatedTotals(songs);
  console.log(total_lifetime_views);

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
    const item2 = aggregatedRevenueTotal.find((item) => item.music_isrc === item1.music_isrc);

    // Merge properties from both arrays
    return {
      ...item1,
      music_after_tds_revenue: item2 ? item2.music_after_tds_revenue : 0, // Use 0 if not found
    };
  });

  const filtered = mergedArray.filter(item => item.music_isrc !== "21");


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

  const calculateTotal = (fieldName) => {
    return aggregatedMusicData.reduce((accumulator, object) => {
      return accumulator + parseFloat(object[fieldName]);
    }, 0);
  }

  // console.log(calculateTotal('final revenue'));
  // console.log(total);

  const [data, setData] = useState([
    {
      heading: 'Total Uploads',
      data: userData?.isrc?.split(",").length
    },
    {
      heading: 'Best Upload',
      data: aggregatedMusicData.sort((a, b) => parseFloat(b.final_revenue) - parseFloat(a.final_revenue))[0]?.music_song_name || 'Loading...'
    },
    {
      heading: 'Total revenue',
      data: total.revenue || 0
    },
    {
      heading: 'View',
      data: total.view || 0
    },
  ])
  // console.log(aggregatedMusicData);

  let totalFinalRevenue = 0;
  let totalTotal = 0;

  for (const entry of aggregatedMusicData) {
    console.log(entry);
    totalFinalRevenue += entry["total_revenue_against_isrc"];
    totalTotal += entry["total"];
  }



  useEffect(() => {
    // if (total.view && total.revenue) {
    setData([
      {
        heading: 'Total Uploads',
        data: aggregatedMusicData.length
      },
      {
        heading: 'Best Upload',
        data: aggregatedMusicData.sort((a, b) => parseFloat(b.final_revenue) - parseFloat(a.final_revenue))[0]?.song_name || 'Loading...'
      },
      {
        heading: 'Total revenue',
        data: totalFinalRevenue || 0
      },
      {
        heading: 'View',
        data: totalView || 0
      },
    ])
    // }
  }, [aggregatedMusicData, aggregatedMusicData.length, total.revenue, total.total])


  const options = [
    "song_name",
    "platformName",
    "album",
    "track_artist",
    "label",
    "isrc",
    "total",
    "after tds revenue",
    "total_revenue_against_isrc",
  ]

  const options2 = [
    // "song_name",
    "platformName",
    "uploadTime",
    // "track_artist",
    // "label",
    // "isrc",
    "total",
    'final revenue',
  ]


  // const handleSort = (field) => {
  //   // setFilteredSongs(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
  //   console.log(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
  //   aggregatedMusicData.sort((i1, i2) => i1[field] > i2[field]).map(item => console.log(item[field]))
  // }

  const handleExpand = (song_isrc) => {
    setDetails(songs.filter(({ isrc }) => isrc === song_isrc));
  }

  // console.log(details);
  const month = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];



  // Function to filter the array based on month and platform
  // function filterSongs(data, selectedMonth) {
  //   return data
  // }

  // Example: Filter songs for December 2023 on Facebook platform
  // const selectedMonth = "2023-12-18";
  // const filteredSongs = filterSongs(songs, selectedMonth);

  // console.log(songs);

  // console.log("Total Final Revenue:", totalFinalRevenue);
  // console.log("Total Total:", totalTotal);


  return (

    <SongsContext.Provider value={{ songs, setSongs }}>
      <div className='bg-[size:100%] bg-no-repeat 2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0' style={{ backgroundImage: `url(${background})` }}>
        <div className='h-full w-full bg-white 2xl:bg-grey-dark px-2 2xl:px-[60px] py-5 rounded-[20px]'>
          <div className="flex flex-col 2xl:flex-row gap-3 items-end">
            <div className='w-full 2xl:w-3/4'>
              <h4 className='text-heading-4-bold text-grey-dark 2xl:text-white'>{greeting} <br /> <span className='text-interactive-light 2xl:text-white'><u>
                {userData?.first_name ? userData?.first_name : <></>}
              </u> {userData?.last_name ? userData?.last_name : <></>}</span></h4>
              <p className='text-subtitle-1 text-interactive-dark-active 2xl:text-white tracking-[0.5px] mt-1'>Welcome to your revenue dashboard, Let’s see how much you’ve earned with us !</p>
              {/* {filtered.length > 0 && <> */}
              <div className='mt-4 hidden 2xl:flex flex-col justify-center items-center w-fit'>
                <h6 className='text-heading-6-bold text-white mb-1'>Revenue Analytics</h6>
                <Button className='px-2 py-1' disabled={calculateTotal('final revenue') === 0} text="Request Withdraw" />
              </div>

              <div className='mt-[32px] grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3'>
                {/* {data.map((item, key) => <RevenueAnalytics {...item} id={key} key={key} />)} */}
                {<RevenueAnalytics heading={data[0].heading} data={data[0].data} />}
                {<RevenueAnalytics heading={data[1].heading} data={data[1].data} />}
                {<RevenueAnalytics heading={data[2].heading} data={data[2].data} />}
                {<RevenueAnalytics heading={data[3].heading} data={data[3].data} />}
              </div>
              {/* </>} */}
            </div>
            {filtered.length > 0 && <div className='w-full 2xl:w-1/4 h-full 2xl:h-[380px] relative bg-[length:100%_100%] bg-grey-light 2xl:bg-white bg-[center_top_-140px] 2xl:bg-[center_top_-18vh] 3xl:bg-[center_top_-15vh] 2xl:bg-[length:100%_100%] bg-no-repeat rounded-[20px] py-5 px-5 2xl:px-[38px] 2xl:py-[50px]' style={{ backgroundImage: `url(${balanceBG})` }}>
              <h4 className='text-heading-4-bold text-white 2xl:text-grey'>Account <br className='2xl:hidden' /> Balance</h4>
              <h4 className='text-heading-4-bold text-grey mt-5'>Coming soon!!!</h4>

            </div>}
          </div>

          <div className='hidden 2xl:block mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-auto'>

            <ul className="grid grid-cols-9 gap-3">
              {options.map((item, key) => <li key={key} className='capitalize text-center'>{item.includes("_") ? item.split("_").join(" ") : item}</li>)}
            </ul>

            {aggregatedMusicData.map(song => <ul className="grid grid-cols-9 gap-3">
              {/* list item */}
              {options.map(item => {
                return <li className='text-center'>{
                  typeof song[item] === 'number' && song[item].toString().split(".").length > 1
                    ? item === 'after tds revenue' ? final_after_tds[song.isrc].toFixed(8) : song[item].toFixed(8)
                    : item === 'total' ? total_lifetime_views[song.isrc]
                      : item === 'platformName'
                        ? <button onClick={() => toast.error("This Feature is Coming Soon", {
                          position: "bottom-center"
                        })}>See Details</button>
                        // ? <button onClick={() => handleExpand(song.isrc)}>See Details</button>
                        : song[item]}</li>
              })}
              {/* details item */}
              {/*{details[0] && <div className='w-screen h-screen bg-[#00000011] shadow-xl fixed top-0 left-0 z-[9999] flex justify-center items-center'>
                <div className='w-5/6 h-[80vh] bg-white relative overflow-x-visible rounded-2xl overflow-y-auto p-3'>
                  <button onClick={() => handleExpand("")} className='sticky text-interactive-light-destructive-focus text-heading-3 top-0'>&times;</button>
                  //  list heading 
                  <ul className="grid grid-cols-4 gap-3">
                    {options2.map((item, key) => <li key={key} className='capitalize text-center'>{item === "uploadTime" ? "Month" : item.includes("_") ? item.split("_").join(" ") : item}</li>)}
                  </ul>

                //list 
                  {details.map(song2 => <ul className='grid grid-cols-4 justify-between'>
                    // list item 
                    {options2.map(item => <li className='text-center'>{item === "uploadTime" ? month[new Date(song2[item]).getMonth()] : song2[item]}</li>)}
                  </ul>)}
                </div>
              </div>} */}
            </ul>)}
          </div>



        </div>
      </div >
    </SongsContext.Provider >
  );
};

export default Revenue;