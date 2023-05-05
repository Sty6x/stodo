import React, { useContext, useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import "./sidebar.scss";
import { ProjectLink } from "./project-link/ProjectLink";
import { uid } from "uid";
import { FirebaseContext } from "../../App";
import { NavigationLinks } from "./sb-navigation-links/NavigationLinks";
import { ProjectsContainer } from "./projects-container/ProjectsContainer";

export const Sidebar = ({ setProjectLinks, projectLinks, sbRef }) => {
  const { auth } = useContext(FirebaseContext);
  const newProjectRef = useRef();

  async function addProject() {
    const projectDetail = newProjectRef.current;
    const newProject = {
      [projectDetail.name]: projectDetail.value,
      ID: uid(16),
      authorId: auth.currentUser.uid,
      sections: [
        {
          sectionTitle: "Section Title",
          sectionTasks: [],
          sectionIndex:0,
        },

        {
          sectionTitle: "Section Title",
          sectionTasks: [],
          sectionIndex:1,
        },
      ],
    };
    setProjectLinks((prev) => [...prev, newProject]);
  }

  const appenedProjectLinks = projectLinks.map((projectLink) => {
    return (
      <ProjectLink
        key={projectLink.projectName}
        to={`/app/${projectLink.ID}`}
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
          newProjectRef={newProjectRef}
          addProject={addProject}
          projectLinks={projectLinks}
        />
      </div>
    </motion.div>
  );
};
