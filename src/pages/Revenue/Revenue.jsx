import React, { useContext, useEffect, useRef, useState } from 'react';
import background from "../../assets/images/background.png"
import Button from '../../components/Button/Button';
import RevenueAnalytics from '../../components/RevenueAnalytics/RevenueAnalytics';
import balanceBG from '../../assets/images/balance-bg.svg';
import InputField from "../../components/InputField/InputField";
import search from "../../assets/icons/navbar/search.webp"
import Sorting from '../../components/Sorting/Sorting';
import RevenueItem from '../../components/RevenueItem/RevenueItem';
import chevron from "../../assets/icons/chevron-secondary.svg"
import axios from 'axios';
import { SongsContext } from "./../../contexts/SongsContext"
import notFound from "../../assets/images/not-found.svg"
import { ProfileContext } from '../../contexts/ProfileContext';
import RevenueList from '../../components/RevenueList/RevenueList';
import DemoPDF from '../../components/DemoPDF/DemoPDF';
import { toast } from 'react-toastify';
// import notFound from "../../assets/images/not-found.svg"

const Revenue = () => {
  const [badge, setBadge] = useState("");
  const [item, setItem] = useState(8)
  const [songs, setSongs] = useState([]);
  const [greeting, setGreeting] = useState("")
  const [showOptions, setShowOptions] = useState(false);
  const [phoneData, setPhoneData] = useState('Song_Name');
  const containerRef = useRef(null);
  const [total, setTotal] = useState({
    revenue: 0,
    view: 0
  });

  const [demoVisible, setDemoVisible] = useState(false)


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

  const { profileData, userData, token } = useContext(ProfileContext);
  const songData = []
  // console.log(userData);
  useEffect(() => {
    // const formData = new FormData();

    // formData.append('userId', userData !== null ? userData?.ID : "")


    axios
      .get("http://localhost:4000/user-revenue", {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        if (data.length > 0) {
          data.map(isrc => axios.get(`http://localhost:4000/user-revenue/${isrc}`).then(({ data }) => {
            if (data.revenues) {
              const newData = []
              const allSongs = data.revenues
              for (const song of allSongs) {
                for (const key of Object.keys(song)) {
                  if (!key.includes('EMPTY')) {
                    const newObject = {}
                    newObject[key] = song[key];
                  }
                }
                // console.log(song);
                newData.push(song)
              }

              setSongs(newData);
            }
          }))
        }
        // setSongs(data.data);
      }).catch(error => console.log(error));
  }, [token])
  // console.log(songData);

  const calculateAggregatedTotals = (songs) => {
    const final_revenue_total = {};
    const final_revenue = {};

    songs?.forEach((music) => {
      const isrc = music.music_isrc;

      // Calculate final_revenue total
      if (final_revenue_total.hasOwnProperty(isrc)) {
        final_revenue_total[isrc] += parseFloat(music.final_revenue);
      } else {
        final_revenue_total[isrc] = parseFloat(music.final_revenue);
      }

      // Calculate music_after_tds_revenue total
      if (final_revenue.hasOwnProperty(isrc)) {
        final_revenue[isrc] += parseFloat(music.music_after_tds_revenue);
      } else {
        final_revenue[isrc] = parseFloat(music.music_after_tds_revenue);
      }
    });

    // Create aggregated arrays with calculated totals
    const aggregatedMusicData = Object.keys(final_revenue_total).map((isrc) => ({
      music_isrc: isrc,
      ...songs.find((item) => item.music_isrc === isrc),
      final_revenue: final_revenue_total[isrc],
    }));

    const aggregatedRevenueTotal = Object.keys(final_revenue).map((isrc) => ({
      music_isrc: isrc,
      ...songs.find((item) => item.music_isrc === isrc),
      music_after_tds_revenue: final_revenue[isrc],
    }));

    return { aggregatedMusicData, aggregatedRevenueTotal };
  };

  // Example usage
  const { aggregatedMusicData, aggregatedRevenueTotal } = calculateAggregatedTotals(songs);

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
  /**
   * 
  header Data 
  */

  // console.log(aggregatedMusicData.sort((a, b) => parseFloat(b.final_revenue) - parseFloat(a.final_revenue))[0]?.music_song_name || '-');

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

  // console.log(aggregatedMusicData.length);

  useEffect(() => {
    // if (total.view && total.revenue) {
    // console.log(total);
    setData([
      {
        heading: 'Total Uploads',
        data: aggregatedMusicData.length
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
    // }
  }, [])

  const options = [
    "Song_name",
    "Platform Name",
    "Album",
    "Artist",
    "Label",
    "ISRC",
    "View",
    "Revenue",
    "Revenue_After_Forevision_Deduction",
  ]

  const handleSort = (field) => {
    // setFilteredSongs(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
    console.log(aggregatedMusicData.sort((i1, i2) => i1[field] - i2[field]));
    aggregatedMusicData.sort((i1, i2) => i1[field] > i2[field]).map(item => console.log(item[field]))
  }

  // console.log(profileData);

  return (

    <SongsContext.Provider value={{ songs, setSongs, total, setTotal }}>
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
                <Button className='px-2 py-1' disabled={calculateTotal('final_revenue') === 0} text="Request Withdraw" />
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
              {/* <div className='mt-6 flex justify-center mb-0'>
                <Button text="Request Withdraw" disabled={true} className="px-[24px]" />
              </div> */}
            </div>}
          </div>

          <div className='hidden 2xl:block mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] relative'>
            {filtered.length > 0 ? <>
              <div className="flex flex-col 2xl:flex-row justify-end bg-grey-light">
                {/* <div className="w-full 2xl:w-2/3">
                  <div className="flex flex-row gap-1 2xl:gap-3 items-center">
                    <div className='w-full 2xl:w-7/12 relative'>
                      <InputField icon={search} value={badge} onChange={e => setBadge(e.target.value)} containerClassName="w-full" badge={badge} setBadge={setBadge} placeholder="Search here..." />
                    </div>
                    <div className="w-full 2xl:w-5/12 h-full">
                      {songs && songs.length ? <Sorting handleSort={handleSort} setSongs={setSongs} songs={aggregatedMusicData} text="Sort by" options={songs[0] && Object.keys(songs[0])} /> : ""}
                    </div>
                  </div>
                </div> */}

                <div className='w-full 2xl:w-fit bg-white p-[4px] mt-1 2xl:mt-0 rounded-full'>
                  <div className="hidden 2xl:flex justify-between">
                    <Button small text="DOWNLOAD REPORT" onClick={() => toast.error("This Feature is Coming Soon", {
                      position: 'bottom-center'
                    })} />
                  </div>

                  <div className='flex 2xl:hidden'>
                    {/* <Button small text={'CSV'} onClick={() => setFileType("CSV")} />
                    <Button small text={'PDF'} onClick={() => setFileType("PDF")} /> */}
                    <Button small text="DOWNLOAD REPORT" onClick={() => toast.error("This Feature is Coming Soon", {
                      position: 'bottom-center'
                    })} />
                  </div>
                </div>
              </div>

              <RevenueList options={options} filtered={filtered} containerRef={containerRef} raw={songs} />
            </> : <div className='flex flex-col items-center'>
              <img src={notFound} className='w-1/3 mx-autor' alt="not found" />
              <p className='w-2/3 text-heading-6-bold mx-auto text-grey text-center'>Ooopps!! There is Nothing to show yet !! Upload your content and let it shine ! If you’ve uploaded already , let it perform in the various platforms . </p>
              <h4 className='text-heading-4-bold text-grey'>See you soon.</h4>
            </div>}
          </div>

          {filtered.length > 0 && <div className='2xl:hidden bg-grey-light p-2 rounded-[20px] mt-5'>
            <div className='border border-primary-light rounded-full px-3 text-primary-light py-1 grid grid-cols-3 relative'>
              <p className="text-paragraph-2 text-left font-medium">ISRC</p>
              <label className="text-paragraph-2 text-center font-medium flex items-center justify-center capitalize">{phoneData.split("_").join(" ")} <img src={chevron} className={`transition ${showOptions ? 'rotate-180' : 'rotate-0'}`} alt="chevron" /> <input className="hidden" type="checkbox" onChange={e => setShowOptions(e.target.checked)} /></label>
              {showOptions && <div className='w-fit h-[250px] overflow-y-auto flex flex-col items-center absolute left-0 right-0 m-auto bg-white top-[100%] shadow z-[9999]'>
                {options.map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center px-3 py-1' onClick={() => {
                  setShowOptions(false)
                  setPhoneData(item)
                }}>{item.split("_").join(" ")}</h6>)}
              </div>}
              <p className="text-paragraph-2 text-right font-medium">Final Revenue</p>
            </div>

            {filtered.length > 0 ? filtered.slice(0, item).map((item, key) => <RevenueItem option={phoneData} item={item} key={key} />) : <></>}
            {<img src={chevron} onClick={() => item === 8 ? setItem(songs.length - 1) : setItem(8)} className={`mx-auto ${item !== 8 ? 'rotate-180' : 'rotate-0'}`} alt="" />}
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

      {/* {demoVisible && <div className='w-screen h-screen backdrop-blur-lg flex justify-center items-center absolute left-0 top-0 overflow-x-hidden z-[999999999]'>
        <div className='bg-white w-1/2 h-1/2 relative flex items-center justify-center'>
          <button className='absolute -top-4 -right-4 text-heading-4 text-white' onClick={() => setDemoVisible(false)}>&times;</button>

          <h1 className='text-heading-1 text-center'>Coming Soon!!!</h1>
        </div>
      </div>} */}
    </SongsContext.Provider >
  );
};

export default Revenue;