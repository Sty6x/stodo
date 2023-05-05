import React, { createContext, useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
import { ProjectPageLayout } from "../../components/app-components/project-components/project-page-layout/ProjectPageLayout";

export const ProjectPageContext = createContext(null);
export const Project = () => {
  const { projectID } = useParams();
  const { projectLinks } = useContext(TaskDatabaseContext);
  const [project] = projectLinks.filter((link) => link.ID === projectID);

  function addSection(e) {
    e.preventDefault();
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
