import React from "react";
import taskFormStyles from "./taskForm.module.scss";
import { motion } from "framer-motion";
import { Calendar} from 'primereact/calendar';
import {SelectButton} from 'primereact/selectbutton'
        
//theme
import '../../../assets/themes/mytheme/theme.scss' 
//core
import "primereact/resources/primereact.min.css";                                       

export const TaskForm = ({ formRef, onSubmitHandler, cancelBtn }) => {
  return (
    <motion.div
      initial={{opacity:0,y:100}}
      animate={{opacity:1,y:0}}
      exit={{opacity:0,y:50,transition:{duration:.1}}}
      className={taskFormStyles.taskFormContainer}>
      <form
        onSubmit={onSubmitHandler}
        ref={formRef}
        className={taskFormStyles.taskFormBody}
      >
        <div className={taskFormStyles.inputContainer}>
          <input name="title" placeholder="Title" id="title"></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <input name="desc" placeholder="Description" id="desc"></input>
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.selectPriority}`}
        >
          <label htmlFor="priority">Select Task Priority:</label>
          <SelectButton options={['low','medium','high']}/>
          {/* <select name="taskPriority"> */}
          {/*   <option value={"#008CFF"}>Low</option> */}
          {/*   <option value={"#F4C70A"}>Medium</option> */}
          {/*   <option value={"#FF2855"}>High</option> */}
          {/* </select> */}
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.dateInput}`}
        >
          {/* <label htmlFor="date">Date</label> */}
          {/* <input name="date" type="datetime-local" /> */}
          <Calendar name="date" value={new Date()} showIcon/>
        </div>
        <div className={taskFormStyles.addAndCancelBtn}>
          <button type="submit">Add task</button>
          <button type="button" onClick={cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};
