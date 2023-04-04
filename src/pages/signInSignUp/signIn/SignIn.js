import React from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signInSignUp.module.scss";
import signInStyles from "./signin.module.scss";

const authContent = {
	isSigningIn: true,
	formComponent: (
		<AuthForm
			buttonType={"Sign in"}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div>
				<label htmlFor="email">Email</label>
				<input type={"text"} required id={"email"} />
			</div>
			<div>
				<label htmlFor="pass">Password</label>
				<input type={"password"} required id={"pass"} />
			</div>
		</AuthForm>
	),
	leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
};

export const SignIn = () => {
	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
