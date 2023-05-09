import React, { useContext, useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import "./sidebar.scss";
import { ProjectLink } from "./project-link/ProjectLink";
import { uid } from "uid";
import { FirebaseContext } from "../../App";
import { NavigationLinks } from "./sb-navigation-links/NavigationLinks";
import { ProjectsContainer } from "./projects-container/ProjectsContainer";
import { ProjectLinkInput } from "./project-link-input/ProjectLinkInput";

export const Sidebar = ({ addProject, inputRef, projectLinks, sbRef }) => {

  const appenedProjectLinks = projectLinks.map((projectLink) => {
    return (
      <ProjectLink
        key={projectLink.projectName}
        to={`/app/${projectLink.ID}`}
        totalTasks={projectLink.sectionTasks.length}
        projectName={projectLink.projectName}
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
          projectInput={
            <ProjectLinkInput inputRef={inputRef} handleOnSubmit={addProject} />
          }
          projectLinks={projectLinks}
        />
      </div>
    </motion.div>
  );
};
