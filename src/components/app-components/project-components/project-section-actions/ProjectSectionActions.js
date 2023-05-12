import React from "react";
import projectSectionActionStyle from "./projectSectionActions.module.scss";

export const ProjectSectionActions = ({ handleCancelButton }) => {
  return (
    <div className={projectSectionActionStyle.container}>
      <div className={projectSectionActionStyle.titleCloseBtn}>
        <h1>Edit Section</h1>
        <button onClick={handleCancelButton} />
      </div>
      <form
        className={projectSectionActionStyle.input}
        // onSubmit={(e) => {
        //   handleEditButton(e, projectID);
        // }}
        noValidate
      >
        <label htmlFor="newProjectName">Change Name</label>
        <input
          // onChange={checkProjectNameInput}
          name="projectName"
          id="newProjectName"
          // placeholder={projectName}
        />

        <div className={projectSectionActionStyle.buttons}>
          <button type="submit">Save changes</button>
          <button
          // onClick={(e) => {
          //   handleDeleteButton(e, projectID);
          // }}
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
