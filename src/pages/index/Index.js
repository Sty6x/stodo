import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import indexStyles from "./index.module.scss";

export const Index = () => {
	return (
		<>
			<header className={`${indexStyles.header}`}>
				<Navbar>
					<Link to={"/"}>STODO</Link>
					<div className={`links`}>
						<NavLink to={"/auth/sign-in"}>Sign in</NavLink>
						<NavLink to={"/auth/sign-up"}>Create for Free</NavLink>
					</div>
				</Navbar>
			</header>
			<main className={`${indexStyles.main}`}></main>
		</>
	);
};
