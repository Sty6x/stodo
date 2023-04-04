import React from "react";
import authFormStyles from "./authFormStyles.module.scss";
export const AuthForm = ({ onSubmit, children, buttonType }) => {
	return (
		<form className={authFormStyles.form} onSubmit={onSubmit}>
			<div className={authFormStyles.input}>
				<label htmlFor="email">Email</label>
				<input type={"text"} id={"email"} />
			</div>
			<div className={authFormStyles.input}>
				<label htmlFor="pass">Password</label>
				<input type={"password"} id={"pass"} />
			</div>
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
