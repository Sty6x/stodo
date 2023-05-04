import React from "react";

export const ProjectSection = ({sectionData}) => {
  return <section>{/* tasks here that belong to a section */}
    <h1>{sectionData.sectionName}</h1>
  </section>;
};
