import React from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from './projectSection.module.scss'

export const ProjectSection = ({ sectionData }) => {
  const appendSectionTasks = sectionData.sectionTasks.map((task) => {
    return <TaskItem task={task} />;
  });
  return (
    <section className={projectSectionStyle.section}>
      {/* tasks here that belong to a section */}
      <h1>{sectionData.sectionName}</h1>
      <div>{appendSectionTasks}</div>
    </section>
  );
};
