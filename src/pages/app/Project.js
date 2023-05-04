import React, { useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
import { ProjectPageLayout } from "../../components/app-components/project-components/project-page-layout/ProjectPageLayout";
export const Project = () => {
  const { projectID } = useParams();
  const { projectLinks } = useContext(TaskDatabaseContext);
  let [project] = projectLinks.filter((link) => link.ID === projectID);

  useEffect(() => {
    console.log(project);
  }, [projectID]);

  const appendProjectSections = project.sectionPopulate.map((section) => {
    return <ProjectSection sectionData={section} />;
  });

  return (
    <div className={`${appPages.projectPage}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <ProjectPageLayout>{appendProjectSections}</ProjectPageLayout>
    </div>
  );
};
