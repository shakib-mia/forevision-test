import React from 'react';
import RevenueDetailsItem from '../RevenueDetailsItem/RevenueDetailsItem';

const RevenueDetails = ({ setDetails, songs, details }) => {
    const items = songs.filter(song => song.isrc === details).sort((item1, item2) => item1.platformName.localeCompare(item2.platformName))


    let groupedData = items.reduce((acc, cur) => {
        if (!acc[cur.platformName]) {
            acc[cur.platformName] = { ...cur, 'final revenue': 0, total: 0 };
        }
        acc[cur.platformName]['final revenue'] += cur['final revenue'];
        acc[cur.platformName].total += cur.total;
        return acc;
    }, {});

    // Convert the groupedData object back to an array if needed
    let result = Object.values(groupedData);

    // console.log(result);

    const options = [
        "song_name",
        "platformName",
        // "album",
        // "track_artist",
        // "label",
        "isrc",
        "total",
        // "after tds revenue",
        "final revenue",
    ]

    return (
        <>
            <div className='w-screen h-screen bg-[#00000017] fixed top-0 left-0 z-[9999] flex justify-center items-center'>
                <div className='w-3/5 h-[80vh] bg-[#ffffff] relative overflow-x-visible rounded-2xl overflow-y-auto p-3 px-5'>
                    <button onClick={() => setDetails("")} className='absolute text-interactive-light-destructive-focus text-heading-3 top-2 right-2 opacity-50'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="black" />
                        </svg>
                    </button>
                    {/* //  list heading  */}
                    <ul className="grid grid-cols-5 gap-3 mt-5 text-heading-6-bold text-grey-dark">
                        {options.map((item, key) => <li key={key} className={`${item === 'isrc' ? 'uppercase' : 'capitalize'} text-center`}>{item === "uploadTime" ? "Month" : item.includes("_") ? item.split("_").join(" ") : item === 'final revenue' ? 'Revenue' : item === 'total' ? 'Total Stream' : item === 'platformName' ? "Platform Name" : item}</li>)}
                    </ul>

                    {/* List */}
                    {result.map(item => <RevenueDetailsItem options={options} item={item} />)}

                </div>
            </div>
        </>
    );
};

export default RevenueDetails;