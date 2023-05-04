import React from "react";
import addBtnStyles from "./addButton.module.scss";
import { formControl } from "../../../utils/useFormControl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TaskForm } from "../task-form/TaskForm";

export const AddButton = ({ addTask, type }) => {
  const [formActive, setFormActive] = useState(false);
  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
  }
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
          layout
          exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
          animate={{ y: [-20, 0], opacity: [0, 1] }}
          className={`${addBtnStyles.button}`}
          onClick={formControl}
        >
          {type}
        </motion.button>
      )}
    </AnimatePresence>
  );
};
