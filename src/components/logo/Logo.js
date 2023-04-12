import React from "react";
import logo from '../../assets/images/logo.svg'
import { Link } from "react-router-dom";
import logoStyles from './logo.module.scss'
export const Logo = () => {
  return (
    <Link className={logoStyles.logoContainer} to={"/"}>
      <img className={logoStyles.logoImg} src={logo} alt="logo" />
    </Link>
  );
};
