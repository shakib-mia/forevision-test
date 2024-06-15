import React from "react";

const SongUploadProgress = ({ setScreen, screen }) => {
  return (
    <div className="flex gap-5 mt-5">
      <h4
        className="text-heading-4-bold text-grey-dark flex items-center cursor-pointer"
        onClick={() => setScreen("albumDetails")}
      >
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

      <h4
        className="text-heading-4-bold text-grey flex items-center cursor-pointer"
        onClick={() => setScreen("platform")}
      >
        <aside
          className={
            screen === "platform"
              ? "text-interactive-dark-destructive-active"
              : "text-interactive-dark-destructive-focus"
          }
        >
          02
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

      <h4
        className="text-heading-4-bold flex items-center cursor-pointer"
        onClick={() => setScreen("audio")}
      >
        <aside
          className={
            screen === "audio"
              ? "text-interactive-dark-destructive-active"
              : "text-interactive-dark-destructive-focus"
          }
        >
          03
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

      <h4
        className="text-heading-4-bold text-grey flex items-center cursor-pointer"
        onClick={() => setScreen("distribution")}
      >
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
  );
};

export default SongUploadProgress;
