import React from "react";
import sidebarStyles from "./sidebar.module.scss";
import { motion } from "framer-motion";

export const Sidebar = () => {
  return <motion.div className={sidebarStyles.sideBar}>Sidebar</motion.div>;
};
