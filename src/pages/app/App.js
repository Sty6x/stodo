import React, { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo/Logo";
import { Navbar } from "../../components/navbar/Navbar";
import appStyles from "./app.module.scss";
import { signOut } from "firebase/auth";
import { FirebaseContext } from "../../App";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const App = () => {
  const { auth } = useContext(FirebaseContext);
  const sideBarBtnRef = useRef();
  const sideBarRef = useRef();
  const [isSidebarActive,setIsSidebarActive] = useState(true);

  function setSideBarStatus() {
    const btn = sideBarBtnRef.current;
    const sb = sideBarRef.current;
    console.log(sb);
    if (sb.classList.contains("sideBarActive")) {
      sb.classList.replace("sideBarActive", "sideBarInactive");
      setIsSidebarActive(false)
    } else {
      sb.classList.replace("sideBarInactive", "sideBarActive");
      setIsSidebarActive(true)
    }
  }

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
          <button
            onClick={(e) => setSideBarStatus()}
            ref={sideBarBtnRef}
            className={appStyles.sideBarBtn}
          ></button>
          <Logo to={"/app/today"} />
        </div>
        <div className={appStyles.navRight}>
          {/* make user profile drop down on click  */}
          <div className={appStyles.profile}>A</div>
        </div>
      </Navbar>
      <main className={appStyles.appPage}>
        {/*sidebar*/}
        <Sidebar sbRef={sideBarRef} isActive={isSidebarActive} />
        <Outlet />
      </main>
    </>
  );
};
