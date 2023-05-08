import React from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";

export const ProjectPageLayout = ({ children }) => {
  function mouseMoveHandler(e) {
    const target = e.nativeEvent;
    const mouseX = target.offsetX;
    const mouseY = target.offsetY;
    console.log({ x: mouseX, y: mouseY });
    window.scrollTo(mouseX - e.target.innerWidth, 0);
  }

  return (
    <section
      onMouseMove={mouseMoveHandler}
      className={projectPageLayoutStyle.pageLayout}
    >
      {children}
    </section>
  );
};
