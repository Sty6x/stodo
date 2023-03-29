import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import indexStyles from "./index.module.scss";

export const Index = () => {
	return (
		<>
			<Navbar>
				<Link to={"/"}>STODO</Link>
				<div className={`${indexStyles.sign} links`}>
					<NavLink to={"/auth/sign-in"}>Sign in</NavLink>
					<NavLink to={"/auth/sign-up"}>Start for Free</NavLink>
				</div>
			</Navbar>
			<main className={`${indexStyles.main}`}></main>
		</>
	);
};
