import React, { useContext, useEffect } from "react";
import addBtnStyles from "./addButton.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskForm } from "../task-form/TaskForm";
import { TaskDatabaseContext } from "../../../pages/app/App";

export const AddButton = ({formActive, formControl, addTask, type = "default" }) => {
  const { tasks } = useContext(TaskDatabaseContext);

  return (
    <AnimatePresence mode="wait">
      {formActive ? (
        <TaskForm
          key={"taskForm"}
          formControl={formControl}
          onSubmitHandler={addTask}
        />
      ) : (
        <motion.button
          style={{ color: type === "project" ? "#575757" : "#FFFFFF" }}
          // layout
          exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
          animate={{ y: [-20, 0], opacity: [0, 1] }}
          className={`${addBtnStyles.button}`}
          onClick={formControl}
        >
          Add Task
        </motion.button>
      )}
    </AnimatePresence>
  );
};
