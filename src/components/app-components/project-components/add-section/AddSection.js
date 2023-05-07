import React, { useContext, useState } from "react";
import addSectionStyle from "./addSection.module.scss";
import { ProjectPageContext } from "../../../../pages/app/Project";
import { AnimatePresence, motion } from "framer-motion";

export const AddSection = ({ sectionInputRef, addSec }) => {
  const { addSection } = useContext(ProjectPageContext);
  const [inputActive, setInputActive] = useState(false);
  const [inputInvalid, setInputInvalid] = useState(true);

  function checkSectionNameInput(e) {
    const target = e.target;
    if (target.validity.valueMissing || target.value === "") {
      return setInputInvalid(true);
    }
    return setInputInvalid(false);
  }

  return (
    <AnimatePresence mode="wait">
      {inputActive ? (
        <motion.div
          layout
          key={"sectionTitleInput"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.1 } }}
          className={addSectionStyle.sectionInputContainer}
          onChange={checkSectionNameInput}
        >
          <input ref={sectionInputRef} placeholder={"Section Name"} />
          <div className={addSectionStyle.buttonContainer}>
            <button className={addSectionStyle.add} disabled={inputInvalid}>
              Add Section
            </button>
            <button
              className={addSectionStyle.cancel}
              onClick={(e) => {
                setInputActive(false);
              }}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          key={"addSectionBtn"}
          exit={{ y: -20, opacity: 0, transition: { duration: 0.1 } }}
          animate={{ y: [-20, 0], opacity: [0, 1] }}
          onClick={(e) => {
            setInputActive(true);
          }}
          className={addSectionStyle.addSectionButton}
        >
          <span>Add Section</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
