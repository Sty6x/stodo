import React, { useState, useEffect } from "react";
import projectsContainerStyle from "./projectsContainer.module.scss";
import { ProjectLinkContainer } from "../project-link-container/ProjectLinkContainer";
import { ProjectLinkInput } from "../project-link-input/ProjectLinkInput";
import { motion, AnimatePresence } from "framer-motion";
export const ProjectsContainer = ({
  newProjectRef,
  appenedProjectLinks,
  addProject,
  projectLinks,
}) => {
  const [isDropDownActive, setIsDropDownInactive] = useState(true);
  const [inputIsInactive, setInputIsInactive] = useState(true);

  useEffect(() => {
    console.log(projectLinks);
    setInputIsInactive(true);
  }, [projectLinks]);

  function setProjectOptionsActivity(setFunction, condition) {
    return condition ? setFunction(false) : setFunction(true);
  }

  return (
    <div className={projectsContainerStyle.projectContainer}>
      <div className={projectsContainerStyle.projectOptions}>
        <p>Projects</p>
        <motion.button
          onClick={(e) => {
            setProjectOptionsActivity(setInputIsInactive, inputIsInactive);
          }}
        />
        <motion.button
          onClick={(e) => {
            setProjectOptionsActivity(setIsDropDownInactive, isDropDownActive);
          }}
          animate={{ rotateX: isDropDownActive ? 0 : 180 }}
          className={`projDropDownActive`}
        />
      </div>
      {!inputIsInactive && (
        <ProjectLinkInput
          handleOnSubmit={addProject}
          inputRef={newProjectRef}
        />
      )}

      <AnimatePresence mode="wait">
        {isDropDownActive && (
          <ProjectLinkContainer
            appenedProjectLinks={appenedProjectLinks}
            isDropDownActive={isDropDownActive}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
