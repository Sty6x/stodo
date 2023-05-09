import React, { useEffect, useState } from "react";
import { TaskItem } from "../../task-item/TaskItem";
import projectSectionStyle from "./projectSection.module.scss";
import { AddButton } from "../../button/AddButton";
import { ProjectTaskItem } from "../project-task-item/ProjectTaskItem";
import { motion } from "framer-motion";

export const ProjectSection = ({ sectionTasks, sectionData, addTask }) => {
  const [formActive, setFormActive] = useState(false);
  const [tasks, setTasks] = useState([]);

  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
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
  }, [sectionTasks]);

  const appendSectionTasks = tasks.map((task) => {
    return <ProjectTaskItem task={task} />;
  });
  return (
    <motion.section
      data-indexpos={sectionData.sectionIndex}
      id={sectionData.sectionID}
      className={projectSectionStyle.section}
    >
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
