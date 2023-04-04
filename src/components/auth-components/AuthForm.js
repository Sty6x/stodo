import React from "react";
import authFormStyles from "./authFormStyles.module.scss";
export const AuthForm = ({ errorInput, onSubmit, children, buttonType }) => {
	return (
		<form className={authFormStyles.form} onSubmit={onSubmit}>
			{errorInput.isError === true && (
				<div className={authFormStyles.errorMessage}>
					{errorInput.message}
				</div>
			)}
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
