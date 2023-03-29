import React from "react";
import navStyles from "./navbar.module.scss";

export const Navbar = ({ children }) => {
	return <nav className={`${navStyles.navBar}`}>{children}</nav>;
};
