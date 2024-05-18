import React, { useState } from "react";
import InputField from "../InputField/InputField";

const CallerTuneTimeStamp = ({
  setStartMinutes,
  setStartSeconds,
  audioDuration,
  startMinutes,
  startSeconds,
}) => {
  // console.log(audioDuration);
  // const [startValue, setStartValue] = useState(0)
  console.log(Math.floor(audioDuration));
  return (
    <div className="w-full mt-4">
      <label htmlFor="callertune" className="mt-2">
        Select Caller Tune Time
      </label>
      <div className="flex gap-3 w-full">
        <div className="flex gap-2 w-full">
          <InputField
            onChange={(e) => setStartMinutes(e.target.value)}
            type="number"
            label={"Start Time (Minute)"}
            required
            value={startMinutes}
            id={"start-minutes"}
            containerClassName={"w-full"}
            name={"startMinutes"}
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
            onChange={(e) => setStartSeconds(e.target.value)}
            value={startSeconds}
            type="number"
            id={"start-seconds"}
            containerClassName={"w-full"}
            label={"Start Time (Seconds)"}
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
            required
            containerClassName={"w-full"}
          />
          <InputField
            disabled={true}
            value={
              parseInt(startSeconds) + 45 >= 60
                ? Math.abs(60 - (parseInt(startSeconds) + 45))
                : parseInt(startSeconds) + 45
            }
            type="number"
            id={"end-seconds"}
            containerClassName={"w-full"}
            label={"End Time (Seconds)"}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CallerTuneTimeStamp;
