import React from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";

export const ProjectPageLayout = ({ children }) => {
  return <section className={projectPageLayoutStyle.pageLayout}>{children}</section>;
};
