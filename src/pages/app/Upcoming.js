import React, { useState, useEffect, useContext } from "react";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";
import appPages from "./app.module.scss";
import { format, isFuture } from "date-fns";
import { TaskContainer } from "../../components/app-components/task-container/TaskContainer";
export const Upcoming = () => {
	const { tasks } = useContext(TaskDatabaseContext);
	const [upcomingTasks, setUpcomingTasks] = useState([]);

	useEffect(() => {
		filterTasks(tasks);
	}, [tasks]);

	async function filterTasks(tasks) {
		const filteredTasks = tasks.filter((task) => {
			if (isFuture(new Date(task.dueDate))) {
				return task;
			}
		});
		console.log(filteredTasks);
		setUpcomingTasks(filteredTasks);
	}

	const appendTasks = upcomingTasks.map((task) => {
		return (
			<TaskContainer>
				<HeaderComponent pageName={format(new Date(task.dueDate), "PP")} />
				<TaskItem /* deleteTask={deleteTask}  */ key={task.ID} task={task} />
			</TaskContainer>
		);
	});
	return (
		<div className={`${appPages.pages}`}>
			<HeaderComponent pageName={"Upcoming"} isMainHeader={true} />
			<PageLayout>{appendTasks}</PageLayout>
		</div>
	);
};
