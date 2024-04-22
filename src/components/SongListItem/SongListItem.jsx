import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const SongListItem = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
      {/* <div> */}
      <FaPlayCircle className="text-heading-6" />
      {/* </div> */}

      <h6 className="text-heading-6 text-grey-dark">{name}</h6>
    </div>
  );
};

export default SongListItem;
