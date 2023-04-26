import React, {useState,useEffect, useContext } from "react";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";
import appPages from "./app.module.scss";
import { isFuture } from "date-fns";
export const Upcoming = () => {
  const {tasks} = useContext(TaskDatabaseContext)
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    filterTasks(tasks);
  }, [tasks]);

  async function filterTasks(tasks) {
    const filteredTasks = tasks.filter((task) => {
      if (isFuture( new Date(task.dueDate))) {
        return task;
      }
    });
    console.log(filteredTasks);
    setUpcomingTasks(filteredTasks);
  }

  const appendTasks = upcomingTasks.map((task) => {
    return <TaskItem /* deleteTask={deleteTask}  */key={task.ID} task={task} />;
  });
  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={'Upcoming'}/>
      <PageLayout>
       {appendTasks} 
      </PageLayout>
    </div>
  );
};
