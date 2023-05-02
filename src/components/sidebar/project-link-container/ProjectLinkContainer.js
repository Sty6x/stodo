import React, { useState } from "react";
import projectLinkContainerStyle from "./projectLinkContainer.module.scss";
import { motion } from "framer-motion";
import { ProjectLinkInput } from "../project-link-input/ProjectLinkInput";

export const ProjectLinkContainer = ({

  appenedProjectLinks,
  isDropDownActive,
}) => {

  return (
    <motion.ul
      layout
      initial={{ opacity: 0 }}
      animate={{ y: [-50, 0], opacity: 1 }}
      exit={{
        opacity: 0,
        y: [10, -35],
      }}
      className={`${projectLinkContainerStyle.projectLinks} ${
        isDropDownActive ? "dropDownActive" : "dropDownInactive"
      }`}
    >
           {appenedProjectLinks}
    </motion.ul>
  );
};
