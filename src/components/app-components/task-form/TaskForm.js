import React from "react";
import taskFormStyles from "./taskForm.module.scss";

export const TaskForm = ({cancelBtn}) => {
  return (
    <div className={taskFormStyles.taskFormContainer}>
      <form className={taskFormStyles.taskFormBody}>
        <div className={taskFormStyles.inputContainer}>
          <label htmlFor="title">Title:</label>
          <input id="title"></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <label htmlFor="desc">Description:</label>
          <input id="desc"></input>
        </div>
        <div className={taskFormStyles.inputContainer}>
          <label htmlFor="priority">Select Task Priority:</label>
          <select name="taskPriority">
            <option value={"low"}>Low</option>
            <option value={"medium"}>Medium</option>
            <option value={"high"}>High</option>
          </select>
        </div>
          <div className={taskFormStyles.addAndCancelBtn}>
            <button>Add Task</button>
            <button onClick={cancelBtn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};