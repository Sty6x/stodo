import React from "react";
import taskItemStyles from "./taskItem.module.scss";
import { motion } from "framer-motion";

export const TaskItem = ({ task: { title, desc, time, id }, deleteTask }) => {
  return (
    <motion.li
      layout
      exit={{ x: 60, opacity: 0, transition: { duration: 0.3,type:'spring'} }}
      animate={{ x: [-100, 0], opacity: [0, 1] }}
      id={id}
      className={`${taskItemStyles.task}`}
    >
      <button
        onClick={(e) => deleteTask(id)}
        className={`${taskItemStyles.doneBtn}`}
      />
      <div className={`${taskItemStyles.taskContentContainer}`}>
        <div className={`${taskItemStyles.currentPriority}`}>
          <span className={`${taskItemStyles.low}`}></span>
          <span className={`${taskItemStyles.medium}`}></span>
          <span className={`${taskItemStyles.high}`}></span>
        </div>
        <h3>
          {title}
          <span>{time}</span>
        </h3>
        <p>{desc}</p>
      </div>
      <button className={`${taskItemStyles.taskOptions}`} />
    </motion.li>
  );
};
