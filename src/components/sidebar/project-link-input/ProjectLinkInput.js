import React from "react";
import projectLinkInputStyle from "./projectLinkInput.module.scss";
import { motion } from "framer-motion";
export const ProjectLinkInput = ({ inputRef, handleOnSubmit }) => {
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
          placeholder="Name"
        />
        <button
          className={projectLinkInputStyle.btn}
          onClick={handleOnSubmit}
        />
      </div>
    </motion.div>
  );
};
