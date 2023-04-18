import React from "react";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children }) => {
  return (
    <div id="page-content-container" className={`${pageLayoutStyles.contentContainer}`}>
      {children}
    </div>
  );
};
