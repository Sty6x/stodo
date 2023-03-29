import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";

export const Index = () => {
	return (
		<>
			<header>
				<Navbar>
					<h1>
						<Link to={"/"}>STODO</Link>
					</h1>
				</Navbar>
			</header>
			<main></main>
		</>
	);
};
