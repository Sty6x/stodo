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
      sectionPopulate: [
        {
          sectionName: "Section one",
          sectionTasks: [
            {
              title: "Task one",
              priority: "high",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "Task Two",
              priority: "low",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "Task Three",
              priority: "Medium",
              dateAdded: "05/04/2023, 8:45 AM",
            },
          ],
        },
        {
          sectionName: "Section two",
          sectionTasks: [
            {
              title: "two-Task one",
              priority: "high",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "two-Task Two",
              priority: "low",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "two-Task Three",
              priority: "Medium",
              dateAdded: "05/04/2023, 8:45 AM",
            },
          ],
        },
        {
          sectionName: "Section three",
          sectionTasks: [
            {
              title: "three-Task one",
              priority: "high",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "three-Task Two",
              priority: "low",
              dateAdded: "05/04/2023, 8:45 AM",
            },
            {
              title: "three-Task Three",
              priority: "Medium",
              dateAdded: "05/04/2023, 8:45 AM",
            },
          ],
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
