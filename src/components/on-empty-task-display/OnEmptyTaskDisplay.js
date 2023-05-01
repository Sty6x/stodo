import React from "react";
import onEmptyTaskStyles from "./onEmptyTask.module.scss";
export const onEmptyTask = ({ pageText }) => {
  return (
    <div className={emptyTaskStyles.onEmptyTasksContainer}>
      <p>{pageText}</p>
    </div>
  );
};
