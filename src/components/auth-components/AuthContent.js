import React from "react";
import authContentStyles from "./authContent.module.scss";
import { Link } from "react-router-dom";

export const AuthContent = ({ content }) => {
	return (
		<div className={authContentStyles.authContentContainer}>
			<div className={authContentStyles.leftContent}>
				<div className={authContentStyles.textContentContainer}>
					<h1>{content.leftContent.header}</h1>
					<p>{content.leftContent.text}</p>
					<Link to={content.leftContent.buttonType.path}>
						{content.leftContent.buttonType.method}
					</Link>
				</div>
			</div>
			<div className={authContentStyles.rightContent}>
				{content.rightContent}
			</div>
		</div>
	);
};
