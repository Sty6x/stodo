import React, { useEffect, useState } from "react";
import projectTaskItemStyle from "./projectTaskItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { TaskForm } from "../../task-form/TaskForm";

export const ProjectTaskItem = ({
  task, deleteTask
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
          whileHover={{ scale: 1.02 }}
          key={task.ID}
          animate={{ opacity: 1, y: [-20, 0] }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
          onClick={actionControl}
          className={projectTaskItemStyle.projectTaskItem}
          style={{
            borderRight: `10px solid ${(task.taskPriority == "High" && "#FF2855") ||
              (task.taskPriority == "Medium" && "#FFD10D") ||
              (task.taskPriority == "Low" && "#0BB385")
              }`,
          }}
        >
          <div className={projectTaskItemStyle.buttonContainer}>
            <button onClick={(e) => { deleteTask(e, task.ID) }} />
          </div>
          <div className={projectTaskItemStyle.taskContentContainer}>
            <h3>{task.title}</h3>
            <p>{task.desc}</p>
            {task.dueDate && (
              <p className={projectTaskItemStyle.dueDate}>
                {isSameDay(new Date(task.dueDate), new Date())
                  ? "Today"
                  : format(new Date(task.dueDate), "PP")}
              </p>
            )}
          </div>
        </motion.li> :
        <TaskForm currentTask={task} formControl={actionControl} isEdit={true} />}
    </AnimatePresence>
  );
};
