import React, { useEffect, useState } from "react";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonText, taskIsEmpty }) => {
  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {children}

      {taskIsEmpty && (
        <p className={pageLayoutStyles.emptyDisplay}>
          Looks like you're done for today, good job!
        </p>
      )}
    </div>
  );
};
