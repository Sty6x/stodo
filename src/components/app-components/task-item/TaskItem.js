import React, { useEffect, useState } from "react";
import taskItemStyles from "./taskItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { format, isSameDay, toDate } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { TaskForm } from "../task-form/TaskForm";

export const TaskItem = ({
  task: { title, dueDate, desc, dateAdded, ID, taskPriority },
  deleteTask,
}) => {
  const [editFormActive, setEditFormActive] = useState(false);

  function setEditForm(e) {
    e.preventDefault();
    return editFormActive ? setEditFormActive(false) : setEditFormActive(true);
  }

  return (
    <AnimatePresence mode="wait">
      {!editFormActive ? (
        <motion.li layout id={ID} className={`${taskItemStyles.taskItem}`}>
          <button
            onClick={(e) => deleteTask(ID)}
            className={`${taskItemStyles.doneBtn}`}
          />
          <div className={`${taskItemStyles.taskContentContainer}`}>
            <div className={`${taskItemStyles.currentPriority}`}>
              <span
                style={{ backgroundColor: taskPriority === "Low" && "#0BB385" }}
                className={`${taskItemStyles.low}`}
              ></span>
              <span
                style={{
                  backgroundColor: taskPriority === "Medium" && "#F4C70A",
                }}
                className={`${taskItemStyles.medium}`}
              ></span>
              <span
                style={{
                  backgroundColor: taskPriority === "High" && "#FF2855",
                }}
                className={`${taskItemStyles.high}`}
              ></span>
            </div>
            <h3>
              {title}
              <span>{format(new Date(dateAdded), "p")}</span>
            </h3>
            <p>{desc}</p>
            <p className={taskItemStyles.dueDate}>
              {isSameDay(new Date(dueDate), new Date())
                ? "Today"
                : format(new Date(dueDate), "PP")}
            </p>
          </div>
          <button
            onClick={setEditForm}
            className={`${taskItemStyles.taskOptions}`}
          />
        </motion.li>
      ) : (
        <TaskForm isEdit={true} formControl={setEditForm} />
      )}
    </AnimatePresence>
  );
};
