import React from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from "./projectSection.module.scss";
import { AddButton } from "../../button/AddButton";
import { ProjectTaskItem } from "../project-task-item/ProjectTaskItem";
export const ProjectSection = ({ sectionData }) => {
  const appendSectionTasks = sectionData.sectionTasks.map((task) => {
    return <ProjectTaskItem task={task} />;
  });
  return (
    <section className={projectSectionStyle.section}>
      {/* tasks here that belong to a section */}
      <h1>{sectionData.sectionName}</h1>
      <div>
        {appendSectionTasks}
        <AddButton type={"add task"} />
      </div>
    </section>
  );
};
