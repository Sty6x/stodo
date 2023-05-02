import React from "react";
import projectLinkStyle from "./projectLinkInput.module.scss";
import { motion} from 'framer-motion'
export const ProjectLinkInput = ({inputRef ,handleOnSubmit}) => {
  return (
    <motion.div key={'projectLinkInput'} className={projectLinkStyle.container}>
      <label htmlFor="projectName">Project Name</label>
      <input
        ref={inputRef}
        className={projectLinkStyle.name}
        type={"text"}
        id="prjectName"
        name="projectName"
      />
      <button className={projectLinkStyle.btn} onClick={handleOnSubmit} />
    </motion.div>
  );
};
