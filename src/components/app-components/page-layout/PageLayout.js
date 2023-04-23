import React, { useEffect, useState } from "react";
import { AddButton } from "../button/AddButton";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonText }) => {
  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
      {children}
    </div>
  );
};
