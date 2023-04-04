import React, { useEffect, useRef, useState } from "react";
import { AuthContent } from "../../../components/auth-components/AuthContent";
import { AuthForm } from "../../../components/auth-components/AuthForm";
import signFormStyles from "../signInSignUp.module.scss";
import signInStyles from "./signin.module.scss";

export const SignIn = () => {
	const [userForm, setUserForm] = useState({
		email: "",
		password: "",
	});
	const [userCredentials, setUserCredentials] = useState(userForm); // use this state for submiting
	const [inputError, setInputError] = useState({
		isError: false,
		message: null,
	});
	const authContent = {
		isSigningIn: true,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign in"}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							handleInputChange(e);
							validateInput(e);
						}}
						value={userForm.email}
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
							validateInput(e);
						}}
						type={"password"}
						value={userForm.password}
						required
						id={"password"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
	};

	function handleInputChange(e) {
		const input = e.target;
		setUserForm((prev) => ({ ...prev, [input.id]: input.value }));
	}

	function validateInput(e) {
		const input = e.target;
		if (!input.validity.valid) {
			setInputError((prev) => ({
				isError: true,
				message: showError(input),
			}));
		} else {
			setInputError((prev) => ({ isError: false, ...prev }));
		}
	}

	function showError(input) {
		const errors = {
			missingValue: "Please Enter Your Email and Password",
			email: "You Must Enter an Email",
		};
		if (input.validity.valueMissing) {
			return errors.missingValue;
		}
		if (input.validity.typeMismatch) {
			return errors.email;
		}
	}

	useEffect(() => {
		console.log(userForm);
		console.log(inputError);
	}, [userForm]);

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
