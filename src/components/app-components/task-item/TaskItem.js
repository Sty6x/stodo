import React, { useContext, useEffect, useState } from "react";
import taskItemStyles from "./taskItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { format, isSameDay, toDate } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { TaskForm } from "../task-form/TaskForm";
import { TaskDatabaseContext } from "../../../pages/app/App";

export const TaskItem = ({ task }) => {
  const [editFormActive, setEditFormActive] = useState(false);
  const {deleteTask, editTask} = useContext(TaskDatabaseContext)

  function setEditForm(e) {
    e.preventDefault();
    return editFormActive ? setEditFormActive(false) : setEditFormActive(true);
  }

  return (
    <AnimatePresence mode="wait">
      {!editFormActive ? (
        <motion.li layout id={task.ID} className={`${taskItemStyles.taskItem}`}>
          <button
            onClick={(e) => deleteTask(task.ID)}
            className={`${taskItemStyles.doneBtn}`}
          />
          <div className={`${taskItemStyles.taskContentContainer}`}>
            <div className={`${taskItemStyles.currentPriority}`}>
              <span
                style={{
                  backgroundColor: task.taskPriority === "Low" && "#0BB385",
                }}
                className={`${taskItemStyles.low}`}
              ></span>
              <span
                style={{
                  backgroundColor: task.taskPriority === "Medium" && "#F4C70A",
                }}
                className={`${taskItemStyles.medium}`}
              ></span>
              <span
                style={{
                  backgroundColor: task.taskPriority === "High" && "#FF2855",
                }}
                className={`${taskItemStyles.high}`}
              ></span>
            </div>
            <h3>
              {task.title}
              <span>{format(new Date(task.dateAdded), "p")}</span>
            </h3>
            <p>{task.desc}</p>
            <p className={taskItemStyles.dueDate}>
              {isSameDay(new Date(task.dueDate), new Date())
                ? "Today"
                : format(new Date(task.dueDate), "PP")}
            </p>
          </div>
          <button
            onClick={setEditForm}
            className={`${taskItemStyles.taskOptions}`}
          />
        </motion.li>
      ) : (
        <TaskForm onSubmitHandler={editTask} isEdit={true} currentTask={task} formControl={setEditForm} />
      )}
    </AnimatePresence>
  );
};
