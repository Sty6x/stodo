import React, { useEffect } from "react";
import projectTaskItemStyle from "./projectTaskItem.module.scss";
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";

export const ProjectTaskItem = ({
  task: { deleteTask, dueDate, title, desc, ID, taskPriority },
}) => {
  return (
    <motion.li
      className={projectTaskItemStyle.projectTaskItem}
      style={{
        borderRight: `10px solid ${
          (taskPriority == "High" && "#FF2855") ||
          (taskPriority == "Medium" && "#FFD10D") ||
          (taskPriority == "Low" && "#0BB385")
        }`,
      }}
    >
      <div className={projectTaskItemStyle.buttonContainer}>
        <button onClick={(e) => deleteTask(ID)} />
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
    </motion.li>
  );
};
