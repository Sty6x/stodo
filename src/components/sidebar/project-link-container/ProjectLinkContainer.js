import React, { useState } from "react";
import projectLinkContainerStyle from "./projectLinkContainer.module.scss";
import { motion } from "framer-motion";

export const ProjectLinkContainer = ({
  appenedProjectLinks,
  isDropDownActive,
}) => {

  return (
    <motion.ul
      layout
      initial={{ opacity: 0 }}
      animate={{ y: [-30, 0], opacity: 1 }}
      exit={{
        opacity: 0,
        y:  -30,
      }}
      className={`${projectLinkContainerStyle.projectLinksContainer} ${
        isDropDownActive ? "dropDownActive" : "dropDownInactive"
      }`}
    >
      {appenedProjectLinks.length === 0 ? <p>You don't have any projects, click the "<span>+</span>" to get started.</p>: appenedProjectLinks}
    </motion.ul>
  );
};
