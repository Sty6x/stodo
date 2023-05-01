import React from "react";
import loadingAppPageStyle from "./loadingAppPage.module.scss";

export const LoadingAppPage = () => {
  return (
    <div className={loadingAppPageStyle.loadingPage}>
      <div className={loadingAppPageStyle.loadingIconContainer}>I Am Loading</div>
    </div>
  );
};
