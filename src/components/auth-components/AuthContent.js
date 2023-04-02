import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-form.svg";

export const AuthContent = ({ content }) => {
	const navigate = useNavigate();
	const { isSigningIn, formComponent, leftContentButton } = content;

	return (
		<div className={authContentStyles.authContentContainer}>
			<div className={authContentStyles.leftContent}>
				<button
					onClick={() => {
						navigate(-1);
					}}
					className={authContentStyles.navigationArrow}
				></button>
				<div className={authContentStyles.textContentContainer}>
					<h1>{isSigningIn ? "New Here?" : "Already Have an Account?"}</h1>
					<p>
						{isSigningIn
							? "Sign up Here to Start Organizing Your Thoughts"
							: "Login Here to Start Organizing Your Thoughts"}
					</p>
					<Link to={leftContentButton.path}>
						{leftContentButton.method}
					</Link>
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
		</div>
	);
};
