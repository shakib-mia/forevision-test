import React from "react";
import { useLocation } from "react-router-dom";

const SongUploadProgress = ({ setScreen, screen }) => {
  const location = useLocation();
  const isEditMode = location.pathname.startsWith("/edit-song"); // Check if the path starts with /edit-song

  const steps = [
    { id: "albumDetails", label: "ALBUM DETAILS" },
    { id: "platform", label: "PLATFORM" },
    { id: "audio", label: "AUDIO" },
    { id: "preview", label: "PREVIEW" },
    { id: "distribution", label: "DISTRIBUTION" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === screen);
  const maxReachedStepIndex = React.useRef(currentStepIndex);

  // Track the highest reached step unless it's in edit mode.
  React.useEffect(() => {
    if (!isEditMode && currentStepIndex > maxReachedStepIndex.current) {
      maxReachedStepIndex.current = currentStepIndex;
    }
  }, [currentStepIndex, isEditMode]);

  // Handle step click - allow step jump in edit mode, otherwise restrict
  const handleStepClick = (stepId) => {
    const clickedStepIndex = steps.findIndex((step) => step.id === stepId);
    // If in edit mode, allow jumping to any step, otherwise restrict to passed steps
    if (isEditMode || clickedStepIndex <= maxReachedStepIndex.current) {
      setScreen(stepId);
    }
  };

  return (
    <div
      className="w-full overflow-x-auto flex gap-5 mt-5"
      id="upload-progress"
    >
      {steps.map((step, index) => {
        const isPassedStep = index <= maxReachedStepIndex.current; // Step is passed or current
        const isActiveStep = screen === step.id; // Step is currently active

        return (
          <h4
            key={step.id}
            className={`text-heading-6-bold lg:text-heading-4-bold flex items-center whitespace-nowrap ${
              isEditMode || isPassedStep
                ? "text-grey-dark cursor-pointer" // Allow jumping to any step in edit mode
                : "text-grey cursor-not-allowed" // Disallow clicking on future steps if not passed yet
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            <aside
              className={
                isActiveStep
                  ? "text-interactive-dark-destructive-active" // Highlight active step
                  : isEditMode || isPassedStep
                  ? "text-interactive-dark-destructive-focus" // Passed steps or any in edit mode
                  : "text-grey" // Unreached steps are grayed out
              }
            >
              {(index + 1).toString().padStart(2, "0")}
            </aside>
            <aside
              className={`ml-2 ${
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
