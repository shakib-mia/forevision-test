import React, { useState } from 'react';

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
    songsByPlatform.forEach(songs => {
      if (s.date === songs.date) {
        count = count + songs.total;
      }
    })
    countByMonth.push({ count, date: s.date })
  })

  const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  return (
    <table className='w-full'>
      {
        result.map(i =>
          <details onClick={() => setPlatform(i.platformName)} className="group">
            <summary className="cursor-pointer list-none">
              <tr className='text-center flex justify-between items-center p-1 hover:bg-grey-light rounded-2xl'>
                <td className='w-1/3 flex items-center ml-3'>
                  <span className="mr-2 transition group-open:rotate-180 group-open:text-interactive-light-destructive-focus">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                  {i.platformName}</td>
                <td className='w-1/3'>{i.total}</td>
                <td className='w-1/3'>{i["final revenue"]}</td>
              </tr>
            </summary>
            <div className='w-full flex justify-end'>
              <table className='w-11/12 text-center my-1'>
                {/* <thead className='font-bold'>
                  <tr>
                    <td>Month Name</td>
                    <td>Total Streams</td>
                    <td>Revenue</td>
                  </tr>
                </thead> */}
                {
                  countByMonth.map(d =>
                    <tr style={{ color: "#78B0FD" }}>
                      <td className='w-1/3'>{
                        months[new Date(d.date).getMonth()]
                      } {new Date(d.date).getFullYear()}</td>
                      <td className='w-1/3'>{d.count}</td>
                      <td className='w-1/3'>{i["final revenue"]}</td>
                    </tr>
                  )
                }
              </table>
            </div>
          </details>
        )
      }
    </table>
  );
};

export default RevenueDetailsItem;