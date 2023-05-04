import React, { useEffect } from "react";
import appPages from "./app.module.scss";
import { useParams } from "react-router-dom";
export const Project = () => {
  const { projectID } = useParams();

  useEffect(() => {
    console.log(projectID);
  }, [projectID]);
  return (
    <div className={`${appPages.pages}`}>
      <h1>Projects here</h1>
    </div>
  );
};
