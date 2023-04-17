import React from "react";
import pageLayoutStyles from './pageLayout.module.scss'
export const PageLayout = ({tasks})=>{
  return <div>Contents here
  <ul>
      {tasks}
    </ul>
  </div>
}
