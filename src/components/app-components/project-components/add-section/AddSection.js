import React from "react";
import addSectionStyle from "./addSection.module.scss";

export const AddSection = () => {
  return (
    <button className={addSectionStyle.addSectionButton}>
      <span>Add Section</span>
    </button>
  );
};
