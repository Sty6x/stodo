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
				onSubmit={onSubmit}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							validateInput(e);
							handleInputChange(e);
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
							validateInput(e);
							handleInputChange(e);
						}}
						type={"password"}
						value={userForm.password}
						minLength={8}
						required
						id={"password"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign up", path: "/auth/sign-up" },
	};

	function onSubmit(e) {
		const form = e.target;
		setUserCredentials({ ...userForm });
		e.preventDefault();
	}

	function handleInputChange(e) {
		const input = e.target;
		setUserForm((prev) => ({ ...prev, [input.id]: input.value }));
	}

	function validateInput(e) {
		const input = e.target;
		console.log(input);
		console.log(input.validity.valid);
		if (!input.validity.valid) {
			setInputError((prev) => ({
				isError: true,
				message: showError(input),
			}));
		} else {
			setInputError({ isError: false, message: null });
		}
	}

	function showError(input) {
		const errors = {
			missingValue: "Please Enter Your Email and Password",
			email: "You Must Enter an Email",
			password: "A User's Password should not be less than 8 characters",
		};
		if (input.validity.valueMissing) {
			return errors.missingValue;
		}
		if (input.validity.typeMismatch) {
			return errors.email;
		}
		if (input.validity.tooShort) {
			return errors.password;
		}
	}

	useEffect(() => {
		console.log(inputError);
	}, [inputError]);

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent key={"signInContent"} content={authContent} />
		</main>
	);
};
