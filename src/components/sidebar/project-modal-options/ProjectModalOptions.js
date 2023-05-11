import React from "react";
import projectModalStyle from "./projectModalOptions.module.scss";

export const ProjectModalOptions = ({
  handleCancelButton,
  handleEditButton,
  handleDeleteButton,
  projectName,
  projectID
}) => {
  return (
    <>
      <div className={projectModalStyle.titleCloseBtn}>
        <h1>{projectName}</h1>
        <button onClick={handleCancelButton} />
      </div>
      <div className={projectModalStyle.input}>
        <label htmlFor="newProjectName">Project Name:</label>
        <input defaultValue={projectName} />
      </div>
      <div>
        <button onClick={e=>{
          handleDeleteButton(e,projectID)
        }}>Remove</button>
        <div>
          <button onClick={handleCancelButton}>Cancel</button>
          <button>Save changes</button>
        </div>
      </div>
    </>
  );
};
