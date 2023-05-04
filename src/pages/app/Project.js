import React, { useContext, useEffect } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
export const Project = () => {
  const { projectID } = useParams();
  const { projectLinks } = useContext(TaskDatabaseContext);
  const [project] = projectLinks.filter(link=> link.ID === projectID )


  useEffect(() => {
    console.log(project);
  }, [projectID]);

  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={`${project.projectName}`} />
      <PageLayout
        onEmptyText={"Add a section '+'"}
        pageTasks={projectLinks}
      ></PageLayout>
    </div>
  );
};
