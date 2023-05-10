import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";
import { motion } from "framer-motion";
import { ProjectLinkOptions } from "../project-link-options/ProjectLinkOptions";

export const ProjectLink = ({ to, projectName, projectData,deleteProject }) => {
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
        e.stopPropagation();
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
          <div id={projectData.ID} className={projectLinkStyles.options}>
            <ProjectLinkOptions handleCancelButton={setOptions} handleDeleteButton={deleteProject} />
          </div>
        ) : (
          <>
            {isHovering ? (
              <button
                className={projectLinkStyles.optionsBtn}
                onClick={setOptions}
              />
            ) : (
              <p>{projectData.sectionTasks.length}</p>
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
};
