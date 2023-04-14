import React from "react";
import { NavLink } from "react-router-dom";
import projectLinkStyles from  './projectLink.module.scss'

export const ProjectLink = ({to,projectName})=>{
  return (
  <li key={projectName}>
      <NavLink key={to} to={to}>{projectName}</NavLink>
    </li>
  )
}
