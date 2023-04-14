import React from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from "./projectLink.module.scss";

export const ProjectLink = ({ to, projectName }) => {
  return (
    <li className={`${projectLinkStyles.linkContainer}`} key={projectName}>
      <NavLink className={`${projectLinkStyles.link}`} key={to} to={to}>
        {projectName}
      </NavLink>
    </li>
  );
};
