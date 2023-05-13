import React, { useEffect, useState } from "react";
import projectTaskItemStyle from "./projectTaskItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { TaskForm } from "../../task-form/TaskForm";

export const ProjectTaskItem = ({
  task: { dueDate, title, desc, ID, taskPriority, sectionOwnerIndex }, deleteTask
}) => {

  const [actionActive, setActionActive] = useState(false);

  function actionControl(e) {
    // e.stopImmediatePropagation()
    return actionActive ? setActionActive(false) : setActionActive(true)
  }

  useEffect(() => {
    console.log(actionActive)
  }, [actionActive])

  return (
    <AnimatePresence mode="wait">
      {!actionActive ?
        <motion.li
          key={ID}
          animate={{ opacity: 1, y: [-20, 0] }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
          onClick={actionControl}
          className={projectTaskItemStyle.projectTaskItem}
          style={{
            borderRight: `10px solid ${(taskPriority == "High" && "#FF2855") ||
              (taskPriority == "Medium" && "#FFD10D") ||
              (taskPriority == "Low" && "#0BB385")
              }`,
          }}
        >
          <div className={projectTaskItemStyle.buttonContainer}>
            <button onClick={(e) => { deleteTask(e, ID) }} />
          </div>
          <div className={projectTaskItemStyle.taskContentContainer}>
            <h3>{title}</h3>
            <p>{desc}</p>
            {dueDate && (
              <p className={projectTaskItemStyle.dueDate}>
                {isSameDay(new Date(dueDate), new Date())
                  ? "Today"
                  : format(new Date(dueDate), "PP")}
              </p>
            )}
          </div>
        </motion.li> :
        <TaskForm formControl={actionControl} />}
    </AnimatePresence>
  );
};
