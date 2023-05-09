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
          sectionIndex: 0,
        },

        {
          sectionTitle: "Section Title",
          sectionIndex: 1,
        },
      ],

      sectionTasks: [
        { title: "Hey", ID: "placeholder", sectionOwnerIndex: 0 },
        {
          title: "Start by clicking on add task",
          ID: "placeholder",
          sectionOwnerIndex: 1,
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
            <ProjectLinkInput
              inputRef={newProjectRef}
              handleOnSubmit={addProject}
            />
          }
          projectLinks={projectLinks}
        />
      </div>
    </motion.div>
  );
};
