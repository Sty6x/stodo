import React from "react";
import { Link } from "react-router-dom";
import logoStyles from "./logo.module.scss";
export const Logo = ({ to }) => {
  return (
    <div className={logoStyles.logoContainer}>
      <Link className={logoStyles.link} to={to}></Link>
    </div>
  );
};
