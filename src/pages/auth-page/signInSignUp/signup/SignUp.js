import React, { useContext, useEffect, useState } from "react";
import signFormStyles from "../../authpages.module.scss";
import signUpStyles from "./signup.module.scss";
import { AuthForm } from "../../../../components/auth-components/AuthForm";
import { AuthContent } from "../../../../components/auth-components/AuthContent";
import { FirebaseContext } from "../../../../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../Auth";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const SignUp = () => {
	const { auth } = useContext(FirebaseContext);
	const [onSuccess, setOnSuccess] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [inputError, setInputError] = useState({
		isError: false,
		message: null,
	});

	const [passwordConfirmed, setPasswordConfirmed] = useState(null);
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	}); // use this state for submiting
	const authContent = {
		isSigningIn: false,
		formComponent: (
			<AuthForm
				errorInput={inputError}
				buttonType={"Sign Up"}
				onSubmit={createNewUser}
				isLoading={isLoading}
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
							handleInputChange(e);
						}}
						type={"password"}
						minLength={8}
						required
						id={"password"}
					/>
				</div>
			</AuthForm>
		),
		leftContentButton: { method: "Sign in", path: "/auth/sign-in" },
	};

	function handleInputChange(e) {
		const input = e.target;
		setUserCredentials((prev) => {
			return { ...prev, [input.id]: input.value };
		});
		validateInput(e);
	}

	async function createNewUser(e) {
		e.preventDefault();
		setIsLoading(true);
		try {
			const newACcount = await createUserWithEmailAndPassword(
				auth,
				userCredentials.email,
				userCredentials.password
			);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.log("Unable to create user");
			throw err;
		}
	}

	// delaying state change of password confirmation
	function validateInput(e) {
		const input = e.target;
		if (!input.validity.valid) {
			return setInputError((prev) => {
				return { isError: true, message: showError(input) };
			});
		} else {
			return setInputError((prev) => {
				return { isError: false, message: null };
			});
		}
	}

	function showError(input) {
		const errors = {
			missingValue: "Please Enter Your Email and Password",
			email: "You Must Enter a Valid Email",
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
		console.log(auth.currentUser);
	}, [auth.currentUser]);
	return (
			<AuthContent key={"signUpContent"} content={authContent} />
	);
};
