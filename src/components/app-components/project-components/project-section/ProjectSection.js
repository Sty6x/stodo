import React from "react";
import { TaskItem } from "../../task-item/TaskItem";

export const ProjectSection = ({ sectionData }) => {
  const appendSectionTasks = sectionData.sectionTasks.map(task=>{
    return <TaskItem task={task}/>
  })
  return (
    <section>
      {/* tasks here that belong to a section */}
      <h1>{sectionData.sectionName}</h1>
      <div>
        {appendSectionTasks}
      </div>
    </section>
  );
};
