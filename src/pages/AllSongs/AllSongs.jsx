import React from "react";
import Uploads from "../../components/Uploads/Uploads";
import RecentUploads from "../../components/RecentUploads/RecentUploads";

const AllSongs = () => {
  return (
    <>
      <h2 className="pl-7 text-heading-2-bold text-grey-dark pt-7">
        All Songs
      </h2>
      <div className="p-7 pt-4 grid grid-cols-2 gap-4">
        <Uploads />
        <RecentUploads />
      </div>
    </>
  );
};

export default AllSongs;
