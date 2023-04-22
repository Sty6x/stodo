import React, { useEffect, useState } from "react";
import { AddButton } from "../button/AddButton";
import { TaskForm } from "../task-form/TaskForm";
import pageLayoutStyles from "./pageLayout.module.scss";
export const PageLayout = ({ children, buttonText }) => {
  const [formActive, setFormActive] = useState(false);
  function formControl() {
    if (formActive) {
      setFormActive(false);
    } else {
      setFormActive(true);
    }
  }

  return (
    <div
      id="page-content-container"
      className={`${pageLayoutStyles.contentContainer}`}
    >
          {children}
      {formActive ? (
        <TaskForm  cancelBtn={formControl}/>
      ) : (
        <>
          <button
            className={`${pageLayoutStyles.button}`}
            onClick={formControl}
          >
            {buttonText}
          </button>
        </>
      )}
    </div>
  );
};
