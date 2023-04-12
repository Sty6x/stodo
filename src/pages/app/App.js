import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import appStyles from "./app.module.scss";

export const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <main className={appStyles.appPage}>
        <Outlet />
      </main>
    </>
  );
};
