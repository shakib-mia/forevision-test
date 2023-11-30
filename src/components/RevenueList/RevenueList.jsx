import React from 'react';
import RevenueItem from '../RevenueItem/RevenueItem';

const RevenueList = ({ options, filtered, containerRef, raw }) => {


    return (
        <div ref={containerRef} className='bg-grey-light'>
            <div className='mt-4 grid grid-cols-9 w-[1147px] 2xl:w-full'>
                {options.map((item, key) => <h6 key={key} className='text-subtitle-1-bold text-grey-dark text-center'>{item.split("_").join(" ")}</h6>)}
            </div>

            {filtered.sort((i1, i2) => i1.music_id - i2.music_id).length > 0 ? filtered.sort((i1, i2) => i1.music_id - i2.music_id).map((item, key) => <RevenueItem item={item} key={key} raw={raw} />) : <></>}
        </div>
    );
};

export default RevenueList;