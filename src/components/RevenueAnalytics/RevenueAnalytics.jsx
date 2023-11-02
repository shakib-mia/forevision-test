import React from 'react';
// import background from "../../assets/icons/wave.webp";
import styles from "./RevenueAnalytics.module.css"

const RevenueAnalytics = ({ heading, data, id }) => {
    console.log(id);
    return (
        <div className='relative h-[148px] 3xl:h-[204px] text-grey-dark overflow-hidden rounded-[9px] bg-white'>
            <div className={styles.ocean}>
                <div className={styles.wave}></div>
            </div>
            <div className='z-10 absolute w-full h-full py-[13px] px-3'>
                <h2 className='z-10'>{heading}</h2>
                <div className='h-full flex items-center break-all'>
                    <h5 className='text-heading-5-bold'>{data}</h5>
                </div>
            </div>
            {/* {id % 2 === 0 ? <RevenueOddBG /> : <RevenueEvenBg />} */}
        </div>
    );
};

export default RevenueAnalytics;