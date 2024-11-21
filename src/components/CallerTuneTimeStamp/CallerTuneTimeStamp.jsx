import React, { useContext, useState } from "react";
import InputField from "../InputField/InputField";
import { ScreenContext } from "../../contexts/ScreenContext";
import { useLocation } from "react-router-dom";

const CallerTuneTimeStamp = ({ audioDuration, id }) => {
  const location = useLocation();
  const { formData, setFormData } = useContext(ScreenContext);
  const [startMinutes, setStartMinutes] = useState(
    location.pathname === "/album-upload"
      ? formData.songs[id]?.startMinutes
      : formData.startMinutes
  );
  const [startSeconds, setStartSeconds] = useState(
    location.pathname === "/album-upload"
      ? formData.songs[id]?.startSeconds
      : formData.startSeconds
  );
  const [startMinutes2, setStartMinutes2] = useState(
    location.pathname === "/album-upload"
      ? formData.songs[id]?.startMinutes2
      : formData.startMinutes2
  );
  const [startSeconds2, setStartSeconds2] = useState(
    location.pathname === "/album-upload"
      ? formData.songs[id]?.startSeconds2
      : formData.startSeconds2
  );

  // console.log(formData.songs[id]?);

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col lg:flex-row gap-3 w-full mt-1">
        <aside className="w-full lg:w-1/2">
          <div className="mt-2 mb-1">Select Caller Tune Time (1)</div>
          <div className="flex flex-col lg:flex-row gap-3">
            <InputField
              type="number"
              label={"Start Time (Minute)"}
              required
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs[id]?.startMinutes
                  : startMinutes
              }
              id={"start-minutes"}
              note={"For Jio, BSNL, VI & Airtel"}
              containerClassName={"w-full"}
              name={"startMinutes"}
              placeholder={"Enter Caller Tune Time"}
              min={0}
              onChange={(e) => {
                setStartMinutes(e.target.value);
                // setFormData({
                //   ...formData,
                //   startMinutes: e.target.value ? parseInt(e.target.value) : 0,
                // });

                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].startMinutes = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                } else {
                  formData.startMinutes = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                }
                // console.log(formData.songs[id]);
              }}
            />
            <InputField
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs[id]?.startSeconds
                  : startSeconds
              }
              type="number"
              id={"start-seconds"}
              containerClassName={"w-full"}
              label={"Start Time (Seconds)"}
              note={"For Jio, BSNL, VI & Airtel"}
              placeholder={"Enter Caller Tune Time"}
              onChange={(e) => {
                setStartSeconds(e.target.value);
                // setFormData({
                //   ...formData,
                //   startSeconds: e.target.value ? parseInt(e.target.value) : 0,
                // });

                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].startSeconds = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                } else {
                  formData.startSeconds = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                }
              }}
              required
              // max={audioDuration - 45}
            />
          </div>
        </aside>

        <aside className="w-full lg:w-1/2">
          <div className="mt-2 mb-1">Select Caller Tune Time (2)</div>
          <div className="flex flex-col lg:flex-row gap-3">
            <InputField
              type="number"
              label={"Start Time (Minute)"}
              required={false}
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs[id]?.startMinutes2
                  : startMinutes2
              }
              id={"start-minutes2"}
              note={"For BSNL, VI & Airtel"}
              containerClassName={"w-full"}
              name={"startMinutes"}
              placeholder={"Enter Caller Tune Time"}
              min={0}
              onChange={(e) => {
                setStartMinutes2(e.target.value);
                // setFormData({
                //   ...formData,
                //   startMinutes2: e.target.value ? parseInt(e.target.value) : 0,
                // });

                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].startMinutes2 = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                } else {
                  formData.startMinutes2 = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                }
              }}
            />
            <InputField
              value={
                location.pathname === "/album-upload" ||
                location.search.split("?")[1] === "yearly-plan" ||
                location.pathname.includes("edit-album")
                  ? formData.songs[id]?.startSeconds2
                  : startSeconds2
              }
              type="number"
              required={false}
              id={"start-seconds2"}
              containerClassName={"w-full"}
              placeholder={"Enter Caller Tune Time"}
              label={"Start Time (Seconds)"}
              note={"For BSNL, VI & Airtel"}
              onChange={(e) => {
                setStartSeconds2(e.target.value);
                // setFormData({
                //   ...formData,
                //   startSeconds2: e.target.value ? parseInt(e.target.value) : 0,
                // });

                if (
                  location.pathname === "/album-upload" ||
                  location.search.split("?")[1] === "yearly-plan" ||
                  location.pathname.includes("edit-album")
                ) {
                  formData.songs[id].startSeconds2 = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                } else {
                  formData.startSeconds2 = e.target.value
                    ? parseInt(e.target.value)
                    : 0;
                }
              }}

              // max={audioDuration - 45}
            />
          </div>
        </aside>
      </div>

      {/* <div className="flex gap-3 w-full mt-1">
        <div className="flex gap-2 w-full">
          <InputField
            onChange={(e) => {
              setFormData({
                ...formData,
                startMinutes: e.target.value || 0,
                endMinutes:
                  (parseInt(startSeconds) || 0) + 45 >= 60
                    ? parseInt(e.target.value) + 1
                    : e.target.value,
              });

              setStartMinutes(e.target.value);
            }}
            type="number"
            label={"Start Time (Minute)"}
            required
            value={startMinutes}
            id={"start-minutes"}
            note={"For Jio, BSNL, VI & Airtel"}
            containerClassName={"w-full"}
            name={"startMinutes"}
            min={0}
          />
          <InputField
            onChange={(e) => {
              setFormData({
                ...formData,
                startSeconds: e.target.value || 0,
                endSeconds:
                  (parseInt(e.target.value) || 0) + 45 >= 60
                    ? Math.abs(60 - ((parseInt(e.target.value) || 0) + 45))
                    : (parseInt(e.target.value) || 0) + 45,
              });
              setStartSeconds(e.target.value);
            }}
            value={startSeconds}
            type="number"
            id={"start-seconds"}
            containerClassName={"w-full"}
            label={"Start Time (Seconds)"}
            note={"For Jio, BSNL, VI & Airtel"}
            required
            max={audioDuration - 45}
          />
        </div>



        <div className="flex gap-2 w-full">
          <InputField
            disabled={true}
            type="number"
            id={"end-minutes"}
            value={
              (parseInt(startSeconds) || 0) + 45 >= 60
                ? parseInt(startMinutes) + 1
                : startMinutes
            }
            label={"End Time (Minute)"}
            note={"For Jio, BSNL, VI & Airtel"}
            required
            containerClassName={"w-full"}
          />
          <InputField
            disabled={true}
            value={
              (parseInt(startSeconds) || 0) + 45 >= 60
                ? Math.abs(60 - (parseInt(startSeconds) + 45))
                : parseInt(startSeconds) + 45
            }
            type="number"
            id={"end-seconds"}
            containerClassName={"w-full"}
            label={"End Time (Seconds)"}
            note={"For Jio, BSNL, VI & Airtel"}
            required
          />
        </div>
      </div>

      <div className="flex gap-3 w-full mt-3">
        <div className="flex gap-2 w-full">
          <InputField
            onChange={(e) => {
              setStartMinutes2(e.target.value);
              setFormData({
                ...formData,
                startMinutes2: parseFloat(e.target.value) || 0,
                endMinutes2:
                  (parseInt(startSeconds2) || 0) + 45 >= 60
                    ? parseInt(e.target.value) + 1
                    : e.target.value,
              });
            }}
            type="number"
            label={"Start Time (Minute)"}
            note={"For BSNL, VI & Airtel"}
            // required
            value={startMinutes2}
            id={"start-minutes2"}
            containerClassName={"w-full"}
            name={"startMinutes2"}
            // max={Math.floor(audioDuration - 45) / 60}
            min={0}
            // note={
            //   Math.floor(audioDuration - 45) / 60 > startMinutes
            //     ? "invalid minute value"
            //     : ""
            // }
          />

          <InputField
            onChange={(e) => {
              setStartSeconds2(e.target.value);

              setFormData({
                ...formData,
                startSeconds2: e.target.value || 0,
                endSeconds2:
                  (parseInt(e.target.value) || 0) + 45 >= 60
                    ? Math.abs(60 - ((parseInt(e.target.value) || 0) + 45))
                    : (parseInt(e.target.value) || 0) + 45,
              });
            }}
            value={startSeconds2}
            type="number"
            id={"start-seconds2"}
            containerClassName={"w-full"}
            label={"Start Time (Seconds)"}
            note={"For BSNL, VI & Airtel"}
            // required
            max={audioDuration - 45}
          />
        </div>

        <div className="flex gap-2 w-full">
          <InputField
            disabled={true}
            type="number"
            id={"end-minutes2"}
            value={
              (parseInt(startSeconds2) || 0) + 45 >= 60
                ? parseInt(startMinutes2) + 1
                : startMinutes2
            }
            label={"End Time (Minute)"}
            note={"For BSNL, VI & Airtel"}
            containerClassName={"w-full"}
          />
          <InputField
            disabled={true}
            value={
              parseInt(startSeconds2) + 45 >= 60
                ? Math.abs(60 - (parseInt(startSeconds2) + 45))
                : parseInt(startSeconds2) + 45
            }
            type="number"
            id={"end-seconds2"}
            containerClassName={"w-full"}
            label={"End Time (Seconds)"}
            note={"For BSNL, VI & Airtel"}
          />
        </div>
      </div> */}
    </div>
  );
};

export default CallerTuneTimeStamp;
