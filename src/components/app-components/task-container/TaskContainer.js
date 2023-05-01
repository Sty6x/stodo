import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import taskContainerStyles from "./taskContainer.module.scss";

export const TaskContainer = ({ children , taskIsEmpty}) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.ul className={taskContainerStyles.container}>
        {children}
      </motion.ul>
    </AnimatePresence>
  );
};
