import React from "react";
import authoFormStyles from "./authFormStyles.module.scss";
import signFormStyles from "../../pages/signInSignUp/signform.module.scss";
export const AuthForm = ({ onSubmit, children, buttonType }) => {
	return (
		<form className={authoFormStyles.form} onSubmit={onSubmit}>
			<div className={signFormStyles.input}>
				<label htmlFor="email">Email</label>
				<input type={"text"} id={"email"} />
			</div>
			<div className={signFormStyles.input}>
				<label htmlFor="pass">Password</label>
				<input type={"password"} id={"pass"} />
			</div>
			{children}
			<button type="submit">{buttonType}</button>
		</form>
	);
};
