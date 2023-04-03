import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import indexStyles from "./index.module.scss";
import heroImage from "../../assets/images/hero-images.png";
import logo from "../../assets/images/logo.svg";
import { motion } from "framer-motion";

const leftContainerVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

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
						<motion.div
							initial="hidden"
							animate="visible"
							variants={leftContainerVariants}
							className={`${indexStyles.textContainer}`}
						>
							<h1>
								A Simple <span>Minimalistic</span> Task app.
							</h1>
							<p>
								Organize all of your tasks,increase your productivity,
								manage your time effectively, stay on top of your
								priorities and get things done.
							</p>
							<motion.div
								whileTap={{
									scale: 0.9,
								}}
								className={indexStyles.ctaBtnContainer}
							>
								<Link to={"/auth/sign-up"}>Start for Free</Link>
							</motion.div>
						</motion.div>
					</div>
					<motion.div
						initial={{ opacity: 0.2, y: 700 }}
						whileInView={{
							opacity: 1,
							y: [null, 0],
							transition: { duration: 0.6, type: "spring" },
						}}
						className={`right ${indexStyles.image}`}
					>
						<img src={heroImage} alt="stodo-hero-section" />
					</motion.div>
				</section>
			</main>
		</>
	);
};
