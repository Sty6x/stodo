import React from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signform.module.scss";
import signInStyles from "./signin.module.scss";

const content = {
	rightContent: (
		<AuthForm buttonType={"Sign in"}>
			<div className={signFormStyles.input}>
				<label htmlFor="email">Email:</label>
				<input type={"text"} id={"email"} />
			</div>
			<div className={signFormStyles.input}>
				<label htmlFor="pass">Password:</label>
				<input type={"password"} id={"pass"} />
			</div>
		</AuthForm>
	),
	// leftContent:
};

export const SignIn = () => {
	return (
		<main className={signFormStyles.signForm}>
			<AuthContent content={content} />
		</main>
	);
};
