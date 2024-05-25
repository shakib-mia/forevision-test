import React, { useState } from "react";
import SongUploadFormContainer from "../../components/SongUploadFormContainer/SongUploadFormContainer";

const SongUploadNew = () => {
  const [screen, setScreen] = useState("distribution");
  return (
    <div className="ml-7 pt-6">
      <h4 className="text-heading-4-bold text-grey">Plan : </h4>

      <div className="flex gap-5 mt-5">
        <h4 className="text-heading-4-bold text-grey-dark flex items-center">
          <aside
            className={
              screen === "albumDetails"
                ? "text-interactive-dark-destructive-active"
                : "text-interactive-dark-destructive-focus"
            }
          >
            01
          </aside>
          <aside
            className={
              screen === "albumDetails"
                ? "border-b-2 border-interactive-dark-destructive-active"
                : "text-grey"
            }
          >
            ALBUM DETAILS
          </aside>
        </h4>

        <h4 className="text-heading-4-bold flex items-center">
          <aside
            className={
              screen === "audio"
                ? "text-interactive-dark-destructive-active"
                : "text-interactive-dark-destructive-focus"
            }
          >
            02
          </aside>
          <aside
            className={
              screen === "audio"
                ? "border-b-2 border-interactive-dark-destructive-active text-grey-dark"
                : "text-grey"
            }
          >
            AUDIO
          </aside>
        </h4>

        <h4 className="text-heading-4-bold text-grey flex items-center">
          <aside
            className={
              screen === "platform"
                ? "text-interactive-dark-destructive-active"
                : "text-interactive-dark-destructive-focus"
            }
          >
            03
          </aside>
          <aside
            className={
              screen === "platform"
                ? "border-b-2 border-interactive-dark-destructive-active text-grey-dark"
                : "text-grey"
            }
          >
            PLATFORM
          </aside>
        </h4>

        <h4 className="text-heading-4-bold text-grey flex items-center">
          <aside
            className={
              screen === "distribution"
                ? "text-interactive-dark-destructive-active"
                : "text-interactive-dark-destructive-focus"
            }
          >
            04
          </aside>
          <aside
            className={
              screen === "distribution"
                ? "border-b-2 border-interactive-dark-destructive-active text-grey-dark"
                : "text-grey"
            }
          >
            DISTRIBUTION
          </aside>
        </h4>
      </div>

      <SongUploadFormContainer screen={screen} setScreen={setScreen} />
    </div>
  );
};

export default SongUploadNew;
