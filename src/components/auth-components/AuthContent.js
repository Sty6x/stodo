import React from "react";

export const AuthContent = ({ content }) => {
	return (
		<div>
			<div>{content.leftContent}</div>
			<div>{content.rightContent}</div>
		</div>
	);
};
