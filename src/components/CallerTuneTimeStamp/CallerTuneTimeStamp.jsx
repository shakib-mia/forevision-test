import React from "react";
import InputField from "../InputField/InputField";

const CallerTuneTimeStamp = ({
  setStartMinutes,
  setStartSeconds,
  audioDuration,
  startMinutes,
  startSeconds,
}) => {
  return (
    <>
      <label htmlFor="callertune" className="mt-2">
        Select Caller Tune Time
      </label>
      <div className="flex gap-3">
        <div className="flex gap-2">
          <InputField
            onChange={(e) => setStartMinutes(e.target.value)}
            type="number"
            label={"Start Time (Minute)"}
            required
            name={"startMinutes"}
            max={Math.floor(audioDuration - 45) / 60}
            min={0}
          />
          <InputField
            onChange={(e) => setStartSeconds(e.target.value)}
            type="number"
            label={"Start Time (Seconds)"}
            required
            max={audioDuration - 45}
          />
        </div>

        <div className="flex gap-2">
          <InputField
            disabled={true}
            type="number"
            value={
              (parseInt(startSeconds) || 0) + 45 >= 60
                ? parseInt(startMinutes) + 1
                : startMinutes
            }
            label={"End Time (Minute)"}
            required
          />
          <InputField
            disabled={true}
            value={
              parseInt(startSeconds) + 45 >= 60
                ? Math.abs(60 - (parseInt(startSeconds) + 45))
                : parseInt(startSeconds) + 45
            }
            type="number"
            label={"End Time (Seconds)"}
            required
          />
        </div>
      </div>
    </>
  );
};

export default CallerTuneTimeStamp;
