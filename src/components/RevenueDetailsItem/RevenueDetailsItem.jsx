import React, { useState } from 'react';
import MonthStreamCount from '../MonthStreamCount/MonthStreamCount';

const RevenueDetailsItem = ({ result, details, songs }) => {
  const [platform, setPlatform] = useState("");

  let songsByPlatform = [];
  songs.forEach(s => {
    if (s.isrc === details && s.platformName === platform) {
      songsByPlatform.push(s);
    }
  })


  const songsByUniqueDate = [...new Map(songsByPlatform.map(item =>
    [item["date"], item])).values()];

  let countByMonth = [];
  const check = songsByUniqueDate.forEach(s => {
    let count = 0;
    let revenue = 0;
    songsByPlatform.forEach(songs => {
      if (s.date === songs.date) {
        count = count + songs.total;
        revenue = revenue + songs["final revenue"]
      }
    })
    countByMonth.push({ count, date: s.date, revenue })
  })

  console.log(countByMonth);

  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  return (
    <table className='w-full'>
      {
        result.map(i =>
          <MonthStreamCount songs={songs} details={details} i={i} />
        )
      }
    </table>
  );
};

export default RevenueDetailsItem;