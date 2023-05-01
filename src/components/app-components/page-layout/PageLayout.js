import React, { useEffect, useState } from "react";
import { OnEmptyTaskDisplay } from "../../on-empty-task-display/OnEmptyTaskDisplay";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonText,onEmptyText, taskIsEmpty }) => {
  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {children}
      {taskIsEmpty && <OnEmptyTaskDisplay pageText={onEmptyText}/>}
    </div>
  );
};
