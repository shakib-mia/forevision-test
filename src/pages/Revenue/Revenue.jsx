import React, { useEffect, useState } from 'react';
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
import { config } from '../../constants';

const Revenue = () => {
  const [badge, setBadge] = useState("");
  const [item, setItem] = useState(8)
  const [songs, setSongs] = useState([])

  const data = [
    {
      heading: 'Total Uploads',
      data: 16
    },
    {
      heading: 'Best Upload',
      data: 'Je Jon Premer Vab'
    },
    {
      heading: 'Total revenue',
      data: 20.69989967
    },
    {
      heading: 'After TDS Revenue',
      data: 22.99988937
    },
  ]

  useEffect(() => {
    axios
      .get("https://adztronaut.com/music/admin/api/getAllMusicData", config)
      .then(({ data }) => setSongs(data.data));
  }, [])
  const options = [
    "Song_name",
    "Process_Name",
    "Album",
    "Artist",
    "Label",
    "ISRC",
    "Royalty",
    "Revenue_after_TDS",
    "Final_Revenue",
  ]

  return (

    <SongsContext.Provider value={{ songs, setSongs }}>
      <div className='bg-[size:100%] bg-no-repeat 2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0' style={{ backgroundImage: `url(${background})` }}>
        <div className='h-full w-full bg-white 2xl:bg-grey-dark px-2 2xl:px-[60px] py-5 rounded-[20px] 3xl:px-[150px]'>
          <div className="flex flex-col 2xl:flex-row gap-3 items-end">
            <div className='w-full 2xl:w-3/4'>
              <h4 className='text-heading-4-bold text-grey-dark 2xl:text-white'>Good evening, <br /> <span className='text-interactive-light 2xl:text-white'><u>
                Band
              </u> Fusion</span></h4>
              <p className='text-subtitle-1 text-interactive-dark-active 2xl:text-white tracking-[0.5px] mt-1'>Welcome to your revenue dashboard, Let’s see how much you’ve earned with us !</p>
              <div className='mt-4 hidden 2xl:flex flex-col justify-center items-center w-fit'>
                <h6 className='text-heading-6-bold text-white mb-1'>Revenue Analytics</h6>
                <Button className='px-2 py-1' text="Request Withdraw" />
              </div>

              <div className='mt-[32px] grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3'>
                {data.map((item, key) => <RevenueAnalytics {...item} id={key} />)}
              </div>
            </div>
            <div className='w-full 2xl:w-1/4 h-full 2xl:h-[380px] relative bg-[length:100%_100%] bg-grey-light 2xl:bg-white bg-[center_top_-140px] 2xl:bg-[center_top_-18vh] 3xl:bg-[center_top_-15vh] 2xl:bg-[length:100%_100%] bg-no-repeat rounded-[20px] py-5 px-5 2xl:px-[38px] 2xl:py-[50px]' style={{ backgroundImage: `url(${balanceBG})` }}>
              <h4 className='text-heading-4-bold text-white 2xl:text-grey'>Account <br className='2xl:hidden' /> Balance</h4>
              <h4 className='text-heading-4-bold text-grey-dark mt-5'>20.69989967</h4>
              <div className='mt-6 flex justify-center mb-0'>
                <Button text="Request Withdraw" className="px-[24px]" />
              </div>
            </div>
          </div>

          <div className='hidden 2xl:block mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-x-scroll relative'>
            <div className="flex flex-col 2xl:flex-row justify-between sticky top-0 left-0">
              <div className="w-full 2xl:w-2/3">
                {/* <input type="text" className='px-2 py-[12px]' placeholder='search here...' /> */}
                <div className="flex flex-row gap-1 2xl:gap-3 items-center">
                  <div className='w-full 2xl:w-7/12 relative'>
                    <InputField icon={search} value={badge} onChange={e => setBadge(e.target.value)} containerClassName="w-full" badge={badge} setBadge={setBadge} placeholder="Search here..." />
                  </div>
                  <div className="w-full 2xl:w-5/12 h-full">
                    {songs.length ? <Sorting setSongs={setSongs} songs={songs} text="Sort by" options={songs[0] && Object.keys(songs[0])} /> : ""}
                  </div>
                </div>
              </div>

              <div className='w-full 2xl:w-1/3 bg-white p-[4px] mt-1 2xl:mt-0 rounded-full'>
                <div className="hidden 2xl:flex justify-between">
                  <div className="flex gap-1">
                    <Button small text={'CSV'} />
                    <Button small text={'CSV'} />
                  </div>
                  <Button small text="DOWNLOAD REPORT" />
                </div>

                <div className='flex 2xl:hidden'>
                  <Button small text={'CSV'} />
                  <Button small text={'CSV'} />
                  <Button small text="DOWNLOAD REPORT" />
                </div>
              </div>
            </div>
            {/* <div className='bg-grey-light'> */}
            <div className='mt-4 grid grid-cols-9 w-[1147px] 2xl:w-full'>
              {options.map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center'>{item.split("_").join(" ")}</h6>)}
            </div>

            {songs.length > 0 ? songs.map(item => <div className='grid grid-cols-9 w-[1147px] 2xl:w-full hover:bg-white hover:rounded-[5px] hover:shadow-lg py-2 transition cursor-pointer'>
              {/* {Object.keys(item).map(i => console.log(i))} */}
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_catalogue}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_content_id}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_album}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_track_artist}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_label}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_isrc}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_royality}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.music_after_tds_revenue}</h6>
              <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item.final_revenue}</h6>
            </div>) : <></>}
          </div>

          <div className='2xl:hidden bg-grey-light p-2 rounded-[20px] mt-5'>
            <div className='border border-primary-light rounded-full px-3 text-primary-light py-1 grid grid-cols-3'>
              <p className="text-paragraph-2 text-left font-medium">ISRC</p>
              <p className="text-paragraph-2 text-center font-medium flex items-center">Song Name <img src={chevron} alt="chevron" /></p>
              <p className="text-paragraph-2 text-right font-medium">Final Revenue</p>
            </div>

            {songs.length > 0 ? songs.slice(0, item).map((item, key) => <RevenueItem {...item} key={key} />) : <></>}
            <img src={chevron} onClick={() => item === 8 ? setItem(songs.length - 1) : setItem(8)} className={`mx-auto ${item !== 8 ? 'rotate-180' : 'rotate-0'}`} alt="" />
          </div>

        </div>
      </div>
    </SongsContext.Provider>
  );
};

export default Revenue;