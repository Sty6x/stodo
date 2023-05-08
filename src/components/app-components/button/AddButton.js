import React, { useContext, useEffect } from "react";
import addBtnStyles from "./addButton.module.scss";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskForm } from "../task-form/TaskForm";
import { TaskDatabaseContext } from "../../../pages/app/App";

export const AddButton = ({ addTask, type = "default" }) => {
  const [formActive, setFormActive] = useState(false);
  const { tasks } = useContext(TaskDatabaseContext);
  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
  }

  useEffect(() => {
    setFormActive(false);
  }, [tasks]);

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
          layout
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
