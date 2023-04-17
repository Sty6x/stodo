import React, { useContext } from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from "./today.module.scss";
import appPages from "../app.module.scss";
import { HeaderComponent } from "../../../components/app-components/header/HeaderComponent";
import { useOutletContext } from "react-router-dom";
import { PageLayout } from "../../../components/app-components/page-layout/PageLayout";
export const Today = () => {
  const { auth } = useContext(FirebaseContext);
  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={'Today'}/>
      <PageLayout/>
    </div>
  );
};
