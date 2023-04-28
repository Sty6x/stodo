import React, { useContext, useEffect, useState } from "react";
import appPages from "./app.module.scss";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { isFuture, isPast } from "date-fns";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";

export const Overdue = () => {
  const { tasks } = useContext(TaskDatabaseContext);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    filterAndSortTasksByDueDate(tasks).then((data) => {
      setOverdueTasks(data);
    });
  }, [tasks]);

  async function filterAndSortTasksByDueDate(tasks) {
    const filteredTasks = tasks.filter((task) => {
      return task && isPast(new Date(task.dueDate));
    });
    const sortFilteredTasks = filteredTasks.sort(
      (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
    );
    console.log(sortFilteredTasks);
    return sortFilteredTasks;
  }

  const appendOverdueTasks = overdueTasks.map((task) => {
    return <TaskItem key={task.ID} task={task} />;
  });

  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={"Overdue"} isMainHeader={true} />
      <PageLayout>{appendOverdueTasks}</PageLayout>
    </div>
  );
};
