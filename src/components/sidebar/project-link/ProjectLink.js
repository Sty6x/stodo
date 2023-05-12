import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectActions } from "../project-actions/ProjectActions";

export const ProjectLink = ({
  to,
  projectName,
  projectData,
  deleteProject,
  editProject,
}) => {
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
      <AnimatePresence mode="wait">
        {optionsIsActive ? (
          <ProjectActions
            handleDeleteButton={deleteProject}
            handleCancelButton={setOptions}
            handleEditButton={editProject}
            projectID={projectData.ID}
            projectName={projectData.projectName}
          />
        ) : (
          <NavLink className={`${projectLinkStyles.link}`} key={to} to={to}>
            {projectName}
            {isHovering ? (
              <motion.button
                className={projectLinkStyles.actionBtn}
                onClick={setOptions}
              >
                <span />
              </motion.button>
            ) : (
              <p>
                {projectData.sections.length !== 0
                  ? projectData.sections.length
                  : "Empty"}
              </p>
            )}
          </NavLink>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
