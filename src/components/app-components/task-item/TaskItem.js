import React from "react";
import taskItemStyles from './taskItem.module.scss'

export const TaskItem =({task})=>{
  return <div className={`${taskItemStyles.task}`}>
    Task
  </div>
}
