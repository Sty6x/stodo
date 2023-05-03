import React from "react";
import onEmptyTaskStyles from "./onEmptyTaskDisplay.module.scss";
export const OnEmptyTaskDisplay = ({ pageText }) => {
  return (
    <div className={onEmptyTaskStyles.onEmptyTasksContainer}>
      <p>{pageText}</p>
    </div>
  );
};
