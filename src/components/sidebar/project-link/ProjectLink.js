import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectModalOptions } from "../project-modal-options/ProjectModalOptions";

export const ProjectLink = ({
  to,
  projectName,
  projectData,
  deleteProject,
  editProject
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
          <motion.div layout className={projectLinkStyles.options}>
            <ProjectModalOptions
              handleDeleteButton={deleteProject}
              handleCancelButton={setOptions}
              handleEditButton={editProject}
              projectID={projectData.ID}
              projectName={projectData.projectName}
            />
          </motion.div>
        ) : (
          <NavLink className={`${projectLinkStyles.link}`} key={to} to={to}>
            {projectName}
            {isHovering ? (
              <button
                className={projectLinkStyles.optionsBtn}
                onClick={setOptions}
              />
            ) : (
              <p>{projectData.sectionTasks.length}</p>
            )}
          </NavLink>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
