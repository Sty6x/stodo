import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import taskContainerStyles from "./taskContainer.module.scss";

export const TaskContainer = ({ children }) => {
  return (
    <AnimatePresence>
      <ul key={"taskContainer"} className={taskContainerStyles.container}>
        {children}
      </ul>
      ;
     </AnimatePresence> 
  );
};
