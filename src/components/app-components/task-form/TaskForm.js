import { React, useState } from "react";
import taskFormStyles from "./taskForm.module.scss";
import { motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

//theme
import "../../../assets/themes/mytheme/theme.scss";
//core
import "primereact/resources/primereact.min.css";
import { format } from "date-fns";

export const TaskForm = ({
  currentTask,
  isEdit = false,
  onSubmitHandler,
  formControl,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    isEdit ? currentTask.taskPriority : null
  );
  const taskPriorityOptions = ["Low", "Medium", "High"];
  const [btnIsDisabled, setBtnIsDisabled] = useState(isEdit ? false : true);

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
        id={currentTask && currentTask.ID}
        onSubmit={onSubmitHandler}
        className={taskFormStyles.taskFormBody}
        noValidate
      >
        <div className={taskFormStyles.inputContainer}>
          <input
            onChange={checkRequiredInput}
            required
            name="title"
            id="title"
            placeholder={isEdit ? currentTask.title : "Title"}
            defaultValue={isEdit ? currentTask.title : ""}
          ></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <textarea
            name="desc"
            id="desc"
            placeholder={"Description"}
            defaultValue={isEdit ? currentTask.desc : ""}
          />
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.selectPriority}`}
        >
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
            value={isEdit ? new Date(currentTask.dueDate) : new Date()}
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
