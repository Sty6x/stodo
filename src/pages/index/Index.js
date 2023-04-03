import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import indexStyles from "./index.module.scss";
import heroImage from "../../assets/images/hero-images.png";
import logo from "../../assets/images/logo.svg";
import { motion } from "framer-motion";
export const Index = () => {
	return (
		<>
			<Navbar>
				<Link className={indexStyles.logoContainer} to={"/"}>
					<img className={indexStyles.logoImg} src={logo} alt="logo" />
				</Link>
				<div className={`${indexStyles.sign} links`}>
					<NavLink to={"/auth/sign-in"}>Sign in</NavLink>
					<NavLink to={"/auth/sign-up"}>Start for Free</NavLink>
				</div>
			</Navbar>
			<main className={`${indexStyles.main}`}>
				<section className={`${indexStyles.hero}`}>
					<div className={` ${indexStyles.text} left`}>
						<div className={`${indexStyles.textContainer}`}>
							<h1>
								A Simple <span>Minimalistic</span> Task app.
							</h1>
							<p>
								Organize all of your tasks,increase your productivity,
								manage your time effectively, stay on top of your
								priorities and get things done.
							</p>
							<motion.div className={indexStyles.ctaBtnContainer}>
								<Link to={"/auth/sign-up"}>Start for Free</Link>
							</motion.div>
						</div>
					</div>
					<div className={`right ${indexStyles.image}`}>
						<img src={heroImage} alt="stodo-hero-section" />
					</div>
				</section>
			</main>
		</>
	);
};
