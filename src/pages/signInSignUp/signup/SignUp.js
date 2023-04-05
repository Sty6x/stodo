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
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
		passwordConfirmation: "",
	});

	const [userCredentials, setUserCredentials] = useState(userForm); // use this state for submiting

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
						required
						id={"password"}
					/>
				</div>
				<div>
					<label htmlFor="conf-pass">Confirm Password</label>
					<input
						type={"password"}
						minLength={8}
						required
						id={"passwordConfirmation"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
	};

	function handleInputChange(e) {}

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
