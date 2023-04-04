import React from "react";
import signFormStyles from "../signInSignUp.module.scss";
import signUpStyles from "./signup.module.scss";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import { AuthContent } from "../../../components/auth-components/AuthContent";

const authContent = {
	isSigningIn: false,
	formComponent: (
		<AuthForm
			buttonType={"Sign Up"}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<div>
				<label htmlFor="conf-pass">Confirm Password</label>
				<input type={"password"} required id={"conf-pass"} />
			</div>
		</AuthForm>
	),
	leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
};

export const SignUp = () => {
	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
