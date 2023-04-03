import React from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signform.module.scss";
import signInStyles from "./signin.module.scss";

const authContent = {
	isSigningIn: true,
	formComponent: (
		<AuthForm
			buttonType={"Sign in"}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		/>
	),
	leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
};

export const SignIn = () => {
	return (
		<main className={signFormStyles.signForm}>
			<AuthContent content={authContent} />
		</main>
	);
};
