import React from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from "./projectSection.module.scss";
import { AddButton } from "../../button/AddButton";
import { ProjectTaskItem } from "../project-task-item/ProjectTaskItem";
import { motion } from "framer-motion";

export const ProjectSection = ({ sectionData }) => {
  const appendSectionTasks = sectionData.sectionTasks.map((task) => {
    return <ProjectTaskItem task={task} />;
  });
  return (
    <motion.section className={projectSectionStyle.section}>
      {/* tasks here that belong to a section */}
      <div className={projectSectionStyle.titleOption}>
        <h1>{sectionData.sectionName}</h1>
        <button />
      </div>
      <div className={projectSectionStyle.projectTaskContainer}>
        {appendSectionTasks}
      </div>
        <AddButton type={"project"} />
    </motion.section>
  );
};
