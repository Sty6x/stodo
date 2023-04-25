import {React, useState } from "react";
import taskFormStyles from "./taskForm.module.scss";
import { motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

//theme
import "../../../assets/themes/mytheme/theme.scss";
//core
import "primereact/resources/primereact.min.css";

export const TaskForm = ({ formRef, onSubmitHandler, cancelBtn }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const taskPriorityOptions = ['Low','Medium','High']

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50, transition: { duration: 0.1 } }}
      className={taskFormStyles.taskFormContainer}
    >
      <form
        onSubmit={onSubmitHandler}
        ref={formRef}
        className={taskFormStyles.taskFormBody}
      >
        <div className={taskFormStyles.inputContainer}>
          <input name="title" placeholder="Title" id="title"></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <textarea name="desc" placeholder="Description" id="desc"/>
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.selectPriority}`}
        >
          {/* <label htmlFor="priority">Select Task Priority:</label> */}

          <Dropdown
            value={selectedOption}
            name='taskPriority'
            onChange={(e) => setSelectedOption(e.value)}
            options={taskPriorityOptions}
            placeholder="Select Task Priority"
          />
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.dateInput}`}
        >
          {/* <label htmlFor="date">Date</label> */}
          {/* <input name="date" type="datetime-local" /> */}
          <Calendar name="date" placeholder="Add date" showIcon />
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
