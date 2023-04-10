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
				console.log(user.uid);
				checkIfUserAlreadyExists(user);
			} else {
				navigate("/auth/sign-in");
			}
		});
		return redirectIfNotLoggedIn;
	}, []);

	async function checkIfUserAlreadyExists(user) {
		try {
			const userDocRef = doc(db, `/users/${user.uid}`);
			const userDoc = await getDoc(userDocRef);
			if (userDoc.exists()) {
				return navigate("/app/today");
			}
			return navigate("/create-profile");
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

	console.log(renderRoute);
	return <Routes>{renderRoute}</Routes>;
};
