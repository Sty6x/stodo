import React, { useContext } from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from "./today.module.scss";
import appPages from "../app.module.scss";
export const Today = () => {
  const { auth } = useContext(FirebaseContext);
  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <div className={`${todayStyles.contentContainer}`}>
        {/* this should be a component */}
        <div className={`${appPages.headerContainer}`}>
             <h1>Today</h1> 
              <p>Thu 23 Mar</p>
        </div>
      </div>
    </div>
  );
};
