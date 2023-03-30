import React from "react";
import authContentStyles from "./authContent.module.scss";

export const AuthContent = ({ content }) => {
	return (
		<div className={authContentStyles.authContentContainer}>
			<div className={authContentStyles.leftContent}>
				{content.leftContent}
			</div>
			<div className={authContentStyles.rightContent}>
				{content.rightContent}
			</div>
		</div>
	);
};
