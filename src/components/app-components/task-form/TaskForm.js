import { React, useState } from "react";
import taskFormStyles from "./taskForm.module.scss";
import { motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

//theme
import "../../../assets/themes/mytheme/theme.scss";
//core
import "primereact/resources/primereact.min.css";

export const TaskForm = ({ isEdit = false, onSubmitHandler, formControl }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const taskPriorityOptions = ["Low", "Medium", "High"];
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);

  function checkRequiredInput(e) {
    const input = e.target;
    if (input.validity.valid) {
      return setBtnIsDisabled(false);
    }
    setBtnIsDisabled(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50, transition: { duration: 0.1 } }}
      className={taskFormStyles.taskFormContainer}
    >
      <form
        onSubmit={onSubmitHandler}
        className={taskFormStyles.taskFormBody}
        noValidate
      >
        <h1>Edit Task</h1>
        <div className={taskFormStyles.inputContainer}>
          <input
            onChange={checkRequiredInput}
            required
            name="title"
            placeholder="Title"
            id="title"
          ></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <textarea name="desc" placeholder="Description" id="desc" />
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.selectPriority}`}
        >
          {/* <label htmlFor="priority">Select Task Priority:</label> */}

          <Dropdown
            value={selectedOption}
            name="taskPriority"
            onChange={(e) => setSelectedOption(e.value)}
            options={taskPriorityOptions}
            placeholder="Select Task Priority"
          />
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.dateInput}`}
        >
          <Calendar
            showButtonBar
            value={new Date()}
            name="dueDate"
            placeholder="Add date"
            showIcon
          />
        </div>
        <div className={taskFormStyles.addAndCancelBtn}>
          <button disabled={btnIsDisabled} type="submit">
            Add task
          </button>
          <button type="button" onClick={formControl}>
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};
