import React, { useEffect, useRef, useState } from "react";
import playCircle from "../../assets/icons/play-circle.webp";
import like from "../../assets/icons/like.webp";
import dislike from "../../assets/icons/dislike.webp";
import edit from "../../assets/icons/edit.webp";
// import editBlue from "../../assets/icons/edit-blue.webp";
import share from "../../assets/icons/share-nodes.webp";
import downArrowWhite from "../../assets/icons/down-arrow-white.webp";
import { gsap } from "gsap";
import Comment from "../Comment/Comment";
import user from "./../../assets/images/user.webp";
import arrowCircle from "../../assets/icons/arrow-circle.webp";

const Song = ({ name, comments }) => {
  const [showDetails, setShowDetails] = useState(false);
  const commentsRef = useRef(null);

  useEffect(() => {
    if (showDetails) {
      gsap.to(commentsRef.current, {
        height: "auto",
        duration: 0.5,
      });
    } else {
      gsap.to(commentsRef.current, {
        height: "0",
        duration: 0.5,
      });
    }
  }, [showDetails]);

  return (
    <div className={`border-b border-white ${showDetails ? 'pb-2' : ''}`}>
      <div className="flex items-center justify-between py-[11px]">
        <div className="flex items-center gap-[12px]">
          <img src={playCircle} alt="" />
          <h6 className="text-white text-heading-6">{name}</h6>
        </div>

        <div className="flex items-center gap-2">
          <img className="cursor-pointer" src={like} alt="" />
          <img className="cursor-pointer" src={dislike} alt="" />
          <img className="cursor-pointer" src={edit} alt="" />
          {/* <img className="cursor-pointer" src={editBlue} alt="" /> */}
          <img className="cursor-pointer" src={share} alt="" />
          <img
            className={`cursor-pointer transition ${showDetails && "rotate-180"
              }`}
            src={downArrowWhite}
            alt=""
            onClick={() => setShowDetails(!showDetails)}
          />
        </div>
      </div>

      <div
        className="overflow-hidden flex flex-col gap-2 h-0"
        ref={commentsRef}
      >
        {comments.map((props, key) => (
          <Comment {...props} key={key} />
        ))}

        <form className="flex gap-2 w-4/5 ml-auto">
          <img src={user} alt="" />
          <input
            type="text"
            className="bg-transparent focus:outline-none border-b border-white text-white w-full"
          />
          <img src={arrowCircle} alt="" />
        </form>
      </div>
    </div>
  );
};

export default Song;
