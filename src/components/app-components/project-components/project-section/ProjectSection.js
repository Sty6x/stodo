import React, { useState } from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from "./projectSection.module.scss";
import { AddButton } from "../../button/AddButton";
import { ProjectTaskItem } from "../project-task-item/ProjectTaskItem";
import { motion } from "framer-motion";

export const ProjectSection = ({ sectionData, addTask }) => {
  const [formActive, setFormActive] = useState(false);
  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
  }

  const appendSectionTasks = sectionData.sectionTasks.map((task) => {
    return <ProjectTaskItem task={task} />;
  });
  return (
    <motion.section data-indexpos={sectionData.sectionIndex} className={projectSectionStyle.section}>
      {/* tasks here that belong to a section */}
      <div className={projectSectionStyle.titleOption}>
        <h1>{sectionData.sectionTitle}</h1>
        <button />
      </div>
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
