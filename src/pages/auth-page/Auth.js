import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Outlet } from "react-router-dom";
import authPageStyles from "./authpages.module.scss";
export const Auth = () => {
  // handle the logic here for sign in and sign up
  // instead of changing a whole page for sign in and sign up
  // just the form component of sign in and sign up and
  // display the auth while form components sit on top of auth page

  return (
    <motion.main className={authPageStyles.page}>
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
    </motion.main>
  );
};
