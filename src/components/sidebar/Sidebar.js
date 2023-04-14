import React, { useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { animate, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { ProjectLink } from "./projects/ProjectLink";

export const Sidebar = ({ sbRef }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(true);

  useEffect(() => {
    console.log(isDropDownActive);
  }, [isDropDownActive]);

  function showProjectDropDown(e) {}

  return (
    <motion.div
      ref={sbRef}
      className={`${sidebarStyles.sideBar} sideBarActive`}
    >
      <div className={sidebarStyles.contentsContainer}>
        <ul className={sidebarStyles.navigation}>
          <li className={sidebarStyles.today}>
            <NavLink to={"/app/today"}>Today</NavLink>
          </li>
          <li className={sidebarStyles.upcoming}>
            <NavLink to={"/app/upcoming"}>Upcoming</NavLink>
          </li>
          <li className={sidebarStyles.overdue}>
            <NavLink to={"/app/overdue"}>Overdue Tasks</NavLink>
          </li>
        </ul>
        <div className={sidebarStyles.projectContainer}>
          <div className={sidebarStyles.projectOptions}>
            <p>Projects</p>
            <motion.button />
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
          <ul className={sidebarStyles.projectList}>
            <ProjectLink
              to={"/app/projectId1"}
              projectName={"First Project"}
            />
            <ProjectLink
              to={"/app/projectId2"}
              projectName={"Second Project"}
            />
            <ProjectLink
              to={"/app/projectId3"}
              projectName={"Third Project"}
            />
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
