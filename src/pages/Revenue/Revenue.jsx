import React, { useContext, useEffect, useState } from 'react';
import background from "../../assets/images/background.png"
import Button from '../../components/Button/Button';
import RevenueAnalytics from '../../components/RevenueAnalytics/RevenueAnalytics';
import balanceBG from '../../assets/images/balance-bg.svg';
// import InputField from "../../components/InputField/InputField";
// import search from "../../assets/icons/navbar/search.webp"
// import Sorting from '../../components/Sorting/Sorting';
// import RevenueItem from '../../components/RevenueItem/RevenueItem';
import chevron from "../../assets/icons/chevron-secondary.svg";
import axios from 'axios';
import { SongsContext } from "./../../contexts/SongsContext"
// import notFound from "../../assets/images/not-found.svg"
import { ProfileContext } from '../../contexts/ProfileContext';
// import DemoPDF from '../../components/DemoPDF/DemoPDF';
import { toast } from 'react-toastify';
import notFound from "../../assets/images/not-found.svg"

const Revenue = () => {
  // const [badge, setBadge] = useState("");
  // const [item, setItem] = useState(8)
  const [songs, setSongs] = useState([]);
  // const songs = [];
  const [greeting, setGreeting] = useState("")
  const [showOptions, setShowOptions] = useState(false);
  const [phoneData, setPhoneData] = useState('Song_Name');
  // const containerRef = useRef(null);
  const [isrcs, setIsrcs] = useState([])
  // const [total, setTotal] = useState({
  //   revenue: 0,
  //   view: 0
  // });
  // const [songs, setSongs] = useState([])

  // const [demoVisible, setDemoVisible] = useState(false);
  // const [details, setDetails] = useState([])


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

  useEffect(() => {
    if (userData?.first_name) {
      axios
        .get("https://forevision-digital.onrender.com/user-revenue", {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          // console.log(data);

          for (const item of data) {
            axios.get(`https://forevision-digital.onrender.com/user-revenue/${item}`).then(({ data }) => {
              if (data.revenues) {
                // console.log(data.revenues)
                // songs.push()
                for (const song of data.revenues) {
                  // setSongs([...songs, song])
                  songs.push(song)
                }
                // setSongs([...songs, data.revenues]);
                // songs.concat(data.revenues)
                // console.log([...songs, data.revenues])
              }
            }).catch(error => console.log(error))
          }

          // setSongs(data.data);
        }).catch(error => console.log(error));
    }
  }, [token, userData, userData?.first_name])

  // console.log(isrcs);
  // useEffect(() => {
  //   if (isrcs.length > 0) {
  //     axios.post(`https://forevision-digital.onrender.com/songs-for-isrc`, { isrcs }).then(({ data }) => {
  //       setSongs(data);
  //       // console.log(data);
  //     }).catch(error => toast.error(error?.data?.message))
  //   }
  // }, [isrcs, isrcs.length])

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

  // console.log(aggregatedMusicData);

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

  // const calculateTotal = (fieldName) => {
  //   return aggregatedMusicData.reduce((accumulator, object) => {
  //     return accumulator + parseFloat(object[fieldName]);
  //   }, 0);
  // }

  // console.log(calculateTotal('final revenue'));
  // console.log(total);
  let totalFinalRevenue = 0;
  for (const entry of aggregatedMusicData) {
    if (entry['total_revenue_against_isrc'] !== NaN) {
      totalFinalRevenue += entry["total_revenue_against_isrc"];
    }
    // totalTotal += entry["total"];
  }

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
      data: totalFinalRevenue || 0
    },
    {
      heading: 'View',
      data: totalView || 0
    },
  ])
  // console.log(aggregatedMusicData);

  // let totalTotal = 0;




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
  }, [aggregatedMusicData, aggregatedMusicData.length, totalFinalRevenue, totalView])


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

  const labels = [
    "Song Name",
    "Platform Name",
    "Album",
    "Artist",
    "Label",
    "ISRC",
    "View",
    'Revenue',
    'Revenue After Forevision Deduction',
  ]


  // const handleSort = (field) => {
  //   // setFilteredSongs(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
  //   console.log(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
  //   aggregatedMusicData.sort((i1, i2) => i1[field] > i2[field]).map(item => console.log(item[field]))
  // }

  // const handleExpand = (song_isrc) => {
  //   setDetails(songs.filter(({ isrc }) => isrc === song_isrc));
  // }

  // console.log(details);
  // const month = ["January", "February", "March", "April", "May", "June", "July",
  //   "August", "September", "October", "November", "December"];



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

  const phoneOptions = ["isrc", 'song_name', 'total_revenue_against_isrc']


  return (

    <SongsContext.Provider value={{ songs }}>
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
                <Button className='px-2 py-1' disabled={true} text="Request Withdraw" />
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

            <ul className="grid grid-cols-9 gap-3 sticky top-0 mb-2">
              {labels.map((item, key) => <li key={key} className='capitalize text-center font-semibold'>{item}</li>)}
            </ul>

            {aggregatedMusicData.map(song => <ul className="grid grid-cols-9 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
              {/* list item */}
              {options.map(item => {
                return <li className='text-center'>{
                  typeof song[item] === 'number' && song[item].toString().split(".").length > 1
                    ? item === 'after tds revenue' ? final_after_tds[song.isrc].toFixed(8) : song[item].toFixed(8)
                    : item === 'total' ? total_lifetime_views[song.isrc]
                      : item === 'platformName'
                        ? <button className='underline hover:no-underline' onClick={() => toast.error("This Feature is Coming Soon", {
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

          {filtered.length > 0 && <div className='2xl:hidden bg-grey-light p-2 rounded-[20px] mt-5'>
            <div className='border border-primary-light rounded-full px-3 text-primary-light py-1 grid grid-cols-3 relative'>
              {phoneOptions.map((item, key) => <p className={`text-paragraph-2 ${key === 0 ? 'text-left' : key === 1 ? 'text-center' : "text-right"} font-medium capitalize`}>{item.includes("_") ? item.split("_").join(" ") : item.split("_").join(" ")}</p>)}
              {/* <p className="text-paragraph-2 font-medium text-center">Song Name</p> */}
              {/* <label className="text-paragraph-2 text-center font-medium flex items-center justify-center capitalize">{phoneData.split("_").join(" ")} <img src={chevron} className={`transition ${showOptions ? 'rotate-180' : 'rotate-0'}`} alt="chevron" /> <input className="hidden" type="checkbox" onChange={e => setShowOptions(e.target.checked)} /></label>
              {showOptions && <div className='w-fit h-[250px] overflow-y-auto flex flex-col items-center absolute left-0 right-0 m-auto bg-white top-[100%] shadow z-[9999]'>
                {options.map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center px-3 py-1' onClick={() => {
                  setShowOptions(false)
                  setPhoneData(item)
                }}>{item.split("_").join(" ")}</h6>)}
              </div>} */}
              {/* <p className="text-paragraph-2 text-right font-medium">Final Revenue</p> */}
            </div>

            {aggregatedMusicData.map(song => <ul className="grid grid-cols-3 gap-3 text-grey-dark py-1 hover:bg-white hover:shadow-md rounded-md mb-1">
              {/* list item */}
              {phoneOptions.map(item => {
                return <li className='text-center'>{
                  typeof song[item] === 'number' && song[item].toString().split(".").length > 1
                    ? item === 'after tds revenue' ? final_after_tds[song.isrc].toFixed(8) : song[item].toFixed(8)
                    : item === 'total' ? total_lifetime_views[song.isrc]
                      : item === 'platformName'
                        ? <button className='underline hover:no-underline' onClick={() => toast.error("This Feature is Coming Soon", {
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
            {/* {<img src={chevron} onClick={() => item === 8 ? setItem(songs.length - 1) : setItem(8)} className={`mx-auto ${item !== 8 ? 'rotate-180' : 'rotate-0'}`} alt="" />} */}
          </div>}


          {filtered.length === 0 && <div className='text-grey text-center 2xl:hidden'>
            <img src={notFound} className='w-full mx-auto' alt="" />
            <h6 className='text-heading-6-bold mb-2'>
              Ooopps.. There is Nothing to show yet !! Upload your content and let it shine !
              If you’ve uploaded already , let it perform in the various platforms .
            </h6>

            <h4 className='text-heading-4-bold'>See you soon.</h4>
          </div>}

        </div>
      </div>
    </SongsContext.Provider>
  );
};

export default Revenue;