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
import { backendUrl, config } from "../../constants";
import { ProfileContext } from "../../contexts/ProfileContext";

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
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();
  const [editId, setEditId] = useState("");

  const [updatedData, setUpdatedData] = useState(songData);

  const edit = (e) => {
    e.preventDefault();

    updatedData.emailId = userData.emailId;

    axios
      .post(backendUrl + "edit-song", updatedData, config)
      .then(({ data }) => {
        if (data.insertedId.length > 0) {
          setEditId("");
        }
      });
  };

  return (
    <div className="">
      {/* <div className="w-screen h-screen fixed top-0 left-0 backdrop-blur z-[99999]"></div> */}
      {editId.length > 0 && (
        // <Modal>
        <AuthBody
          heading="Edit Song"
          // altDescription="Already Have an Account?"
          // altText="Log in"
          // altLink="/login"
          onSubmit={edit}
          className="backdrop-blur fixed top-0 left-0 z-[9999]"
          id="edit-song"
          closeIcon={true}
          handleClose={() => setEditId("")}
          whiteContainerClass="h-3/4 relative lg:!w-1/2 !mx-auto"
        >
          <EditSongForm
            songData={songData}
            updatedData={updatedData}
            setUpdatedData={setUpdatedData}
          />
        </AuthBody>
        // </Modal>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <div> */}
          <FaMusic className="text-heading-6" />
          {/* </div> */}

          <h6 className="text-heading-6 text-grey-dark">{Song || songName}</h6>
        </div>

        <RiEditBoxLine
          className="cursor-pointer"
          onClick={() => setEditId(_id)}
        />
      </div>

      <div className="text-center flex items-center justify-center">
        {status}
      </div>

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
