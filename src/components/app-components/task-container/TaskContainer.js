import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import taskContainerStyles from "./taskContainer.module.scss";

export const TaskContainer = ({ children }) => {
  return (
    <ul className={taskContainerStyles.container}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </ul>
  );
};
