import React from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";
import { motion } from "framer-motion";

export const ProjectLink = ({ to, projectName }) => {
  return (
    <motion.li
      layout
      animate={{ y: 0, opacity: 1 }}
      className={`${projectLinkStyles.linkContainer}`}
      key={projectName}
    >
      <NavLink className={`${projectLinkStyles.link}`} key={to} to={to}>
        {projectName}
      </NavLink>
    </motion.li>
  );
};
