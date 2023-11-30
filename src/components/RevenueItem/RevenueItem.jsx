import React, { useEffect, useRef, useState } from 'react';
import downArrow from "../../assets/icons/down-arrow.webp";
import whitePattern from "../../assets/images/white-pattern.svg"
import gsap from 'gsap';
import RevenueDetails from '../RevenueDetails/RevenueDetails';

const RevenueItem = ({ item, option, raw }) => {
    const [details, setDetails] = useState(false);
    const [pcDetails, setPcDetails] = useState(false)
    const containerRef = useRef(null);
    const itemRef = useRef(null);

    const detailsRef = useRef(null)


    useEffect(() => {
        if (details) {
            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 1
            })

            gsap.to(itemRef.current, {
                left: 0,
                duration: 1
            })
        } else {
            gsap.to(itemRef.current, {
                left: '100vw',
                duration: 1
            })
        }
    }, [details])


    useEffect(() => {
        if (pcDetails) {
            gsap.to(detailsRef.current, {
                height: "100%",
                duration: 1
            })
        } else {
            gsap.to(detailsRef.current, {
                height: "0",
                duration: 1
            })
        }
    }, [pcDetails])

    return (
        <>
            <div className={pcDetails ? 'bg-white shadow' : 'hover:bg-white hover:shadow'}>
                <div className={`hidden 2xl:grid grid-cols-9 gap-4 text-subtitle-2 font-medium ${pcDetails ? "text-interactive-light" : "text-grey-dark"} p-1 text-center`}>
                    <h6 className='order-2 2xl:order-none 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_song_name ? item.music_song_name : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 text-interactive-light-confirmation font-normal 2xl:text-center cursor-pointer' onClick={() => setPcDetails(!pcDetails)}>{pcDetails ? 'Collapse' : "Click For Details"}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_album ? item.music_album : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_track_artist ? item.music_track_artist : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_label ? item.music_label : '-'}</h6>
                    <h6 className='order-1 2xl:order-none 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_isrc ? item.music_isrc : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_total ? item.music_total : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_after_tds_revenue ? item.music_after_tds_revenue : '-'}</h6>
                    <h6 className='hidden 2xl:block 2xl:text-paragraph-2 font-normal 2xl:text-center'>{item.music_after_tds_revenue ? parseFloat(item.music_after_tds_revenue) - parseFloat(item.music_after_tds_revenue) * (parseFloat(item.forevision_cut) / 100) : '-'}</h6>
                    {/* <p className='order-3 2xl:order-none flex items-center 2xl:hidden'>{item.final_revenue} <img className='ml-1 -rotate-90' onClick={() => setDetails(true)} src={downArrow} alt="" /></p> */}
                </div>

                <RevenueDetails item={item} raw={raw} detailsRef={detailsRef} />
            </div>

            <div className='2xl:hidden grid grid-cols-3 gap-4 text-subtitle-2 font-medium text-grey-dark p-1 text-center'>
                <h6 className='order-2 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{item['music_' + option?.toLowerCase()] ? item['music_' + option?.toLowerCase()] : '-'}</h6>
                <h6 className='order-1 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{item.music_isrc ? item.music_isrc : '-'}</h6>
                <p className='order-3 2xl:order-none flex items-center justify-between 2xl:hidden'><p className='w-full text-right'>{parseFloat(item.final_revenue).toFixed(3)}</p> <img className='ml-1 -rotate-90' onClick={() => setDetails(true)} src={downArrow} alt="" /></p>
            </div>
            <div className={`fixed z-[999999] h-screen w-screen top-0 left-0 backdrop-blur px-3 ${!details && 'hidden'} transition duration-1000`} ref={containerRef}>
                <div className="relative left-[100vw] bg-no-repeat bg-contain px-3 py-5 mt-5 flex flex-col gap-2 bg-grey-light rounded-[20px]" style={{ backgroundImage: `url(${whitePattern})` }} ref={itemRef}>
                    <button className='absolute top-1 right-1' onClick={() => setDetails(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#E5E7EB" />
                        </svg>
                    </button>
                    <div className="flex gap-4">
                        <h5 className='text-heading-5-bold text-grey-dark w-5/12'>Song Name</h5>
                        <p className='w-7/12'>{item.music_song_name}</p>
                    </div>
                    <div className="flex gap-4">
                        <h5 className='text-heading-5-bold text-grey-dark w-5/12'>ISRC</h5>
                        <p className='w-7/12'>{item.music_isrc}</p>
                    </div>
                    <div className="flex gap-4">
                        <h5 className='text-heading-5-bold text-grey-dark w-5/12'>Lifetime Revenue</h5>
                        <p className='w-7/12'>{item.final_revenue}</p>
                    </div>
                    <div className='mt-5'>
                        <h5 className='text-heading-5-bold text-center text-grey-dark'>Platforms</h5>
                        <div className="grid grid-cols-5 justify-center text-center mt-2">
                            <h2>1</h2>
                            <h2>2</h2>
                            <h2>3</h2>
                            <h2>4</h2>
                            <h2>5</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RevenueItem;