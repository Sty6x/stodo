import React, { useEffect, useState } from "react";
import { OnEmptyTaskDisplay } from "../../on-empty-task-display/OnEmptyTaskDisplay";
import pageLayoutStyles from "./pageLayout.module.scss";
import { motion } from "framer-motion";
export const PageLayout = ({
  children,
  buttonText,
  onEmptyText,
  pageTasks,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);

  function checkTaskPresence(tasks) {
    return tasks.length !== 0 ? setIsEmpty(false) : setIsEmpty(true);
  }

  useEffect(() => {
    checkTaskPresence(pageTasks);
  }, [pageTasks]);

  return (
    <motion.section
      id="page-layout"
      className={`${pageLayoutStyles.pageLayout}`}
    >
      {children}
      {isEmpty && <OnEmptyTaskDisplay pageText={onEmptyText} />}
    </motion.section>
  );
};
