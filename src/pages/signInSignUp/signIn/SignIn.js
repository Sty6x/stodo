import React from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signform.module.scss";
import signInStyles from "./signin.module.scss";

const authContent = {
	rightContent: {
		isSigningIn: true,
		formComponent: <AuthForm buttonType={"Sign in"}></AuthForm>,
	},
	leftContent: {
		textHeader: "New Here?",
		text: "Sign up and start organizing your thoughts.",
		buttonType: { method: "Sign up", path: "/auth/sign-up" },
	},
};

export const SignIn = () => {
	return (
		<main className={signFormStyles.signForm}>
			<AuthContent content={authContent} />
		</main>
	);
};
