import React, { useEffect, useState } from "react";
import { OnEmptyTaskDisplay } from "../../on-empty-task-display/OnEmptyTaskDisplay";
import pageLayoutStyles from "./pageLayout.module.scss";
import { motion } from "framer-motion";
export const PageLayout = ({ children, buttonText,onEmptyText, taskIsEmpty }) => {
  return (
    <motion.div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {taskIsEmpty && <OnEmptyTaskDisplay pageText={onEmptyText}/>}
      {children}
    </motion.div>
  );
};
