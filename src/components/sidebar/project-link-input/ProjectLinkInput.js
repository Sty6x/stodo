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
      <div className={projectLinkInputStyle.inputAndBtnContainer}>
        <input
          ref={inputRef}
          className={projectLinkInputStyle.name}
          type={"text"}
          id="projectName"
          name="projectName"
          placeholder={inputInvalid ? "Name your project" : "Name"}
          onChange={checkProjectNameInput}
        />
        {}
        <motion.button
          initial={{ x: 0 }}
          animate={{
            rotateZ: inputInvalid ? 45 : 0,
            transition: { duration: 0.2, type: "spring" },
          }}
          disabled={inputInvalid}
          className={projectLinkInputStyle.btn}
          onClick={handleOnSubmit}
        />
      </div>
    </motion.div>
  );
};
