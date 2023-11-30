import React from 'react';
import { imageDomain } from '../../constants';
import profile from "./../../assets/images/artist-profile.webp";

const ProfilePicture = ({ imageUrl, editable }) => {
    const handleProfilePictureUpload = e => {
        // console.log(e.target.files[0]);
    }

    return <div className="relative h-[245px] w-fit mx-auto">
        <div className="border-[10px] border-white rounded-full w-[231.63px] aspect-square overflow-hidden flex items-center justify-center">
            {imageUrl ? <img
                src={imageDomain + imageUrl}
                alt=""
            /> : <img src={profile} alt="Demo" />}
        </div>

        {editable && <>
            <label htmlFor="profilePicture" className="text-white cursor-pointer bg-primary flex justify-center items-center text-heading-5 w-4 h-4 absolute bottom-[30px] right-[30px] rounded-full">+</label>
            <input onChange={handleProfilePictureUpload} type="file" className="absolute hidden" accept="image/*" id="profilePicture" />
        </>}
    </div>;
};

export default ProfilePicture;