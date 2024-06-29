import React, { useContext } from "react";
import InputField from "../InputField/InputField";
import { ScreenContext } from "../../contexts/ScreenContext";

const CallerTuneTimeStamp = ({
  audioDuration,
  setStartMinutes,
  setStartSeconds,
  startMinutes,
  startSeconds,
  setStartMinutes2,
  setStartSeconds2,
  startMinutes2,
  startSeconds2,
}) => {
  const { formData, setFormData } = useContext(ScreenContext);

  return (
    <div className="w-full mt-4">
      <label htmlFor="callertune" className="mt-2">
        Select Caller Tune Time
      </label>
      <div className="flex gap-3 w-full mt-1">
        <div className="flex gap-2 w-full">
          <InputField
            onChange={(e) => {
              setFormData({
                ...formData,
                startMinutes: startMinutes || 0,
                endMinutes:
                  (parseInt(startSeconds) || 0) + 45 >= 60
                    ? parseInt(startMinutes) + 1
                    : startMinutes,
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
          {/* <span>
            {Math.floor(audioDuration - 45) / 60 < startMinutes
              ? "invalid minute value"
              : ""}
          </span> */}
          <InputField
            onChange={(e) => {
              setFormData({
                ...formData,
                startSeconds: startSeconds || 0,
                endSeconds:
                  (parseInt(startSeconds) || 0) + 45 >= 60
                    ? Math.abs(60 - ((parseInt(startSeconds) || 0) + 45))
                    : (parseInt(startSeconds) || 0) + 45,
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
                startMinutes2: startMinutes2 || 0,
                endMinutes2:
                  (parseInt(startSeconds2) || 0) + 45 >= 60
                    ? parseInt(startMinutes2) + 1
                    : startMinutes2,
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
          {/* <span>
            {Math.floor(audioDuration - 45) / 60 < startMinutes
              ? "invalid minute value"
              : ""}
          </span> */}
          <InputField
            onChange={(e) => {
              setStartSeconds2(e.target.value);

              setFormData({
                ...formData,
                startSeconds2: startSeconds2 || 0,
                endSeconds2:
                  (parseInt(startSeconds2) || 0) + 45 >= 60
                    ? Math.abs(60 - ((parseInt(startSeconds2) || 0) + 45))
                    : (parseInt(startSeconds2) || 0) + 45,
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
            // required
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
            // required
          />
        </div>
      </div>
    </div>
  );
};

export default CallerTuneTimeStamp;
