import React, { useContext, useEffect } from "react";
import appPages from "./app.module.scss";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { isFuture, isPast } from "date-fns";

export const Overdue = () => {
  const { tasks } = useContext(TaskDatabaseContext);

  useEffect(() => {
    filterAndSortTasksByDueDate(tasks);
  }, [tasks]);

  async function filterAndSortTasksByDueDate(tasks) {
    const filteredTasks = tasks.filter((task) => {
      return task && isPast(new Date(task.dueDate));
    });
    console.log(filteredTasks);
  }

  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={"Overdue"} isMainHeader={true} />
      <PageLayout></PageLayout>
    </div>
  );
};
