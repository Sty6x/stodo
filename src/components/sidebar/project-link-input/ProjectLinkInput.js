import React, { useState } from "react";
import projectLinkInputStyle from "./projectLinkInput.module.scss";
import { animate, motion } from "framer-motion";
export const ProjectLinkInput = ({ inputRef, handleOnSubmit }) => {
  const [inputInvalid, setInputInvalid] = useState(true);

  function checkProjectNameInput(e) {
    const target = e.target;
    if (target.validity.valueMissing || target.value === "") {
      return setInputInvalid(true);
    }
    return setInputInvalid(false);
  }

  return (
    <motion.div
      key={"projectLinkInput"}
      className={projectLinkInputStyle.container}
    >
      <label htmlFor="projectName">Project Name</label>
      <input
        ref={inputRef}
        className={projectLinkInputStyle.projectLinkName}
        type={"text"}
        id="projectName"
        name="projectName"
        placeholder={inputInvalid ? "Name your project" : "Name"}
        onChange={checkProjectNameInput}
      />
      <span className={projectLinkInputStyle.buttonContainer}>
        <motion.button
          disabled={inputInvalid}
          className={projectLinkInputStyle.add}
          onClick={handleOnSubmit}
        >
          Add Project
        </motion.button>
        <button className={projectLinkInputStyle.cancel}> Cancel</button>
      </span>
    </motion.div>
  );
};
