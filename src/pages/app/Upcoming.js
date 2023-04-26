import React, { useState, useEffect, useContext } from "react";
import { HeaderComponent } from "../../components/app-components/header/HeaderComponent";
import { PageLayout } from "../../components/app-components/page-layout/PageLayout";
import { TaskDatabaseContext } from "./App";
import { TaskItem } from "../../components/app-components/task-item/TaskItem";
import appPages from "./app.module.scss";
import { compareAsc, format, isFuture } from "date-fns";
import { TaskContainer } from "../../components/app-components/task-container/TaskContainer";
export const Upcoming = () => {
	const { tasks } = useContext(TaskDatabaseContext);
	const [upcomingTasks, setUpcomingTasks] = useState([]);

	useEffect(() => {
		filterTasks(tasks).then((t) => {
			containFilteredTask(t);
		});
	}, [tasks]);

	async function filterTasks(tasks) {
		const filteredTasks = tasks.filter((task) => {
			if (isFuture(new Date(task.dueDate))) {
				return task;
			}
		});
		console.log(filteredTasks);
		setUpcomingTasks(filteredTasks);
		return filteredTasks;
	}

	function containFilteredTask(t) {
		console.log(t);
		for (let i = 0; i < t.length; i++) {
			let tmpArr = [];
			// check each task date but dont compare to self
			// when j reaches 0 it will iterate through each tasks again starting from 0 then
			// stops executing
			console.log("from i: " + i);
			for (
				let j = 0;
				j < t.length;
				j++
			) {
				if (compareAsc(new Date(t[i].dueDate), new Date(t[j].dueDate)) === 0) {
					tmpArr.push(t[j]);
				}
				// compareAsc(task[i],task[j]) if returns 0 then they are equal
				// if first task date is the same as all of the task
				// if task[i].dueDate is equal to any of the task[j].dueDate
				// append task[j] to tmpArr
				// else return

				console.log("from j:" + j);
			}
			console.log(tmpArr);
		}
	}

	const appendTasks = upcomingTasks.map((task, i) => {
		return (
			<TaskContainer key={i}>
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
