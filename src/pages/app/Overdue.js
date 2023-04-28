import React from "react";
import appPages from "./app.module.scss";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";

export const Overdue = () => {
  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={"Overdue"} isMainHeader={true} />
      <PageLayout></PageLayout>
    </div>
  );
};
