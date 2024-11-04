import React from "react";
import Uploads from "../../components/Uploads/Uploads";
import RecentUploads from "../../components/RecentUploads/RecentUploads";

const AllSongs = () => {
  return (
    <>
      <h2 className="pl-1 lg:pl-7 text-heading-2-bold text-grey-dark pt-7">
        All Songs
      </h2>
      <div className="p-4 lg:p-7 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-7">
        <Uploads />
        <RecentUploads />
      </div>
    </>
  );
};

export default AllSongs;
