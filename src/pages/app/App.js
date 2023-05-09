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
  setDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { uid } from "uid";
import { LoadingAppPage } from "../../components/loading-app-page/LoadingAppPage";
export const TaskDatabaseContext = createContext(null);

export const App = () => {
  const { auth, db } = useContext(FirebaseContext);
  const sideBarRef = useRef();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectLinks, setProjectLinks] = useState([]);
  const newProjectRef = useRef();

  useEffect(() => {
    console.log("app component mounted");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Promise.allSettled([
          getUserTasks(user.uid),
          getUserProjects(user.uid),
        ]).then((data) => {
          setIsLoading((prev) => false);
        });
      } else {
        console.log("User not Signed in");
      }
    });
  }, [auth]);

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

  async function getUserProjects(userId) {
    try {
      const projectCollection = collection(db, "users", userId, "projects");
      const getCollection = await getDocs(projectCollection);
      const newProjects = getCollection.docs.map((doc)=> doc.data())
      console.log(getCollection);
      setProjectLinks(newProjects)
    } catch (err) {
      console.log("Unable to get projects");
      throw err;
    }
  }

  function setSideBarStatus() {
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

  async function addProject() {
    const projectDetail = newProjectRef.current;
    const newProjectID = uid(16);
    const newProject = {
      [projectDetail.name]: projectDetail.value,
      ID: newProjectID,
      authorId: auth.currentUser.uid,
      sections: [
        {
          sectionTitle: "Section Title",
          sectionIndex: 0,
        },

        {
          sectionTitle: "Section Title",
          sectionIndex: 1,
        },
      ],

      sectionTasks: [
        {
          title: "Hey",
          desc: "Some description",
          taskPriority: "High",
          ID: "placeholder",
          sectionOwnerIndex: 0,
        },
        {
          title: "Start by clicking on add task",
          desc: "Some description",
          taskPriority: "Medium",
          ID: "placeholder",
          sectionOwnerIndex: 1,
        },
      ],
    };

    try {
      const projectDoc = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        newProjectID
      );
      const addProject = await setDoc(projectDoc, newProject);
      setProjectLinks((prev) => [...prev, newProject]);
    } catch (err) {
      console.log("Unable to add project please try again later");
      throw err;
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingAppPage />
      ) : (
        <>
          <Navbar>
            <div className={appStyles.navLeft}>
              <button
                onClick={() => setSideBarStatus()}
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
            <Sidebar
              projectLinks={projectLinks}
              addProject={addProject}
              inputRef={newProjectRef}
              sbRef={sideBarRef}
            />
            <TaskDatabaseContext.Provider
              value={{
                tasks,
                setTasks,
                deleteTask,
                projectLinks,
                setProjectLinks,
              }}
            >
              <Outlet />
            </TaskDatabaseContext.Provider>
          </main>
        </>
      )}
    </>
  );
};
