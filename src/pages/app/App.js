import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import { Navbar } from "../../components/navbar/Navbar";
import appStyles from "./app.module.scss";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FirebaseContext } from "../../App";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { isFuture, isPast } from "date-fns";
export const TaskDatabaseContext = createContext(null);

export const App = () => {
  const { auth, db } = useContext(FirebaseContext);
  const sideBarBtnRef = useRef();
  const sideBarRef = useRef();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("app component mounted");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserTasks(user.uid).then(() => {
          setIsLoading((prev) => false);
        });
      } else {
        console.log("User not Signed in");
      }
    });
  }, []);

  async function getUserTasks(userId) {
    try {
      const tasksCollection = collection(db, "users", userId, "tasks");
      const getCollection = await getDocs(tasksCollection);
      const newTasks = getCollection.docs.map((doc) => doc.data());
      console.log(newTasks);
      setTasks(newTasks);
    } catch (err) {
      console.log("unable to fetch collection at this time ");
      throw err;
    }
  }

  // useEffect(() => {
  //   if (tasks.length !== 0) {
  //     filterTaskbyDates();
  //   }
  // }, [tasks]);

  // async function filterTaskbyDates() {
  //   console.log(tasks);
  //   for (let task of tasks) {
  //     if (isFuture(new Date(task.dueDate))) {
  //       console.log(`is future:`);
  //       setUpcomingTasks((prev) => [...prev, task]);
  //     }
  //     if (isPast(new Date(task.dueDate))) {
  //       console.log(`is past:`);
  //       setOverdueTasks((prev) => [...prev, task]);
  //     }
  //     if (new Date(task.dueDate).getDay() === new Date().getDay()) {
  //       console.log(`is today: `);
  //       setTodayTasks((prev) => [...prev, task]);
  //     }
  //   }
  // }

  function setSideBarStatus() {
    const btn = sideBarBtnRef.current;
    const sb = sideBarRef.current;
    console.log(sb);
    if (sb.classList.contains("sideBarActive")) {
      sb.classList.replace("sideBarActive", "sideBarInactive");
      setIsSidebarActive(false);
    } else {
      sb.classList.replace("sideBarInactive", "sideBarActive");
      setIsSidebarActive(true);
    }
  }


  return (
    <>
      <Navbar>
        <button
          onClick={async (e) => {
            signOut(auth);
          }}
          style={{ position: "absolute", left: "80%" }}
        >
          Sign out
        </button>
        <div className={appStyles.navLeft}>
          <button
            onClick={(e) => setSideBarStatus()}
            ref={sideBarBtnRef}
            className={appStyles.sideBarBtn}
          ></button>
          <Logo to={"/app/today"} />
        </div>
        <div className={appStyles.navRight}>
          {/* make user profile drop down on click  */}
          <div className={appStyles.profile}>A</div>
        </div>
      </Navbar>
      <main className={appStyles.appPage}>
        {/*sidebar*/}
        <Sidebar sbRef={sideBarRef} isSidebarActive={isSidebarActive} />
        <TaskDatabaseContext.Provider
          value={{ tasks, setTasks}}
        >
          {isLoading ? <p>show animation...</p> : <Outlet />}
        </TaskDatabaseContext.Provider>
      </main>
    </>
  );
};
