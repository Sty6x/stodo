import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";
import { motion } from "framer-motion";
import { ProjectLinkOptions } from "../project-link-options/ProjectLinkOptions";

export const ProjectLink = ({ to, projectName, totalTasks }) => {
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  function setOptions(e) {
    e.preventDefault();
    return optionsIsActive
      ? setOptionsIsActive(false)
      : setOptionsIsActive(true);
  }

  return (
    <motion.li
      onHoverStart={(e) => {
        setIsHovering(true);
      }}
      onHoverEnd={(e) => {
        setIsHovering(false);
      }}
      layout
      animate={{ y: 0, opacity: 1 }}
      className={`${projectLinkStyles.linkContainer}`}
      key={projectName}
    >
      <NavLink className={`${projectLinkStyles.link}`} key={to} to={to}>
        {projectName}
        {optionsIsActive ? (
          <span>
            <ProjectLinkOptions handleCancelButton={setOptions} />
          </span>
        ) : (
          <>
            {isHovering ? (
              <button
                className={projectLinkStyles.options}
                onClick={setOptions}
              />
            ) : (
              <p>{totalTasks}</p>
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
};
