import React from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";
import { AddSection } from "../add-section/AddSection";

export const ProjectPageLayout = ({ children }) => {
  return (
    <section className={projectPageLayoutStyle.pageLayout}>{children}<AddSection/></section>
  );
};
