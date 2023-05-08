import React from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";

export const ProjectPageLayout = ({ children }) => {
  let mousePos = { x: 0, y: 0 };



  return (
    <section
  
      className={projectPageLayoutStyle.pageLayout}
    >
      {children}
    </section>
  );
};
