import React from "react";
import projectModalStyle from "./projectModalOptions.module.scss";

export const ProjectModalOptions = ({
  handleCancelButton,
  handleEditButton,
  handleDeleteButton,
  projectName,
  projectID,
}) => {
  return (
    <>
      <div className={projectModalStyle.titleCloseBtn}>
        <h1>{projectName}</h1>
        <button onClick={handleCancelButton} />
      </div>
      <div className={projectModalStyle.input}>
        <label htmlFor="newProjectName">Change Name</label>
        <input
          name="projectName"
          id="newProjectName"
          defaultValue={projectName}
        />
      </div>
      <div className={projectModalStyle.buttons}>
        <button>Save changes</button>
        <button
          onClick={(e) => {
            handleDeleteButton(e, projectID);
          }}
        >
          Remove
        </button>
      </div>
    </>
  );
};
