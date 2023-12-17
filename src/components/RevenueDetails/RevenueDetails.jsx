import React, { Fragment } from 'react';

const RevenueDetails = ({ item, raw, detailsRef }) => {
    // if (raw) {
    const items = raw?.filter(i => i.music_isrc === item.music_isrc)
    // console.log(items);
    // items?.map(i => console.log(i.forevision_cut))
    // }
    // console.log(items);

    // items?.map(item => console.log(item.music_total))

    // console.log(raw);
    // console.log(items);

    return (
        <>
            {/* jlfsdk */}
            <div className='grid grid-cols-9 h-0 overflow-hidden gap-4' ref={detailsRef}>
                {items?.map((i, key) => <Fragment key={key}>
                    <h6 className='py-2 order-2 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center pl-1'>{i.music_song_name ? i.music_song_name : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center cursor-pointer'>{i.music_data_type}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.album ? i.album : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_track_artist ? i.music_track_artist : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_label ? i.music_label : '-'}</h6>
                    <h6 className='py-2 order-1 2xl:order-none 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_isrc ? i.music_isrc : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_total ? i.music_total : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center'>{i.music_after_tds_revenue ? i.music_after_tds_revenue : '-'}</h6>
                    <h6 className='py-2 hidden 2xl:block 2xl:text-paragraph-2 2xl:text-grey-dark font-normal 2xl:text-center pr-1'>{i.music_after_tds_revenue && i.forevision_cut !== null ? (parseFloat(i.music_after_tds_revenue) - parseFloat(i.music_after_tds_revenue) * (parseFloat(i.forevision_cut) / 100)).toFixed(8) : '-'}</h6>
                </Fragment>)}
            </div>
        </>
    );
};

export default RevenueDetails;