import React, { useEffect, useRef, useState } from "react";
import sidebarStyles from "./sidebar.module.scss";
import { animate, AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";
import { ProjectLink } from "../project-link/ProjectLink";

export const Sidebar = ({ sbRef }) => {
  const [isDropDownActive, setIsDropDownActive] = useState(true);
  const [inputIsInactive, setInputIsInactive] = useState(true);

  useEffect(() => {
    console.log(isDropDownActive);
  }, [isDropDownActive]);

  async function addProjectLink(){
         
  }

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
            <motion.button onClick={e=>{
              return inputIsInactive ?  setInputIsInactive(false) : setInputIsInactive(true)
            }} />
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
          <AnimatePresence mode="wait" >
            {isDropDownActive && (
              <motion.ul
                initial={{opacity:0}}
                animate={{ y: [-50, 0],opacity:1 }}
                exit={{
                  opacity:0,
                  y: [10, -35],
                }}
                className={`${sidebarStyles.projectLinks} ${
                  isDropDownActive ? "dropDownActive" : "dropDownInactive"
                }`}
              >
                {!inputIsInactive && <p>Input Here</p>}
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
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
