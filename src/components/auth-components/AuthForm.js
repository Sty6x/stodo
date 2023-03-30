import React from "react";

export const AuthForm = ({ onSubmit, children, buttonType }) => {
	return (
		<form onSubmit={onSubmit}>
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
