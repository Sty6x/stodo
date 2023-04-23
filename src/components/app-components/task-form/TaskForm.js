import React from "react";
import taskFormStyles from "./taskForm.module.scss";

export const TaskForm = ({ formRef, onSubmitHandler, cancelBtn }) => {
  return (
    <div className={taskFormStyles.taskFormContainer}>
      <form className={taskFormStyles.taskFormBody}>
        <div className={taskFormStyles.inputContainer}>
          <input placeholder="Title" id="title"></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <input placeholder="Description" id="desc"></input>
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.selectPriority}`}
        >
          <label htmlFor="priority">Select Task Priority:</label>
          <select name="taskPriority">
            <option value={"#008CFF"}>Low</option>
            <option value={"#F4C70A"}>Medium</option>
            <option value={"#FF2855"}>High</option>
          </select>
        </div>
        <div
          className={`${taskFormStyles.inputContainer} ${taskFormStyles.dateInput}`}
        >
          <label htmlFor="date">Date</label>
          <input type="datetime-local" />
        </div>
        <div className={taskFormStyles.addAndCancelBtn}>
          <button type="button" onClick={onSubmitHandler}>Add task</button>
          <button type="button" onClick={cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
