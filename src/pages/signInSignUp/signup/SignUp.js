import React from "react";
import signFormStyles from "../signform.module.scss";
import signUpStyles from "./signup.module.scss";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import { AuthContent } from "../../../components/auth-components/AuthContent";

const authContent = {
	isSigningIn: false,
	formComponent: <AuthForm buttonType={"Sign Up"} />,
	leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
};

export const SignUp = () => {
	return (
		<main className={signFormStyles.signForm}>
			<AuthContent content={authContent} />
		</main>
	);
};
