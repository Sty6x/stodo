import React, { useEffect, useState } from "react";
import { OnEmptyTaskDisplay } from "../../on-empty-task-display/OnEmptyTaskDisplay";
import pageLayoutStyles from "./pageLayout.module.scss";
import { AnimatePresence, motion } from "framer-motion";
export const PageLayout = ({ children, onEmptyText, pageTasks }) => {
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
      {isEmpty ? (
        <OnEmptyTaskDisplay key={"emptyTaskDisplay"} pageText={onEmptyText} />
      ) : (
        children
      )}
    </motion.section>
  );
};
