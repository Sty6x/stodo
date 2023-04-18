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
    {
      title: "task 1",
      description: "description for task 1",
      time: "2:32pm",
    },
    {
      title: "task 2",
      description: "description for task 2",
      time: "3:52pm",
    },
    {
      title: "task 3",
      description: "description for task 3",
      time: "6:00am",
    },
    {
      title: "task 4",
      description: "description for task 4",
      time: "5:32pm",
    },
    {
      title: "task 5",
      description: "description for task 5",
      time: "5:61pm",
    },
    {
      title: "task 6",
      description: "description for task 6",
      time: "10:42am",
    },
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
      <PageLayout>
        <ul className={`${appPages.taskItemsContainer}`}>{appendTasks}</ul>
      </PageLayout>
    </div>
  );
};
