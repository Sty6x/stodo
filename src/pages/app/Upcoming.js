import React, { useState, useEffect, useContext } from "react";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";
import appPages from "./app.module.scss";
import { compareAsc, format, isFuture } from "date-fns";
import { TaskContainer } from "../../components/app-components/task-container/TaskContainer";
export const Upcoming = () => {
  const { tasks } = useContext(TaskDatabaseContext);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    filterTasks(tasks).then((t) => {
      containFilteredTask(t);
    });
  }, [tasks]);

  async function filterTasks(tasks) {
    const filteredTasks = tasks.filter((task) => {
      if (isFuture(new Date(task.dueDate))) {
        return task;
      }
    });
    // just sort them
    setUpcomingTasks(filteredTasks);
    return filteredTasks;
  }

  function containFilteredTask(t) {
    for (let i = 0; i < t.length; i++) {
      let tmpArr = [];
      for (let j = 0; j < t.length; j++) {
        if (compareAsc(new Date(t[i].dueDate), new Date(t[j].dueDate)) === 0) {
          tmpArr.push(t[j]);
        }
      }

      if (tmpArr.length == 1) {
        console.log(tmpArr);
      } else if (tmpArr.length > 1) {
        console.log(tmpArr);
      }
    }
  }

  const appendTasks = upcomingTasks.map((task, i) => {
    return (
      <TaskItem /* deleteTask={deleteTask}  */ key={task.ID} task={task} />
    );
  });
  return (
    <div className={`${appPages.pages}`}>
      <HeaderComponent pageName={"Upcoming"} isMainHeader={true} />
      <PageLayout>{appendTasks}</PageLayout>
    </div>
  );
};
