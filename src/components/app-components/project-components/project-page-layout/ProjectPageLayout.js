import React from "react";
import projectPageLayoutStyle from "./projectPageLayout.module.scss";

export const ProjectPageLayout = ({ children }) => {
  let currentMousePos = 0
  let isMouseDown = false;
  function mouseMoveHandler (e){
    const page = e.target
    let nativeEventMouse = e.nativeEvent.offsetX;
    console.log({x:nativeEventMouse})
    if(isMouseDown){

    if( nativeEventMouse >= currentMousePos){
         page.scrollTo(nativeEventMouse++,0)
    }
    if(nativeEventMouse <= currentMousePos){
       page.scrollTo(nativeEventMouse--,0)
    }
    }
  }
  function mouseDownHandler(e){
    isMouseDown = true
    currentMousePos = e.nativeEvent.offsetX
  }
  function mouseUpHandler(e){
    isMouseDown = false
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
