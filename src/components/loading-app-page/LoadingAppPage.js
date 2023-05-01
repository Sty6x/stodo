import React from "react";
import loadingAppPageStyle from "./loadingAppPage.module.scss";
import { AnimatePresence, motion } from "framer-motion";

export const LoadingAppPage = () => {
  return (
      <motion.div
        key={'loadingApp'}
        animate={{ opacity: 1 }}
        className={loadingAppPageStyle.loadingPage}
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          key={"spinner"}
          initial={{ opacity: 0, y: -100 }}
          className={loadingAppPageStyle.item}
        ></motion.div>
      </motion.div>
  );
};
