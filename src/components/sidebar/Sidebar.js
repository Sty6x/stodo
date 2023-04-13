import React from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = ({sbRef}) => {
  return (
    <motion.div ref={sbRef} className={`${sidebarStyles.sideBar} active`}>
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
          <p>Projects</p>
          <ul className={sidebarStyles.projectList}></ul>
        </div>
      </div>
    </motion.div>
  );
};
