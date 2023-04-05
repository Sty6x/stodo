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
	const [passwordConfirmed, setPasswordConfirmed] = useState(null);

	const [userCredentials, setUserCredentials] = useState(userForm); // use this state for submiting

	const authContent = {
		isSigningIn: false,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign Up"}
				onSubmit={(e) => {
					e.preventDefault();
					setPasswordConfirmed(checkPasswordConfirmation());
					onSubmit();
				}}
			>
				<div>
					<label htmlFor="email">Email</label>
					<input
						onChange={(e) => {
							validateInput(e);
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
							validateInput(e);
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
							validateInput(e);
							handleInputChange(e);
						}}
						type={"password"}
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

	function onSubmit(e) {
		setUserCredentials(userForm);
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
			email: "You Must Enter a Valid Email",
			password: "A User's Password should not be less than 8 characters",
			passConf: "Your Password does not match",
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
		console.log(passwordConfirmed);
		if (!passwordConfirmed) {
			return errors.passConf;
		}
	}

	useEffect(() => {
		console.log(userForm);
		console.log(userCredentials);
	}, [userCredentials]);

	return (
		<main className={signFormStyles.signPage}>
			<AuthContent content={authContent} />
		</main>
	);
};
