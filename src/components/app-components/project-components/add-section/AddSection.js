import React, { useContext } from "react";
import addSectionStyle from "./addSection.module.scss";
import { ProjectPageContext } from "../../../../pages/app/Project";

export const AddSection = () => {
const {addSection} = useContext(ProjectPageContext)

  return (
    <button onClick={addSection} className={addSectionStyle.addSectionButton}>
      <span>Add Section</span>
    </button>
  );
};
