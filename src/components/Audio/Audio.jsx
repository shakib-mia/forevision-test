import { useEffect, useState } from "react";
import AudioForm from "../AudioForm/AudioForm";
import Button from "../Button/Button";
import ReactOwlCarousel from "react-owl-carousel";

const AudioUI = (props) => {
  const [count, setCount] = useState(2);

  return (
    <>
      {/* {Array.from({ length: count }).map((_, key) => ( */}
      <AudioForm
        // key={key}
        // id={key}
        count={count}
        {...props}
        id={props.id}
        setCount={setCount}
      />
      {/* ))} */}

      {/* <Button
        containerClassName={"w-fit mx-auto mt-5"}
        onClick={() => {
          setCount(count + 1);
          console.log(count);
        }}
        text={"Finish"}
      /> */}
    </>
  );
};

export default AudioUI;
