import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  updateDoc,
} from "firebase/firestore";
import { uid } from "uid";
import { LoadingAppPage } from "../../components/loading-app-page/LoadingAppPage";
import { format } from "date-fns";
export const TaskDatabaseContext = createContext(null);

export const App = () => {
  const { navigate, auth, db } = useContext(FirebaseContext);
  const sideBarRef = useRef();
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projectLinks, setProjectLinks] = useState([]);
  const newProjectRef = useRef();
  const { projectID } = useParams();

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
      const newProjects = getCollection.docs.map((doc) => doc.data());
      console.log(getCollection);
      setProjectLinks(newProjects);
    } catch (err) {
      console.log("Unable to get projects");
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

  async function deleteProject(e, ID) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    console.log(projectID);
    console.log(ID);
    const filterProject = projectLinks.filter((project) => ID !== project.ID);
    try {
      const projectDoc = doc(db, "users", auth.currentUser.uid, "projects", ID);
      const deleteProjectDoc = await deleteDoc(projectDoc);
      redirectWhileOnDeletedProject(ID, projectID);
      setProjectLinks(filterProject);
    } catch (err) {
      console.log("unable to delete project");
      throw err;
    }
  }

  async function editProject(e, ID) {
    e.preventDefault();
    const target = e.target;
    const form = new FormData(target);
    const formEntry = Object.fromEntries(form.entries());
    console.log(formEntry);
    const filterProjects = projectLinks.filter((project) => project.ID !== ID);
    const getTargetProject = projectLinks.filter(
      (project) => project.ID === ID
    );
    const updatedProject = { ...getTargetProject[0], ...formEntry };
    try{
    const getProjectDoc = doc(db,'users',auth.currentUser.uid,'projects',ID)
    const setProject  = await updateDoc(getProjectDoc,updatedProject)
    setProjectLinks([updatedProject, ...filterProjects]);
    }catch(err){
      console.log('Unable to update project')
      throw err
    }
  }

  async function redirectWhileOnDeletedProject(targetUrl, currentUrl) {
    console.log("redirect");
    return targetUrl === currentUrl && navigate("/app/today");
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
              />
              <Logo to={"/app/today"} />
            </div>
            <div className={appStyles.navRight}>
              {/* make user profile drop down on click  */}
              <div className={appStyles.profile}>S</div>

              <button
                onClick={async (e) => {
                  signOut(auth);
                }}
                style={{ position: "absolute", left: "80%" }}
              >
                sign out
              </button>
            </div>
          </Navbar>
          <main className={appStyles.appPage}>
            <Sidebar
              projectLinks={projectLinks}
              addProject={addProject}
              deleteProject={deleteProject}
              editProject={editProject}
              inputRef={newProjectRef}
              sbRef={sideBarRef}
            />
            <TaskDatabaseContext.Provider
              value={{
                projectLinks,
                setProjectLinks,
                tasks,
                setTasks,
                addTask,
                deleteTask,
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
