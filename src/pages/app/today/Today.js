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
import {  doc, setDoc } from "firebase/firestore";
import { uid } from "uid";
import { format, isSameDay} from "date-fns";
import { AddButton } from "../../../components/app-components/button/AddButton";
export const TodayHandlerContext = createContext(null);

export const Today = () => {
  const { db, auth } = useContext(FirebaseContext);
  const { tasks, setTasks, deleteTask } = useContext(TaskDatabaseContext);
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    filterTasks(tasks);
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



  async function addTask(e) {
    e.preventDefault();
    const target = e.target;
    const form = new FormData(target);
    const formEntries = Object.fromEntries(form.entries());
    const taskID = uid(16);
    const date = new Date();
    console.log(format(date, "Pp"));
    const newTask = {
      ...formEntries,
      authorID: auth.currentUser.uid,
      ID: taskID,
      dateAdded: format(date, "Pp"),
    };
    try {
      const tasksCollection = doc(
        db,
        "users",
        auth.currentUser.uid,
        "tasks",
        taskID
      );
      const addTask = await setDoc(tasksCollection, newTask);
      setTasks((prev) => [...prev, newTask]);
      console.log("task added");
    } catch (err) {
      console.log("unable to add task");
      throw err;
    }
  }

  const appendTasks = todayTasks.map((task) => {
    return <TaskItem deleteTask={deleteTask} key={task.ID} task={task} />;
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
          <AddButton addTask={addTask} type={"add task"}/>
        </TaskContainer>
      </PageLayout>
    </div>
  );
};
