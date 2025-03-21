import React, { useState } from "react";
import AudioUI from "../Audio/Audio";
import { FaChevronDown } from "react-icons/fa";

const AlbumAudioForm = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  // const { id } = props;
  // console.log({ ...props });
  // console.log(props);
  return (
    <>
      <div
        className="flex gap-3 items-center mb-3 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <h5 className="text-heading-5-bold text-grey-dark uppercase">
          Song:{props.id + 1}
        </h5>
        <FaChevronDown
          className={`transition ${collapsed ? "-rotate-90" : ""}`}
        />
        {collapsed && (
          <div className="bg-gradient-to-r h-[1px] w-full from-grey-dark to-white"></div>
        )}
      </div>
      {collapsed || <AudioUI {...props} setCollapsed={setCollapsed} />}
    </>
  );
};

export default AlbumAudioForm;
