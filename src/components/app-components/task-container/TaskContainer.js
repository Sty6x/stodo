import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import taskContainerStyles from "./taskContainer.module.scss";

export const TaskContainer = ({ children }) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.ul layout className={taskContainerStyles.container}>
        <AnimatePresence initial={false} mode="popLayout">{children}</AnimatePresence>
      </motion.ul>
    </AnimatePresence>
  );
};
