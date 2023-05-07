import React, { createContext, useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
import { ProjectPageLayout } from "../../components/app-components/project-components/project-page-layout/ProjectPageLayout";
import { uid } from "uid";

let i = 1;
export const ProjectPageContext = createContext(null);
export const Project = () => {
  const { projectID } = useParams();
  const { setProjectLinks, projectLinks } = useContext(TaskDatabaseContext);
  const [project] = projectLinks.filter((link) => link.ID === projectID);

  function addSection(e) {
    e.preventDefault();
    i++;
    const newSection = {
      sectionTitle: "New Section",
      sectionTasks: [{ title: "Some new Task from new Section", ID: uid(16) }],
      sectionIndex: i,
    };
    const updateProject = {
      ...project,
      sections: [...project.sections, newSection],
    };
    const filter = projectLinks.filter((proj) => proj.ID !== projectID);
    setProjectLinks([...filter, updateProject]);
  }

  useEffect(() => {
    console.log(project);
  }, [project]);

  // project is used to filter projects and display the project that matches the current DynamicUrl
  const appendProjectSections = project.sections.map((section) => {
    return <ProjectSection key={section.sectionIndex} sectionData={section} />;
  });

  return (
    <div key={project.ID} className={`${appPages.projectPage}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <ProjectPageContext.Provider value={{ addSection }}>
        <ProjectPageLayout>{appendProjectSections}</ProjectPageLayout>
      </ProjectPageContext.Provider>
    </div>
  );
};
