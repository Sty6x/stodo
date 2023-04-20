import React from "react";
import taskItemStyles from "./taskItem.module.scss";
import {taskModel} from '../../../model/taskModel.js'
import PropTypes from 'prop-types'

export const TaskItem = ({ task }) => {
  
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
          {task.title}
          <span>{task.time}</span>
        </h3>
        <p>{task.description}</p>
      </div>
      <button className={`${taskItemStyles.taskOptions}`} />
    </li>
  );
};


