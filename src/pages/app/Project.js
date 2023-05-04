import React, { createContext, useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { TaskDatabaseContext } from "./App";
import { ProjectSection } from "../../components/app-components/project-components/project-section/ProjectSection";
import { ProjectPageLayout } from "../../components/app-components/project-components/project-page-layout/ProjectPageLayout";

export const ProjectPageContext = createContext(null)
export const Project = () => {
  const { projectID } = useParams();
  const { projectLinks } = useContext(TaskDatabaseContext);
  const [project] = projectLinks.filter((link) => link.ID === projectID);
  const [newProject,setNewProject] = useState(project)
  // since its using a dynamic link and component is the same 
  // it will have to replace the previous state that was stored (Project Data)

  function addSection(e){
    e.preventDefault()
    const newSection = {sectionName:'Placeholder Section',sectionTasks:[]}
    setNewProject(prev=>({...prev,sectionPopulate:[...prev.sectionPopulate,newSection]}))
  }

  useEffect(() => {
    setNewProject(project)
  }, [project]);

  const appendProjectSections = newProject.sectionPopulate.map((section) => {
    return <ProjectSection sectionData={section} />;
  });

  return (
    <div className={`${appPages.projectPage}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <ProjectPageContext.Provider value={{addSection}}>
      <ProjectPageLayout>{appendProjectSections}</ProjectPageLayout>
      </ProjectPageContext.Provider>
    </div>
  );
};
