import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import { Navbar } from "../../components/navbar/Navbar";
import appStyles from "./app.module.scss";
import { signOut } from "firebase/auth";
import { FirebaseContext } from "../../App";

export const App = () => {
  const { auth } = useContext(FirebaseContext);
  return (
    <>
      <Navbar>
        <button
          onClick={async (e) => {
            signOut(auth);
          }}
          style={{ position: "absolute", left: "80%" }}
        >
          Sign out
        </button>
        <div className={appStyles.navLeft}>
          <button className={appStyles.sideBarBtn}></button>
          <Logo to={"/app/today"} />
        </div>
        <div className={appStyles.navRight}>
          {/* make user profile drop down on click  */}
          <div className={appStyles.profile}>
          </div>
        </div>
      </Navbar>
      <main className={appStyles.appPage}>
        <Outlet />
      </main>
    </>
  );
};
