import React from "react";
import taskItemStyles from './taskItem.module.scss'

export const TaskItem =({task})=>{
  return <div className={`${taskItemStyles.task}`}>
    <h3>{task.title}</h3>
    <p>{task.description}</p>
  </div>
}
