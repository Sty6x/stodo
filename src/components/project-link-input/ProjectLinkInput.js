import React from "react";
import projectLinkStyle from './projectLinkInput.module.scss'
export const ProjectLinkInput = () => {
  return (
    <div className={projectLinkStyle.container}>
      <label htmlFor="projectName">Project Name</label>
      <input className={projectLinkStyle.name} type={"text"} id="prjectName" name="projectName" />
      <button className={projectLinkStyle.btn} />
    </div>
  );
};
