import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import taskContainerStyles from "./taskContainer.module.scss";

export const TaskContainer = ({ children }) => {
  return (
    <motion.ul className={taskContainerStyles.container}>
      <AnimatePresence mode="popLayout" >{children}</AnimatePresence>
    </motion.ul>
  );
};
