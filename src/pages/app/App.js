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
import { format, parseISO } from "date-fns";
import { Profile } from "../../components/app-components/profile/Profile";
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
		console.log(formEntries.dueDate);
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

	async function editTask(e) {
		e.preventDefault();
		const target = e.target;
		const taskID = target.id;
		const form = new FormData(target);
		const getTargetTask = tasks.filter((task) => task.ID === taskID);
		const updatedTask = {
			...Object.fromEntries(form.entries()),
			ID: taskID,
			authorID: getTargetTask[0].authorID,
			dateAdded: getTargetTask[0].dateAdded,
		};
		const mapTasks = tasks.map((task) => {
			if (task.ID === taskID) {
				return updatedTask;
			}
			return task;
		});
		try {
			const taskDoc = doc(
				db,
				"users",
				auth.currentUser.uid,
				"tasks",
				taskID
			);
			const updateTaskDoc = updateDoc(taskDoc, updatedTask);
			setTasks(mapTasks);
		} catch (err) {
			console.log("unable to edit task");
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
					title: "Welcome",
					desc: "Some random description",
					taskPriority: "High",
					ID: uid(16),
					sectionOwnerIndex: 0,
				},
				{
					title: "Start by clicking on add task",
					desc: "This is your description",
					taskPriority: "Medium",
					ID: uid(16),
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
			const projectDoc = doc(
				db,
				"users",
				auth.currentUser.uid,
				"projects",
				ID
			);
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
		const getTargetProject = projectLinks.filter(
			(project) => project.ID === ID
		);
		const updatedProject = { ...getTargetProject[0], ...formEntry };
		const mapProjects = projectLinks.map((project) => {
			if (project.ID === ID) {
				return updatedProject;
			}
			return project;
		});
		console.log(mapProjects);
		try {
			const getProjectDoc = doc(
				db,
				"users",
				auth.currentUser.uid,
				"projects",
				ID
			);
			const setProject = await updateDoc(getProjectDoc, updatedProject);
			setProjectLinks(mapProjects);
		} catch (err) {
			console.log("Unable to update project");
			throw err;
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
							<Profile />
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
								editTask,
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
