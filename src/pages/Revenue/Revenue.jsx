import React, { useState } from 'react';
import background from "../../assets/images/background.png"
import Button from '../../components/Button/Button';
import RevenueAnalytics from '../../components/RevenueAnalytics/RevenueAnalytics';
import balanceBG from '../../assets/images/balance-bg.webp';
import InputField from "../../components/InputField/InputField";
import search from "../../assets/icons/navbar/search.webp"
import Sorting from '../../components/Sorting/Sorting';

const Revenue = () => {
  const [badge, setBadge] = useState("");

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

  const songs = [
    {
      Song_name: "Je Jon Premer Vab Jane Na",
      Process_Name: "Airtel Process",
      Album: "Je Jon Premer Vab Jane Na",
      Artist: "Band Fusion",
      Label: "Band Fusion Official",
      ISRC: "INF232100006",
      Royalty: "0.00048254",
      Revenue_after_TDS: "22.99988937",
      Final_Revenue: "20.69989967",
    },
    {
      Song_name: "Je Jon Premer Vab Jane Na",
      Process_Name: "Airtel Process",
      Album: "Je Jon Premer Vab Jane Na",
      Artist: "Band Fusion",
      Label: "Band Fusion Official",
      ISRC: "INF232100006",
      Royalty: "0.00048254",
      Revenue_after_TDS: "22.99988937",
      Final_Revenue: "20.69989967",
    },
    {
      Song_name: "Je Jon Premer Vab Jane Na",
      Process_Name: "Airtel Process",
      Album: "Je Jon Premer Vab Jane Na",
      Artist: "Band Fusion",
      Label: "Band Fusion Official",
      ISRC: "INF232100006",
      Royalty: "0.00048254",
      Revenue_after_TDS: "22.99988937",
      Final_Revenue: "20.69989967",
    },
    {
      Song_name: "Je Jon Premer Vab Jane Na",
      Process_Name: "Airtel Process",
      Album: "Je Jon Premer Vab Jane Na",
      Artist: "Band Fusion",
      Label: "Band Fusion Official",
      ISRC: "INF232100006",
      Royalty: "0.00048254",
      Revenue_after_TDS: "22.99988937",
      Final_Revenue: "20.69989967",
    }

  ]

  // console.log();

  return (

    <div className='bg-[size:100%] bg-no-repeat p-1 2xl:p-4 2xl:pl-7 mb-6 2xl:mb-0' style={{ backgroundImage: `url(${background})` }}>
      <div className='h-full w-full bg-grey-dark px-2 2xl:px-[60px] py-5 rounded-[20px] 3xl:px-[150px]'>
        <div className="flex flex-col 2xl:flex-row gap-3 items-end">
          <div className='w-full 2xl:w-3/4'>
            <h4 className='text-heading-4-bold text-white'>Good evening, <u>
              Band
            </u> Fusion</h4>
            <p className='text-subtitle-1 text-white tracking-[0.5px] mt-1'>Welcome to your revenue dashboard, Let’s see how much you’ve earned with us !</p>
            <div className='mt-4 flex flex-col justify-center items-center w-fit'>
              <h6 className='text-heading-6-bold text-white mb-1'>Revenue Analytics</h6>
              <Button className='px-2 py-1' text="Request Withdraw" />
            </div>

            <div className='mt-[32px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3'>
              {data.map((item, key) => <RevenueAnalytics {...item} id={key} />)}
            </div>
          </div>
          <div className='w-full 2xl:w-1/4 h-full 2xl:h-[380px] relative bg-[length:100%_100%] bg-no-repeat rounded-[20px] p-2 2xl:px-[38px] 2xl:py-[50px]' style={{ backgroundImage: `url(${balanceBG})` }}>
            <h4 className='text-heading-4-bold text-grey'>Account Balance</h4>
            <h4 className='text-heading-4-bold text-grey-dark mt-5'>20.69989967</h4>
            <div className='mt-6 flex justify-center mb-0'>
              <Button text="Request Withdraw" className="px-[24px]" />
            </div>
          </div>
        </div>

        <div className='mt-3 px-1 2xl:px-3 py-1 2xl:py-4 bg-grey-light rounded-[10px] overflow-x-scroll relative'>
          <div className="flex flex-col 2xl:flex-row justify-between sticky top-0 left-0">
            <div className="w-full 2xl:w-2/3">
              {/* <input type="text" className='px-2 py-[12px]' placeholder='search here...' /> */}
              <div className="flex flex-col 2xl:flex-row gap-1 2xl:gap-3 items-center">
                <div className='w-full 2xl:w-7/12 relative'>
                  <InputField icon={search} value={badge} onChange={e => setBadge(e.target.value)} containerClassName="w-full" badge={badge} setBadge={setBadge} placeholder="Search here..." />
                </div>
                <div className="w-full 2xl:w-5/12">
                  <Sorting text="Sort by" options={Object.keys(songs[0])} />
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
            {Object.keys(songs[0]).map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center'>{item.split("_").join(" ")}</h6>)}
          </div>

          {songs.map(item => <div className='grid grid-cols-9 w-[1147px] 2xl:w-full hover:bg-white hover:rounded-[5px] hover:shadow-lg py-2 transition cursor-pointer'>
            {/* <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Song name</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Process Name</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Album</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Artist</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Label</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>ISRC</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Royalty</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Revenue after TDS</h6>
            <h6 className='text-subtitle-1 text-grey-dark font-semibold'>Final Revenue</h6> */}
            {Object.keys(item).map(i => <h6 className='text-paragraph-2 text-grey-dark font-normal text-center'>{item[i]}</h6>)}
          </div>)}
          {/* </div> */}
        </div>

      </div>
    </div>
  );
};

export default Revenue;