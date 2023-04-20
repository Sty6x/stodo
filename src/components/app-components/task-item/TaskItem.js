import React from "react";
import taskItemStyles from "./taskItem.module.scss";
import PropTypes from "prop-types";

export const TaskItem = ({ task: { title, desc, time } }) => {
  return (
    <li className={`${taskItemStyles.task}`}>
      <button className={`${taskItemStyles.doneBtn}`} />
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
    </li>
  );
};


