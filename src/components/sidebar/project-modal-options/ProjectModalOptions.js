import React, { useRef, useState } from "react";
import projectModalStyle from "./projectModalOptions.module.scss";

export const ProjectModalOptions = ({
  handleCancelButton,
  handleEditButton,
  handleDeleteButton,
  projectName,
  projectID,
}) => {
  const [inputInvalid, setInputInvalid] = useState(true);
  function checkProjectNameInput(e) {
    const target = e.target;
    if (target.validity.valueMissing || target.value === "") {
      return setInputInvalid(true);
    }
    return setInputInvalid(false);
  }

  return (
    <>
      <div className={projectModalStyle.titleCloseBtn}>
        <h1>Edit Project</h1>
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
          onChange={checkProjectNameInput}
          name="projectName"
          id="newProjectName"
          placeholder={projectName}
        />

        <div className={projectModalStyle.buttons}>
          <button disabled={inputInvalid} type="submit">Save changes</button>
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
