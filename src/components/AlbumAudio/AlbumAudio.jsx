import React, { useState } from "react";
import AlbumAudioForm from "../AlbumAudioForm/AlbumAudioForm";
import Button from "../Button/Button";

const AlbumAudio = (props) => {
  const [forms, setForms] = useState([{ id: 0 }]);

  const addMoreForm = () => {
    setForms((prevForms) => {
      // Find the maximum current ID and increment
      const maxId =
        prevForms.length > 0
          ? Math.max(...prevForms.map((form) => form.id))
          : -1;

      return [...prevForms, { id: maxId + 1 }];
    });
  };

  return (
    <>
      {forms.map((form) => (
        <AlbumAudioForm
          key={form.id}
          id={form.id}
          count={forms.length}
          setCount={() => {}} // If you're not using this, you can remove it
          {...props}
        />
      ))}

      <div className="flex justify-center gap-2">
        <Button
          containerClassName={"w-fit mt-5"}
          onClick={addMoreForm}
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
