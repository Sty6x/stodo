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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { LoadingAppPage } from "../../components/loading-app-page/LoadingAppPage";
export const TaskDatabaseContext = createContext(null);

export const App = () => {
  const { auth, db } = useContext(FirebaseContext);
  const sideBarBtnRef = useRef();
  const sideBarRef = useRef();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [tasks, setTasks] = useState([]);
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
      const sortQuery = query(tasksCollection, orderBy("dateAdded", "desc"));
      const getCollection = await getDocs(sortQuery);
      const newTasks = getCollection.docs.map((doc) => doc.data());
      console.log(newTasks);
      setTasks(newTasks);
    } catch (err) {
      console.log("unable to fetch collection at this time ");
      throw err;
    }
  }

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

  return (
    <>
    {isLoading ? <LoadingAppPage/>: 
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
        <Sidebar sbRef={sideBarRef} isSidebarActive={isSidebarActive} />
        <TaskDatabaseContext.Provider value={{ tasks, setTasks, deleteTask }}>
          <Outlet />
        </TaskDatabaseContext.Provider>
      </main>
    </>
    }
    </>
  );
};
