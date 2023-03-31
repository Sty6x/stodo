import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link } from "react-router-dom";

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
			<div className={authContentStyles.rightContent}>{rightContent}</div>
		</div>
	);
};
