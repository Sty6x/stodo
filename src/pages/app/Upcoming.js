import React, { useState, useEffect, useContext } from "react";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";
import appPages from "./app.module.scss";
import { compareAsc, format, isFuture } from "date-fns";
import { TaskContainer } from "../../components/app-components/task-container/TaskContainer";
export const Upcoming = () => {
  const { tasks, deleteTask } = useContext(TaskDatabaseContext);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    filterTasks(tasks);
  }, [tasks]);

  async function filterTasks(tasks) {
    const filteredTasks = tasks.filter((task) => {
      if (isFuture(new Date(task.dueDate))) {
        return task;
      }
    });
    setUpcomingTasks(filteredTasks);
    return filteredTasks;
  }

  const appendTasks = upcomingTasks.map((task, i) => {
    return <TaskItem deleteTask={deleteTask} key={task.ID} task={task} />;
  });
  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={"Upcoming Tasks"} isMainHeader={true} />
      <PageLayout>{appendTasks}</PageLayout>
    </div>
  );
};
