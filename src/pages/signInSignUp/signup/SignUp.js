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
	const [passwordConfirmed, setPassworcConfirmed] = useState(null);

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
		const passArr = userForm.password.split("");
		const passConfArr = userForm.passwordConfirmation.split("");
		if (
			passArr.length > passConfArr.length ||
			passConfArr.length > passArr.length
		) {
			console.log("password does not match");
			return false;
		}
		for (let i = 0; i < passConfArr.length; i++) {
			if (passArr[i] === passConfArr[i]) {
				console.log({ pass: passArr[i], conf: passConfArr[i] });
			} else {
				console.log("password does not match");
				return false;
			}
		}
		// return true if password checking is complete === true
		// would automatically return false if any of the elements doesnt match
		return true;
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
