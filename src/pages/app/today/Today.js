import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from "./today.module.scss";
import appPages from "../app.module.scss";
import { HeaderComponent } from "../../../components/app-components/header/HeaderComponent";
import { useOutletContext } from "react-router-dom";
import { PageLayout } from "../../../components/app-components/page-layout/PageLayout";
import { map } from "@firebase/util";
import { TaskItem } from "../../../components/app-components/task-item/TaskItem";
import { TaskContainer } from "../../../components/app-components/task-container/TaskContainer";
import { onAuthStateChanged } from "firebase/auth";
export const Today = () => {
  const {db, auth } = useContext(FirebaseContext);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    console.log('today page component mounted')   
  },[])
  





  
  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={"Today"} />
      <PageLayout buttonType={'Add Task'}>
        {/* <TaskContainer>{appendTasks}</TaskContainer> */}
      </PageLayout>
    </div>
  );
};
