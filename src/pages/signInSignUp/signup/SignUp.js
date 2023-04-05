import React, { useEffect } from "react";
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
					checkPasswordConfirmation();
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
						}}
						type={"email"}
						required
						id={"email"}
					/>
				</div>
				<div>
					<label htmlFor="pass">Password</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
						}}
						type={"password"}
						minLength={8}
						required
						id={"password"}
					/>
				</div>
				<div>
					<label htmlFor="conf-pass">Confirm Password</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
						}}
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

	function handleInputChange(e) {
		const input = e.target;
		setUserForm((prev) => ({ ...prev, [input.id]: input.value }));
	}

	function checkPasswordConfirmation() {
		if (userCredentials.password === userCredentials.passwordConfirmation) {
			console.log({
				pass: userForm.password,
				conf: userForm.passwordConfirmation,
			});
		} else {
			console.log("error");
		}
	}

	useEffect(() => {
		console.log(userForm);
	}, [userForm]);

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
