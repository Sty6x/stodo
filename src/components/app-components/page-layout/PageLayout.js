import React from "react";
import { AddButton } from "../button/AddButton";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonText, handleBtnClick }) => {
  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {children}
    <button className={pageLayoutStyles.button} onClick={handleBtnClick}>
      {buttonText}
    </button>
    </div>
  );
};
