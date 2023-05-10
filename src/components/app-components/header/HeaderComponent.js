import React from "react";
import headerStyles from "./headerComponent.module.scss";
import { format } from "date-fns";

export const HeaderComponent = ({ pageName, isMainHeader = false }) => {
  return (
    <header className={`${headerStyles.headerContainer}`}>
      <div className={`${headerStyles.titleDateContainer}`}>
        <h1>{pageName}</h1>
        <h1 className={headerStyles.date}>{format(new Date(), "PP")}</h1>
      </div>
    </header>
  );
};
