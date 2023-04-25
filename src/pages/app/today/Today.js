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
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { TaskForm } from "../../../components/app-components/task-form/TaskForm";
import { AnimatePresence, motion } from "framer-motion";
import { uid } from "uid";
import { format } from "date-fns";
export const TodayHandlerContext = createContext(null);

export const Today = () => {
  const { db, auth } = useContext(FirebaseContext);
  const { tasks, setTasks } = useContext(TaskDatabaseContext);
  const [todayTasks, setTodayTasks] = useState([]);
  const formRef = useRef();
  const [formActive, setFormActive] = useState(false);

  useEffect(() => {
    filterTasks(tasks);
  }, [tasks]);

  async function filterTasks(tasks) {
    const filteredTasks = tasks.filter((task) => {
      if (new Date(task.dueDate).getDay() === new Date().getDay()) {
        console.log(`is today: `);
        return task;
      }
    });
    console.log(filteredTasks);
    setTodayTasks(filteredTasks);
  }

  function formControl() {
    if (formActive) {
      setFormActive(false);
    } else {
      setFormActive(true);
    }
  }

  async function deleteTask(id) {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid, "tasks", id);
      const deleteTaskDoc = await deleteDoc(docRef);
      const newFilteredTask = tasks.filter((task) => task.ID !== id);
      setTasks(newFilteredTask);
    } catch (err) {
      console.log("Unable to delete task");
      throw err;
    }
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

  useEffect(() => {
    setFormActive(false);
    console.log(tasks);
  }, [tasks]);

  const appendTasks = todayTasks.map((task) => {
    return <TaskItem deleteTask={deleteTask} key={task.ID} task={task} />;
  });

  return (
    <div
      id="today-page"
      key="today-page"
      className={`${appPages.pages} ${todayStyles.todayPage}`}
    >
      <HeaderComponent pageName={"Today"} />
      <PageLayout>
        <TaskContainer>
          {appendTasks}
          <AnimatePresence mode="wait">
            {formActive ? (
              <TaskForm
                key={"taskForm"}
                cancelBtn={formControl}
                formRef={formRef}
                onSubmitHandler={addTask}
              />
            ) : (
              <motion.button
                layout
                exit={{ y: -30, opacity: 0, transition: { duration: 0.1 } }}
                animate={{ y: [-30, 0], opacity: [0, 1] }}
                className={`${todayStyles.button}`}
                onClick={formControl}
              >
                Add Task
              </motion.button>
            )}
          </AnimatePresence>
        </TaskContainer>
      </PageLayout>
    </div>
  );
};
