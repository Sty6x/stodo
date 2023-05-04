import React from "react";
import projectTaskItemStyle from './projectTaskItem.module.scss'
import {motion} from 'framer-motion'

export const ProjectTaskItem = ({deleteTask,title,desc,dateAdded,ID,taskPriority})=>{
    return (<motion.li className={projectTaskItemStyle.projectTaskItem}>

      <button
        onClick={(e) => deleteTask(ID)}
        // className={`${taskItemStyles.doneBtn}`}
      />
      <div className={projectTaskItemStyle.taskContentContainer}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </motion.li>)
   }