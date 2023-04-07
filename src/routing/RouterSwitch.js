import React, { useContext, useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { FirebaseContext } from "../App";
import { onAuthStateChanged } from "firebase/auth";

export const RouterSwitch = ({ importRoutes }) => {
	const { navigate, auth } = useContext(FirebaseContext);

	useEffect(() => {
		const checkUsersMethod = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/app/today");
			} else {
				console.log("user is not signed in");
			}
		});
		return checkUsersMethod;
	}, []);

	const renderRoute = importRoutes.map((route) => {
		const sub =
			route.subRoutes &&
			route.subRoutes.map((subRoute) => {
				return (
					<Route
						key={subRoute.name}
						path={subRoute.path}
						element={subRoute.element}
					/>
				);
			});
		return (
			<Route key={route.name} path={route.path} element={route.element}>
				{sub}
			</Route>
		);
	});

	return <Routes>{renderRoute}</Routes>;
};
