import React, { useContext, useState } from "react";
import addSectionStyle from "./addSection.module.scss";
import { ProjectPageContext } from "../../../../pages/app/Project";
import { AnimatePresence, motion } from "framer-motion";

export const AddSection = () => {
  const { addSection } = useContext(ProjectPageContext);
  const [inputActive, setInputActive] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {inputActive ? (
        <motion.div
          layout
          key={"sectionTitleInput"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, transition: { duration: 0.1 } }}
        >
          <label>Section Name:</label>
          <input />
          <button>Add Section</button>
          <button
            onClick={(e) => {
              setInputActive(false);
            }}
          >
            Cancel
          </button>
        </motion.div>
      ) : (
        <motion.button
          key={"addSectionBtn"}
          // layout
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
