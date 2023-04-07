import React, { useContext, useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { FirebaseContext } from "../App";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const RouterSwitch = ({ importRoutes }) => {
	const { navigate, auth, db } = useContext(FirebaseContext);

	useEffect(() => {
		const redirectIfNotLoggedIn = onAuthStateChanged(auth, (user) => {
			if (user) {
				checkIfUserAlreadyExists(user);
			} else {
				console.log("user is not signed in");
			}
		});
		return redirectIfNotLoggedIn;
	}, []);

	async function checkIfUserAlreadyExists(user) {
		try {
			const userDocref = doc(db, `/user/${user.uid}`);
			const userDoc = await getDoc(user);
			if (userDoc.exists()) {
				return navigate("/app/today");
			}
			return navigate("/auth/sign-up/create-profile");
		} catch (err) {
			console.log("unable to fetch user path");
			throw err;
		}
	}

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
