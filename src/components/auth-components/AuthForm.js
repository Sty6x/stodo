import React from "react";
import authoFormStyles from "./authFormStyles.module.scss";
export const AuthForm = ({ onSubmit, children, buttonType }) => {
	return (
		<form className={authoFormStyles.form} onSubmit={onSubmit}>
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
