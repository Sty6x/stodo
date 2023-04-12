import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import { Navbar } from "../../components/navbar/Navbar";
import appStyles from "./app.module.scss";

export const App = () => {
  return (
    <>
      <Navbar>
        <div>
          <button className={appStyles.sideBarBtn}></button>
          <Logo to={'/app/today'} />
        </div>
        <div>
          {/* make user profile drop down on click  */}
          <button className={appStyles.profile}></button>
        </div>
      </Navbar>
      <main className={appStyles.appPage}>
        <Outlet />
      </main>
    </>
  );
};
