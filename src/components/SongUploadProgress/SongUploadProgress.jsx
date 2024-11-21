import React from "react";
import { useLocation } from "react-router-dom";

const SongUploadProgress = ({ setScreen, screen }) => {
  const location = useLocation();
  const isEditMode = location.pathname.startsWith("/edit"); // Check if the path starts with /edit-song

  // Define the steps of the song upload process
  const steps = [
    { id: "albumDetails", label: "ALBUM DETAILS" },
    { id: "platform", label: "PLATFORM" },
    { id: "audio", label: "AUDIO" },
    { id: "preview", label: "PREVIEW" },
    { id: "distribution", label: "DISTRIBUTION" },
  ];

  // Determine the steps based on the URL
  const logicalSteps =
    location.pathname.includes("/song-upload") ||
    location.pathname.includes("/album-upload")
      ? steps
      : steps.slice(0, steps.length - 1); // Remove distribution step for other paths like album-upload

  // Get the index of the current step
  const currentStepIndex = steps.findIndex((step) => step.id === screen);
  const maxReachedStepIndex = React.useRef(currentStepIndex); // Track the highest reached step

  // Update the max reached step unless in edit mode
  React.useEffect(() => {
    if (!isEditMode && currentStepIndex > maxReachedStepIndex.current) {
      maxReachedStepIndex.current = currentStepIndex;
    }
  }, [currentStepIndex, isEditMode]);

  // Handle step click to move to the clicked step
  const handleStepClick = (stepId) => {
    const clickedStepIndex = steps.findIndex((step) => step.id === stepId);
    // In edit mode, allow jumping to any step
    if (isEditMode || clickedStepIndex <= maxReachedStepIndex.current) {
      setScreen(stepId); // Set the screen to the clicked step
    }
  };

  return (
    <div
      className="w-full overflow-x-auto flex gap-2 lg:gap-5 mt-5"
      id="upload-progress"
    >
      {logicalSteps.map((step, index) => {
        const isPassedStep = index <= maxReachedStepIndex.current; // Check if the step is passed
        const isActiveStep = screen === step.id; // Check if the step is currently active

        return (
          <h4
            key={step.id}
            className={`text-heading-6-bold lg:text-heading-4-bold flex items-center whitespace-nowrap ${
              isEditMode || isPassedStep
                ? "text-grey-dark cursor-pointer" // Allow clicking if in edit mode or step is passed
                : "text-grey cursor-not-allowed" // Disable click if step is not passed
            }`}
            onClick={() => {
              handleStepClick(step.id); // Allow jumping directly in edit mode
            }}
          >
            <aside
              className={
                isActiveStep
                  ? "text-interactive-dark-destructive-active" // Active step
                  : isEditMode || isPassedStep
                  ? "text-interactive-dark-destructive-focus" // Passed or edit mode
                  : "text-grey" // Unreached steps
              }
            >
              {(index + 1).toString().padStart(2, "0")} {/* Show step number */}
            </aside>
            <aside
              className={`ml-[4px] lg:ml-2 ${
                isActiveStep
                  ? "border-b-2 border-interactive-dark-destructive-active" // Border for active step
                  : isEditMode || isPassedStep
                  ? "text-grey-dark" // Passed or in edit mode
                  : "text-grey" // Unreached steps
              }`}
            >
              {step.label}
            </aside>
          </h4>
        );
      })}
    </div>
  );
};

export default SongUploadProgress;
