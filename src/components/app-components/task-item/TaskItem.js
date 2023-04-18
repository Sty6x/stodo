import React from "react";
import taskItemStyles from "./taskItem.module.scss";

export const TaskItem = ({ task }) => {
  return (
    <div className={`${taskItemStyles.task}`}>
      <button className={`${taskItemStyles.doneBtn}`}/>
      <div className={`${taskItemStyles.priorityTitleDescContainer}`}>
        <div className={`${taskItemStyles.currentPriority}`}>
          <span className={`${taskItemStyles.low}`}></span>
          <span className={`${taskItemStyles.medium}`}></span>
          <span className={`${taskItemStyles.high}`}></span>
        </div>
      <h3>{task.title}<span>2:32pm</span></h3>
      <p>{task.description}</p>
      </div>
      <button className={`${taskItemStyles.taskOptions}`}/>
    </div>
  );
};
