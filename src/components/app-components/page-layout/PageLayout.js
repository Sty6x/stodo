import React from "react";
import { AddButton } from "../button/AddButton";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonType, handleBtnClick }) => {
  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {children}
      <AddButton type={buttonType} handleClick={handleBtnClick} />
    </div>
  );
};
