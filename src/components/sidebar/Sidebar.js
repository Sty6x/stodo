import React, { useContext, useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import "./sidebar.scss";
import { ProjectLink } from "./project-link/ProjectLink";
import { NavigationLinks } from "./sb-navigation-links/NavigationLinks";
import { ProjectsContainer } from "./projects-container/ProjectsContainer";
import { ProjectLinkInput } from "./project-link-input/ProjectLinkInput";

export const Sidebar = ({
  editProject,
  deleteProject,
  addProject,
  inputRef,
  projectLinks,
  sbRef,
}) => {
  const [inputIsInactive, setInputIsInactive] = useState(true);
  const appenedProjectLinks = projectLinks.map((projectLink) => {
    return (
      <ProjectLink
        key={projectLink.projectName}
        to={`/app/${projectLink.ID}`}
        projectName={projectLink.projectName}
        projectData={projectLink}
        deleteProject={deleteProject}
        editProject={editProject}
      />
    );
  });

  return (
    <motion.div
      ref={sbRef}
      className={`${sidebarStyles.sideBar} sideBarActive`}
    >
      <div className={sidebarStyles.contentsContainer}>
        <NavigationLinks />
        <ProjectsContainer
          appenedProjectLinks={appenedProjectLinks}
          setInputIsInactive={setInputIsInactive}
          inputIsInactive={inputIsInactive}
          projectInput={
            <ProjectLinkInput
              setInputIsInactive={setInputIsInactive}
              inputRef={inputRef}
              handleOnSubmit={addProject}
            />
          }
          projectLinks={projectLinks}
        />
      </div>
    </motion.div>
  );
};
