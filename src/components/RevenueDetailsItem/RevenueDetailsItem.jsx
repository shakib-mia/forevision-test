import React from 'react';

const RevenueDetailsItem = ({ options, item }) => {


    return (
        <ul className='grid grid-cols-5 gap-3 text-center mt-2'>
            {options.map((i, key) => <li>{item[i]}</li>)}
        </ul>
    );
};

export default RevenueDetailsItem;