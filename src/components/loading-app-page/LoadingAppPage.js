import React from "react";
import loadingAppPageStyle from "./loadingAppPage.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const LoadingAppPage = () => {
  return (
    <AnimatePresence>
      <div className={loadingAppPageStyle.loadingPage}>
        <div className={loadingAppPageStyle.loadingIconContainer}>
          <motion.div className={loadingAppPageStyle.item}></motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
