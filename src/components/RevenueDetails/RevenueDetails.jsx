import React from 'react';

const RevenueDetails = ({ item, raw, detailsRef }) => {
    // if (raw) {
    const items = raw?.filter(i => i.music_isrc === item.music_isrc)
    // console.log(items);
    // items.map(i => console.log(i.music_isrc))
    // }


    return (
        <>
            {/* jlfsdk */}
            <div className='grid grid-cols-9 h-0 overflow-hidden' ref={detailsRef}>
                {items?.map(i => <>
                    <h6 className='py-2 order-2 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_song_name ? i.music_song_name : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center cursor-pointer'>{i.music_data_type}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_album ? i.music_album : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_track_artist ? i.music_track_artist : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_label ? i.music_label : '-'}</h6>
                    <h6 className='py-2 order-1 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_isrc ? i.music_isrc : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_royality ? i.music_royality : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_after_tds_revenue ? i.music_after_tds_revenue : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_after_tds_revenue ? parseFloat(i.music_after_tds_revenue) - parseFloat(i.music_after_tds_revenue) * (parseFloat(i.forevision_cut) / 100) : '-'}</h6>
                </>)}
            </div>
        </>
    );
};

export default RevenueDetails;