import { useEffect, useState } from "react";
import AudioForm from "../AudioForm/AudioForm";
import Button from "../Button/Button";
import ReactOwlCarousel from "react-owl-carousel";

const AudioUI = (props) => {
  const [count, setCount] = useState(2);

  return (
    <>
      <ReactOwlCarousel items={1} dots id="upload-forms" nav>
        {Array.from({ length: count }).map((_, key) => (
          <AudioForm
            key={key}
            id={key}
            count={count}
            {...props}
            setCount={setCount}
          />
        ))}
      </ReactOwlCarousel>

      <Button
        containerClassName={"w-fit mx-auto mt-5"}
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
        text={"Finish"}
      />
    </>
  );
};

export default AudioUI;
