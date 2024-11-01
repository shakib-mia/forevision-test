import React, { useState } from "react";
import AudioForm from "../AudioForm/AudioForm";
import AlbumAudioForm from "../AlbumAudioForm/AlbumAudioForm";
import Button from "../Button/Button";

const AlbumAudio = (props) => {
  const [count, setCount] = useState(1);

  return (
    <>
      {Array.from({ length: 10 }).map((_, key) => (
        // <>{key}</>
        <AlbumAudioForm
          count={count}
          setCount={setCount}
          {...props}
          id={key}
          key={key}
        />
      ))}

      <div className="flex justify-center gap-2">
        <Button
          containerClassName={"w-fit mt-5"}
          onClick={() => setCount((c) => c + 1)}
          text={"Add More"}
        />
        <Button
          containerClassName={"w-fit mt-5"}
          onClick={() => props.setScreen("preview")}
          text={"Finish"}
        />
      </div>
    </>
  );
};

export default AlbumAudio;
