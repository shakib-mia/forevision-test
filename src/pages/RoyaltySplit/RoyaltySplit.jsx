import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../constants";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import AddSplitModal from "../../components/AddSplitModal/AddSplitModal";

const RoyaltySplit = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adding, setAdding] = useState("");
  const location = useLocation();
  const [splitId, setSplitId] = useState("");

  const { userData, token, updated } = useContext(ProfileContext);

  useEffect(() => {
    const fetchSongs = async () => {
      // console.log(!userData?.isrc);
      // If there's no ISRC, set loading false and return
      if (!userData?.isrc) {
        setIsLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            token: sessionStorage.getItem("token") || token,
            url: window.location.href,
          },
        };

        const response = await axios.get(
          `${backendUrl}songs/by-user-id/${userData["user-id"]}`,
          config
        );

        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setSongs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [userData?.isrc, userData?.["user-id"], token, updated]);

  // useEffect(() => console.log(adding), [adding]);

  return (
    <div className="xl:w-10/12 mx-auto mt-5 lg:mt-7 pb-5 lg:pb-7 p-3 shadow-xl rounded-lg text-grey-dark">
      <h3 className="text-heading-4-bold lg:text-heading-3-bold mb-2">
        Royalty Split
      </h3>

      <div className="grid grid-cols-2">
        <aside></aside>
        <aside className="border">
          <table className="w-full rounded-md overflow-hidden shadow-lg">
            <tr className="divide-x bg-grey text-white">
              <th className="p-2">Song</th>
              <th className="p-2">ISRC</th>
              <th className="p-2"></th>
            </tr>

            <tbody className="border-t divide-y">
              {songs.length > 0 ? (
                songs.map(
                  (
                    { ISRC, isrc, songName, Song, _id, splitAvailable },
                    key
                  ) => (
                    <tr
                      key={_id}
                      className={`divide-x text-center ${
                        key % 2 ? "bg-grey-light divide-white" : "bg-white"
                      }`}
                    >
                      <td className="p-2">{ISRC || isrc}</td>
                      <td className="p-2">{Song || songName}</td>
                      <td className="flex justify-center items-center h-full">
                        <Button
                          className={"!py-1"}
                          containerClassName={"mt-[4px]"}
                          onClick={() => setSplitId(_id)}
                          disabled={adding === _id || splitAvailable}
                        >
                          {splitAvailable ? (
                            <>Requested</>
                          ) : (
                            <>Add{adding === _id ? "ing" : ""} Split</>
                          )}
                        </Button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td></td>
                  <td className="text-center p-2">Loading...</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </aside>
      </div>

      {splitId.length ? (
        <Modal handleClose={() => setSplitId("")}>
          <AddSplitModal
            setSplitId={setSplitId}
            song={songs.find((song) => song._id === splitId)}
            setAdding={setAdding}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoyaltySplit;