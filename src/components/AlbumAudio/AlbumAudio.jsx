import React, { useState } from "react";
import AlbumAudioForm from "../AlbumAudioForm/AlbumAudioForm";
import Button from "../Button/Button";

const AlbumAudio = (props) => {
  const [forms, setForms] = useState([{ id: 0 }]);
  const { initFormData, setInitFormData, formData } = props;

  // console.log(initFormData);

  const addMoreForm = () => {
    // Create a new song template
    const newSong = {
      songName: "",
      isrc: "",
      artists: [
        { name: "", role: "Singer/Primary Artist" },
        { name: "", role: "Lyricist" },
        { name: "", role: "Composer" },
      ],
      selectedPlatforms: [],
      file: {},
      startMinutes: 0,
      startMinutes2: 0,
      startSeconds: 0,
      startSeconds2: 0,
      parentalAdvisory: false,
      instrumental: false,
      language: "",
    };

    // Update initFormData by adding a new song object to the 'songs' array
    // setInitFormData((prevFormData) => [...prevFormData, newSong]);
    setInitFormData([...initFormData, newSong]);

    // Add a new form with an incremented ID
    setForms((prevForms) => {
      const maxId =
        prevForms.length > 0
          ? Math.max(...prevForms.map((form) => form.id))
          : -1;
      return [...prevForms, { id: maxId + 1 }];
    });
    console.log(formData);
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
