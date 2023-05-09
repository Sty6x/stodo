import React from "react";
import projectSectionActionStyle from "./projectSectionActions.module.scss";

export const ProjectSectionActions = ({
  handleCancelButton,
  handleEditButton,
  handleDeleteButton,
  sectionIndex,
  sectionTitle,
  name='projectName'
}) => {
  return (
    <div className={projectSectionActionStyle.container}>
      <div className={projectSectionActionStyle.titleCloseBtn}>
        <h1>Edit Section</h1>
        <button onClick={handleCancelButton} />
      </div>
      <form
        className={projectSectionActionStyle.input}
        onSubmit={(e) => {
          handleEditButton(e, sectionIndex);
        }}
        noValidate
      >
        <label htmlFor="newProjectName">Change Name</label>
        <input
          // onChange={checkProjectNameInput}
          name={name}
          id="newProjectName"
          placeholder={sectionTitle}
        />

        <div className={projectSectionActionStyle.buttons}>
          <button type="submit">Save changes</button>
          <button
            onClick={(e) => {
              handleDeleteButton(e, sectionIndex);
            }}
          >
            Remove
          </button>
        </div>
      </form>
    </div>
  );
};
