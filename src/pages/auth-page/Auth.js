import React from "react";
import { Outlet } from "react-router-dom";
export const Auth = () => {
  // handle the logic here for sign in and sign up 
  // instead of changing a whole page for sign in and sign up 
  // just the form component of sign in and sign up and
  // display the auth while form components sit on top of auth page

	return (
		<>
			<Outlet />
		</>
	);
};
