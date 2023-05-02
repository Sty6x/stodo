import React, { useContext, useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { animate, AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { ProjectLink } from "./project-link/ProjectLink";
import { ProjectLinkInput } from "./project-link-input/ProjectLinkInput";
import { uid } from "uid";
import { FirebaseContext } from "../../App";
import { NavigationLinks } from "./sb-navigation-links/NavigationLinks";
import { ProjectLinkContainer } from "./project-link-list/ProjectLinkContainer";

export const Sidebar = ({ sbRef }) => {
  const { auth, db } = useContext(FirebaseContext);
  const [isDropDownActive, setIsDropDownActive] = useState(true);
  const [inputIsInactive, setInputIsInactive] = useState(true);
  const [projectLinks, setProjectLinks] = useState([]);
  const newProjectRef = useRef();

  async function addProject() {
    const projectDetail = newProjectRef.current;
    const newProject = {
      [projectDetail.name]: projectDetail.value,
      ID: uid(16),
      authorId: auth.currentUser.uid,
    };
    setProjectLinks((prev) => [...prev, newProject]);
  }

  useEffect(() => {
    console.log(projectLinks);
    setInputIsInactive(true);
  }, [projectLinks]);

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
        <div className={sidebarStyles.projectContainer}>
          <div className={sidebarStyles.projectOptions}>
            <p>Projects</p>
            <motion.button
              onClick={(e) => {
                return inputIsInactive
                  ? setInputIsInactive(false)
                  : setInputIsInactive(true);
              }}
            />
            <motion.button
              onClick={(e) => {
                if (isDropDownActive) {
                  setIsDropDownActive(false);
                } else {
                  setIsDropDownActive(true);
                }
              }}
              animate={{ rotateX: isDropDownActive ? 0 : 180 }}
              className={`projDropDownActive`}
            />
          </div>
          <AnimatePresence mode="wait">
            {isDropDownActive && <ProjectLinkContainer inputIsInactive={inputIsInactive} appenedProjectLinks={appenedProjectLinks} isDropDownActive={isDropDownActive} newProjectRef={newProjectRef} addProject={addProject} />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
