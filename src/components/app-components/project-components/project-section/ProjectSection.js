import React, { useContext, useEffect, useState } from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from "./projectSection.module.scss";
import { AddButton } from "../../button/AddButton";
import { ProjectTaskItem } from "../project-task-item/ProjectTaskItem";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectActions } from "../../../sidebar/project-actions/ProjectActions";
import { ProjectSectionActions } from "../project-section-actions/ProjectSectionActions";
import { ProjectPageContext } from "../../../../pages/app/Project";

export const ProjectSection = ({ sectionTasks, sectionData, addTask }) => {
  const [formActive, setFormActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [actionBtnActive, setActionBtnActive] = useState(false);
  const { editSection,deleteSection } = useContext(ProjectPageContext);

  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
  }

  function actionBtnControl() {
    return actionBtnActive
      ? setActionBtnActive(false)
      : setActionBtnActive(true);
  }

  function checkOwnTasks() {
    const filter = sectionTasks.filter(
      (task) => task.sectionOwnerIndex === sectionData.sectionIndex
    );
    setTasks(filter);
    console.log(filter);
  }

  useEffect(() => {
    checkOwnTasks();
    setFormActive(false);
  }, [sectionTasks]);

  const appendSectionTasks = tasks.map((task) => {
    return <ProjectTaskItem task={task} />;
  });
  return (
    <motion.section
      animate={{ y: [-30, 0] }}
      exit={{ y: [30] }}
      data-indexpos={sectionData.sectionIndex}
      className={projectSectionStyle.section}
    >
      <AnimatePresence mode="wait">
        {!actionBtnActive ? (
          <motion.div
            key={"sectionTitleAction"}
            className={projectSectionStyle.titleAction}
          >
            <h1>{sectionData.sectionTitle}</h1>
            <button
              className={projectSectionStyle.actionBtn}
              onClick={actionBtnControl}
            >
              <span />
            </button>
          </motion.div>
        ) : (
          <ProjectSectionActions
            sectionTitle={sectionData.sectionTitle}
            sectionIndex={sectionData.sectionIndex}
            handleCancelButton={actionBtnControl}
            handleDeleteButton={deleteSection}
            handleEditButton={editSection}
            name={'sectionTitle'}
          />
        )}
      </AnimatePresence>
      <div className={projectSectionStyle.projectTaskContainer}>
        {appendSectionTasks}
      </div>
      <AddButton
        addTask={addTask}
        formControl={formControl}
        formActive={formActive}
        type={"project"}
      />
    </motion.section>
  );
};
