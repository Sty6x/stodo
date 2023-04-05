import React from "react";
import signFormStyles from "../signInSignUp.module.scss";
import signUpStyles from "./signup.module.scss";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { useState } from "react";

export const SignUp = () => {
	const [inputError, setInputError] = useState({
		isError: false,
		message: null,
	});

	const authContent = {
		isSigningIn: false,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign Up"}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input type={"email"} required id={"email"} />
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
						type={"password"}
						minLength={8}
						maxLength={16}
						required
						id={"pass"}
					/>
				</div>
				<div>
					<label htmlFor="conf-pass">Confirm Password</label>
					<input
						type={"password"}
						minLength={8}
						maxLength={16}
						required
						id={"conf-pass"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
	};

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
