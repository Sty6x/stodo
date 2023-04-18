import React, { useContext } from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from "./today.module.scss";
import appPages from "../app.module.scss";
import { HeaderComponent } from "../../../components/app-components/header/HeaderComponent";
import { useOutletContext } from "react-router-dom";
import { PageLayout } from "../../../components/app-components/page-layout/PageLayout";
import { map } from "@firebase/util";
import { TaskItem } from "../../../components/app-components/task-item/TaskItem";
export const Today = () => {
  const { auth } = useContext(FirebaseContext);
  const arr = [
    { title: "task 1", description: "description for task 1" },
    { title: "task 2", description: "description for task 2" },
    { title: "task 3", description: "description for task 3" },
    { title: "task 4", description: "description for task 4" },
    { title: "task 5", description: "description for task 5" },
    { title: "task 6", description: "description for task 6" },
  ];

  const appendTasks = arr.map((task) => {
    return <TaskItem key={task} task={task} />;
  });

  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={"Today"} />
      <PageLayout>{appendTasks}</PageLayout>
    </div>
  );
};
