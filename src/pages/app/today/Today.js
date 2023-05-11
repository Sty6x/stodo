import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { FirebaseContext } from "../../../App";
import todayStyles from "./today.module.scss";
import appPages from "../app.module.scss";
import { HeaderComponent } from "../../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../../components/app-components/page-layout/PageLayout";
import { TaskItem } from "../../../components/app-components/task-item/TaskItem";
import { TaskContainer } from "../../../components/app-components/task-container/TaskContainer";
import { TaskDatabaseContext } from "../App";
import { isSameDay} from "date-fns";
import { AddButton } from "../../../components/app-components/button/AddButton";

export const Today = () => {
  const { tasks, addTask } = useContext(TaskDatabaseContext);
  const [todayTasks, setTodayTasks] = useState([]);
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    filterTasks(tasks);
    setFormActive(false)
  }, [tasks]);

  async function filterTasks(tasks) {
    const filteredTasks = tasks.filter((task) => {
      if (isSameDay(new Date(), new Date(task.dueDate))) {
        return task;
      }
    });
    console.log(filteredTasks);
    setTodayTasks(filteredTasks);
  }

  function formControl() {
    return formActive ? setFormActive(false) : setFormActive(true);
  }

  const appendTasks = todayTasks.map((task) => {
    return <TaskItem key={task.ID} task={task} />;
  });

  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={"Today"} isMainHeader={true} />
      <PageLayout
        pageTasks={todayTasks}
        onEmptyText={
          "Looks like you're done for today, enjoy the rest of your day!"
        }
      >
        <TaskContainer>
          {appendTasks}
          <AddButton formActive={formActive} formControl={formControl} addTask={addTask} type={"add task"}/>
        </TaskContainer>
      </PageLayout>
    </div>
  );
};
