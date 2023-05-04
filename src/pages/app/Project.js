import React, { useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
export const Project = () => {
  const { projectID } = useParams();
  const { projectLinks } = useContext(TaskDatabaseContext);
  let [project] = projectLinks.filter((link) => link.ID === projectID);
  const sectionPopulate = [
    {
      sectionName: "Section one",
      sectionTasks: [
        { title: "Task one", priority: "high", dueDate: "05/04/2023" },
        { title: "Task Two", priority: "low", dueDate: "05/04/2023" },
        { title: "Task Three", priority: "Medium", dueDate: "05/04/2023" },
      ],
    },
    {
      sectionName: "Section two",
      sectionTasks: [
        { title: "two-Task one", priority: "high", dueDate: "05/04/2023" },
        { title: "two-Task Two", priority: "low", dueDate: "05/04/2023" },
        { title: "two-Task Three", priority: "Medium", dueDate: "05/04/2023" },
      ],
    },
    {
      sectionName: "Section three",
      sectionTasks: [
        { title: "three-Task one", priority: "high", dueDate: "05/04/2023" },
        { title: "three-Task Two", priority: "low", dueDate: "05/04/2023" },
        {
          title: "three-Task Three",
          priority: "Medium",
          dueDate: "05/04/2023",
        },
      ],
    },
  ];

  useEffect(() => {
    project = { ...project, sectionPopulate };
    console.log(project);
  }, [projectID]);


  const appendProjectSections = project.sectionPopulate.map(section=>{
    return <ProjectSection sectionData={section}/> 
  })

  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <PageLayout
        onEmptyText={"Add a section '+'"}
        pageTasks={projectLinks}
      >
        {appendProjectSections}
      </PageLayout>
    </div>
  );
};
