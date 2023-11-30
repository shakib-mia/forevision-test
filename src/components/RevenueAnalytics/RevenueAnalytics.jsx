import React from 'react';
import styles from "./RevenueAnalytics.module.css"
// import CountUp from 'react-countup/build/CountUp';

const RevenueAnalytics = ({ heading, data, id }) => {
    return (
        <>
            <div className='relative 2xl:hidden h-[148px] 3xl:h-[204px] text-grey-dark overflow-hidden rounded-[9px] bg-white shadow 2xl:shadow-none'>
                <div className={styles.ocean}>
                    <div className={styles.wave} style={{ bottom: id === 0 ? 0 : id === 1 || id === 2 ? '58%' : 0, rotate: id === 0 ? 0 : id === 1 || id === 2 ? '180deg' : 0 }}></div>
                </div>
                <div className='absolute w-full h-full py-[13px] px-2'>
                    <p className='text-paragraph-2'>{heading}</p>
                    <div className='h-full flex items-center'>
                        <h5 className='text-heading-5-bold w-full whitespace-normal'>{
                            isNaN(parseFloat(data))
                                ? data
                                : heading !== 'Total Uploads' && heading !== 'View'
                                    ? data.toFixed(2)
                                    : data}</h5>
                    </div>
                </div>
            </div>

            <div className='relative hidden 2xl:block h-[148px] 3xl:h-[204px] text-grey-dark overflow-hidden rounded-[9px] bg-white shadow 2xl:shadow-none'>
                <div className={styles.ocean}>
                    <div className={styles.wave} style={(id + 1) % 2 === 0 ? { bottom: 0 } : { top: 0, rotate: '180deg' }}></div>
                </div>
                <div className='absolute w-full h-full py-[13px] px-2'>
                    <p className='text-paragraph-2'>{heading}</p>
                    <div className='h-full flex items-center'>
                        <h5 className='text-heading-5-bold w-full whitespace-normal'>{isNaN(parseFloat(data))
                            ? data
                            : heading !== 'Total Uploads' && heading !== 'View'
                                ? data.toFixed(2)
                                : data}</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RevenueAnalytics;