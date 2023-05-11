import React, { useRef } from "react";
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
      <form
        className={projectModalStyle.input}
        onSubmit={(e) => {
          handleEditButton(e, projectID);
        }}
        noValidate
      >
        <label htmlFor="newProjectName">Change Name</label>
        <input
          name="projectName"
          id="newProjectName"
          defaultValue={projectName}
        />

        <div className={projectModalStyle.buttons}>
          <button type="submit">Save changes</button>
          <button
            onClick={(e) => {
              handleDeleteButton(e, projectID);
            }}
          >
            Remove
          </button>
        </div>
      </form>
    </>
  );
};
