import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

export const RouterSwitch = ({ importRoutes }) => {
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
	console.log(renderRoute);

	return <Routes>{renderRoute}</Routes>;
};
