import React from "react";
import taskContainerStyles from './taskContainer.module.scss'

export const TaskContainer =({children})=>{
  return <ul className={taskContainerStyles.container}>
    {children}
  </ul>
}


