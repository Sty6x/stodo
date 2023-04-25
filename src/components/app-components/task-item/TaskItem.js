import React, { useEffect } from "react";
import taskItemStyles from "./taskItem.module.scss";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

export const TaskItem = ({
  task: { title, desc, dateAdded, ID, taskPriority },
  deleteTask,
}) => {
  useEffect(() => {convertDate(dateAdded)}, [dateAdded]);

  async function convertDate(timeStamp) {
    await timeStamp 
    const timestamp =  new Timestamp(timeStamp.seconds, timeStamp.nanoseconds);
    console.log(timestamp.toDate());
    console.log(timeStamp.seconds)
  }

  return (
    <motion.li
      layout
      exit={{
        x: 60,
        opacity: 0,
        transition: { duration: 0.3, type: "spring" },
      }}
      animate={{ x: [-50, 0], opacity: [0, 1] }}
      id={ID}
      className={`${taskItemStyles.task}`}
    >
      <button
        onClick={(e) => deleteTask(ID)}
        className={`${taskItemStyles.doneBtn}`}
      />
      <div className={`${taskItemStyles.taskContentContainer}`}>
        <div className={`${taskItemStyles.currentPriority}`}>
          <span className={`${taskItemStyles.low}`}></span>
          <span className={`${taskItemStyles.medium}`}></span>
          <span className={`${taskItemStyles.high}`}></span>
        </div>
        <h3>
          {title}
          {/* <span>{format(dateAdded,'p')}</span> */}
        </h3>
        <p>{desc}</p>
      </div>
      <button className={`${taskItemStyles.taskOptions}`} />
    </motion.li>
  );
};
