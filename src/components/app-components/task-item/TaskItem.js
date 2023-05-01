import React, { useEffect } from "react";
import taskItemStyles from "./taskItem.module.scss";
import { motion } from "framer-motion";
import { format, toDate } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const TaskItem = ({
  task: { title, desc, dateAdded, ID, taskPriority },
  deleteTask,
}) => {
  return (
    <motion.li layout id={ID} className={`${taskItemStyles.task}`}>
      <button
        onClick={(e) => deleteTask(ID)}
        className={`${taskItemStyles.doneBtn}`}
      />
      <div className={`${taskItemStyles.taskContentContainer}`}>
        <div className={`${taskItemStyles.currentPriority}`}>
          <span
            style={{ backgroundColor: taskPriority === "Low" && "#008CFF" }}
            className={`${taskItemStyles.low}`}
          ></span>
          <span
            style={{ backgroundColor: taskPriority === "Medium" && "#F4C70A" }}
            className={`${taskItemStyles.medium}`}
          ></span>
          <span
            style={{ backgroundColor: taskPriority === "High" && "#FF2855" }}
            className={`${taskItemStyles.high}`}
          ></span>
        </div>
        <h3>
          {title}
          <span>{format(new Date(dateAdded), "p")}</span>
        </h3>
        <p>{desc}</p>
      </div>
      <button className={`${taskItemStyles.taskOptions}`} />
    </motion.li>
  );
};
