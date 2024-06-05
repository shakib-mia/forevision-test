import React, { useContext, useState } from "react";
import { ScreenContext } from "../../contexts/ScreenContext";
import Button from "../Button/Button";
import PlatformSelection from "../PlatformSelection/PlatformSelection";
const Platform = () => {
  const { setScreen } = useContext(ScreenContext);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  return (
    <>
      <PlatformSelection
        selectedPlatforms={selectedPlatforms}
        setSelectedPlatforms={setSelectedPlatforms}
      />
      <Button
        disabled={!selectedPlatforms.length}
        containerClassName={"w-fit mx-auto mt-5"}
        onClick={() => setScreen("audio")}
      >
        Save and Next
      </Button>
    </>
  );
};

export default Platform;
