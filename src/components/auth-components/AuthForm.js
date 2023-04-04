import React from "react";
import authFormStyles from "./authFormStyles.module.scss";
export const AuthForm = ({ onSubmit, children, buttonType }) => {
	return (
		<form className={authFormStyles.form} onSubmit={onSubmit}>
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
