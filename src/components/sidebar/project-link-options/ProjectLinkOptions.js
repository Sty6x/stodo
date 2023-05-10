import React from "react";

export const ProjectLinkOptions = ({ handleCancelButton }) => {
  return (
    <>
      <button>Edit</button>
      <button>Delete</button>
      <button
        onClick={handleCancelButton}
      >
        cancel
      </button>
    </>
  );
};
