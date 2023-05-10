import React from "react";
import projectOptionsStyle from "./projectLinkOptions.module.scss";

export const ProjectLinkOptions = ({ handleCancelButton, handleEditButton,handleDeleteButton }) => {
  return (
    <>
      <button className={projectOptionsStyle.edit}
      onClick={handleEditButton}>Edit</button>
      <button className={projectOptionsStyle.delete}
      onClick={handleDeleteButton}>Delete</button>
      <button
        className={projectOptionsStyle.cancel}
        onClick={handleCancelButton}
      >
        cancel
      </button>
    </>
  );
};
