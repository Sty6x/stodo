import React, { useRef } from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

export const ProjectPageLayout = ({ children }) => {
  let currentMousePos = 0;
  let isMouseDown = false;

  function mouseMoveHandler(e) {
    const page = e.target;
    let userMousePos = e.nativeEvent.offsetX;
    console.log({ x: userMousePos });
    if (isMouseDown) {
      // if a user is pulling the page to scroll left or right and so that the users mouse dont need to scoll all the way to the end of the page
      // page.scrollTo(userMousePos ,0)
      if (userMousePos > currentMousePos) {
        page.scrollTo((page.scrollLeft -= 3), 0);
      }
      if (userMousePos < currentMousePos) {
        page.scrollTo((page.scrollLeft += 3), 0);
      }
    }
    // updates the currentmousepos after scrolling
    currentMousePos = userMousePos;
  }
  function mouseDownHandler(e) {
    const target = e.target;
    target.style.cursor = "grabbing";
    isMouseDown = true;
    currentMousePos = e.nativeEvent.offsetX;
    console.log(currentMousePos);
  }
  function mouseUpHandler(e) {
    const target = e.target;
    isMouseDown = false;
    target.style.cursor = "grab";
  }

  return (
    <section
      onMouseMove={mouseMoveHandler}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      className={projectPageLayoutStyle.pageLayout}
    >
      {children}
    </section>
  );
};
