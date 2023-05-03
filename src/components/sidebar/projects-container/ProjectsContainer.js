import React, { useState, useEffect } from "react";
import projectsContainerStyle from "./projectsContainer.module.scss";
import { ProjectLinkInput } from "../project-link-input/ProjectLinkInput";
import { motion, AnimatePresence } from "framer-motion";
export const ProjectsContainer = ({
  newProjectRef,
  appenedProjectLinks,
  addProject,
  projectLinks,
}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(true);
  const [inputIsInactive, setInputIsInactive] = useState(true);

  useEffect(() => {
    console.log(projectLinks);
    setInputIsInactive(true);
    setIsDropDownActive(true);
  }, [projectLinks]);

  function setProjectOptionsActivity(setFunction, condition) {
    return condition ? setFunction(false) : setFunction(true);
  }

  return (
    <div className={projectsContainerStyle.projectContainer}>
      <div className={projectsContainerStyle.projectOptions}>
        <p>Projects</p>
        <motion.button
          animate={{ rotateZ: inputIsInactive ? 0 : 135 }}
          onClick={(e) => {
            setProjectOptionsActivity(setInputIsInactive, inputIsInactive);
          }}
        />
        <motion.button
          onClick={(e) => {
            setProjectOptionsActivity(setIsDropDownActive, isDropDownActive);
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
          <motion.ul
            layout
            initial={{ opacity: 0 }}
            animate={{ y: [-30, 0], opacity: 1 }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className={`${projectsContainerStyle.projectLinksContainer} ${
              isDropDownActive ? "dropDownActive" : "dropDownInactive"
            }`}
          >
            {appenedProjectLinks.length === 0 ? (
              <p>
                You don't have any projects, click the "<span>+</span>" to get
                started.
              </p>
            ) : (
              appenedProjectLinks
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
