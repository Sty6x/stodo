import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-form.svg";
import { motion } from "framer-motion";

export const AuthContent = ({ content, onSuccess }) => {
	const navigate = useNavigate();
	const { isSigningIn, formComponent, leftContentButton } = content;

	return (
		<motion.div
			initial={{ opacity: 0, y: -200 }}
			animate={{ opacity: 1, y: [null, 0] }}
			transition={{ duration: 0.6, type: "spring", damping: 10 }}
			className={authContentStyles.authContentContainer}
		>
			<div className={authContentStyles.leftContent}>
				<motion.button
					whileHover={{
						x: [null, 10, -15, 0],
						transition: { duration: 0.6 },
					}}
					onClick={() => {
						navigate("/");
					}}
					className={authContentStyles.navigationArrow}
				></motion.button>
				<div className={authContentStyles.textContentContainer}>
					<h1>{isSigningIn ? "New Here?" : "Already Have an Account?"}</h1>
					<p>
						{isSigningIn
							? "Sign up Here to Start Organizing Your Thoughts"
							: "Login Here to Start Organizing Your Thoughts"}
					</p>
					<motion.div>
						<Link to={leftContentButton.path}>
							{leftContentButton.method}
						</Link>
					</motion.div>
				</div>
			</div>
			<div className={authContentStyles.rightContent}>
				<div className={authContentStyles.formContentContainer}>
					<div className={authContentStyles.greetContainer}>
						<img src={logo} />
						<h1>{isSigningIn ? "Welcome Back!" : "Welcome!"}</h1>
						<p>
							{isSigningIn
								? "Login to Your Account"
								: "Create Your Account"}
						</p>
					</div>
					{formComponent}
				</div>
			</div>
		</motion.div>
	);
};
