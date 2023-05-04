import React, { useEffect } from "react";
import projectTaskItemStyle from "./projectTaskItem.module.scss";
import { motion } from "framer-motion";

export const ProjectTaskItem = ({
  task: { deleteTask, title, desc, dateAdded, ID, taskPriority },
}) => {
  return (
    <motion.li
      className={projectTaskItemStyle.projectTaskItem}
      style={{
        borderRight: `10px solid ${
          (taskPriority == "High" && "#FF2855") ||
          (taskPriority == "Medium" && "#FFD10D") ||
          (taskPriority == "Low" && "#008CFF ")
        }`,
      }}
    >
      <button
        onClick={(e) => deleteTask(ID)}
        // className={`${taskItemStyles.doneBtn}`}
      />
      <div className={projectTaskItemStyle.taskContentContainer}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </motion.li>
  );
};
