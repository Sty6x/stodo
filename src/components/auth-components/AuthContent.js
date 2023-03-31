import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link, NavLink } from "react-router-dom";

export const AuthContent = ({ content }) => {
	const {
		leftContent: { textHeader, text, buttonType },
		rightContent,
	} = content;

	return (
		<div className={authContentStyles.authContentContainer}>
			<div className={authContentStyles.leftContent}>
				<div className={authContentStyles.textContentContainer}>
					<h1>{textHeader}</h1>
					<p>{text}</p>
					<Link to={buttonType.path}>{buttonType.method}</Link>
				</div>
			</div>
			<div className={authContentStyles.rightContent}>
				<div className={authContentStyles.formContentContainer}>
					<img />
					<h1>welcome</h1>
					<p>sign</p>
					{rightContent}
				</div>
			</div>
		</div>
	);
};
