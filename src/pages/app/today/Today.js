import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
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
import { addDoc, collection, setDoc } from "firebase/firestore";
import { TaskForm } from "../../../components/app-components/task-form/TaskForm";
export const TodayHandlerContext = createContext(null);

export const Today = () => {
  const { db, auth } = useContext(FirebaseContext);
  const { tasks, setTasks } = useContext(TaskDatabaseContext);
  const formRef = useRef();

  useEffect(() => {
    console.log(tasks);
    console.log("today page component mounted");
  }, []);

  const [formActive, setFormActive] = useState(false);
  function formControl() {
    if (formActive) {
      setFormActive(false);
    } else {
      setFormActive(true);
    }
  }
  async function addTask(e) {
    e.preventDefault();
    const target = e.target;
    const formObj = new FormData(target)
    console.log(Object.fromEntries(formObj.entries()))
    try {
      console.log("task added");
      // const tasksCollection = collection(
      //   db,
      //   "users",
      //   auth.currentUser.uid,
      //   "tasks"
      // );
    } catch (err) {
      console.log("unable to add task");
      throw err;
    }
  }

  const appendTasks = tasks.map((task) => {
    return <TaskItem task={task} />;
  });

  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={"Today"} />
      <PageLayout>
        <TaskContainer>{appendTasks}</TaskContainer>
        {formActive ? (
          <TaskForm cancelBtn={formControl} formRef={formRef}   onSubmitHandler={addTask}/>
        ) : (
          <>
            <button
              className={`${todayStyles.button}`}
              onClick={formControl}
            >
              Add Task
            </button>
          </>
        )}
      </PageLayout>
    </div>
  );
};
