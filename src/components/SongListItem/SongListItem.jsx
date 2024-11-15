import React, { useContext, useState } from "react";
import { FaMusic } from "react-icons/fa";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { PlanContext } from "../../contexts/PlanContext";
import Swal from "sweetalert2";
import { RiEditBoxLine } from "react-icons/ri";
import Modal from "../Modal/Modal";
import AuthBody from "../AuthBody/AuthBody";
import EditSongForm from "../EditSongForm/EditSongForm";
import axios from "axios";
import { ProfileContext } from "../../contexts/ProfileContext";
import EditSong from "../EditSong/EditSong";
import { MdOutlineMusicOff } from "react-icons/md";
import { TbMusicOff } from "react-icons/tb";
import { CiStreamOff } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import Takedown from "../Takedown/Takedown";

const SongListItem = ({
  songName,
  status,
  price,
  planName,
  _id,
  Song,
  songData,
}) => {
  const { setPlanStore } = useContext(PlanContext);
  const navigate = useNavigate();
  const [editId, setEditId] = useState("");
  // const [updatedData, setUpdatedData] = useState(songData);
  const { userData } = useContext(ProfileContext);
  const [takedownId, setTakedownId] = useState("");

  // const edit = (e) => {
  //   e.preventDefault();

  //   updatedData.emailId = userData.emailId;

  //   axios
  //     .post(backendUrl + "edit-song", updatedData, config)
  //     .then(({ data }) => {
  //       if (data.insertedId.length > 0) {
  //         setEditId("");
  //       }
  //     });
  // };

  return (
    <div className="">
      {/* <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur z-[99999]"></div> */}
      {editId.length > 0 && (
        <EditSong setEditId={setEditId} songData={songData} />
      )}
      {takedownId.length > 0 && (
        <Takedown setEditId={setTakedownId} songData={songData} />
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <div> */}
          <FaMusic className="text-heading-6" />
          {/* </div> */}

          <h6 className="text-heading-6 text-grey-dark">{Song || songName}</h6>
        </div>

        <div className="flex gap-1 text-heading-6 items-center">
          <RiEditBoxLine
            className="cursor-pointer"
            onClick={() => setEditId(_id)}
            title="Edit"
            data-tooltip-id={"edit" + _id}
            data-tooltip-content={`Edit`}
            data-tooltip-place="top"
          />
          <Tooltip id={"edit" + _id} />

          <CiStreamOff
            className="cursor-pointer text-interactive-light-destructive-focus text-heading-5"
            title="Takedown"
            data-tooltip-id={"takedown" + _id}
            data-tooltip-content={`Takedown`}
            data-tooltip-place="top"
            onClick={() => setTakedownId(_id)}
          />
          <Tooltip id={"takedown" + _id} />
        </div>
      </div>

      {/* <div className="text-center flex items-center justify-center">
        {status}
      </div> */}

      {status === "pending" && (
        <Button
          containerClassName={"mx-auto"}
          disabled={price === "0"}
          onClick={() => {
            price > 0 && navigate(`/payment?price=${price}?id=${_id}`);
            setPlanStore({ planName, price });
          }}
        >
          Pay Now
        </Button>
      )}

      {status === "paid" && (
        <Button
          containerClassName={"mx-auto"}
          disabled={price === "0"}
          onClick={() => {
            Swal.fire("Success");
          }}
        >
          Refund
        </Button>
      )}

      {/* {} */}
    </div>
  );
};

export default SongListItem;
