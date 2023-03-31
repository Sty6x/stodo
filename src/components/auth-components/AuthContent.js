import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-form.svg";

export const AuthContent = ({ content }) => {
	const navigate = useNavigate();
	const {
		leftContent: { textHeader, text, buttonType },
		rightContent: { formComponent, isSigningIn, welcomeText },
	} = content;

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
					<h1>{textHeader}</h1>
					<p>{text}</p>
					<Link to={buttonType.path}>{buttonType.method}</Link>
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
