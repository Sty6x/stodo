import React from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <motion.div className={sidebarStyles.sideBar}>
      <div className={sidebarStyles.contentsContainer}>
        <ul className={sidebarStyles.navigation}>
          <li className={sidebarStyles.today}>
            <Link to={"/app/today"}>Today</Link>
          </li>
          <li className={sidebarStyles.upcoming}>
            <Link to={"/app/upcoming"}>Upcoming</Link>
          </li>
          <li className={sidebarStyles.overdue}>
            <Link to={"/app/overdue"}>Overdue Tasks</Link>
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
