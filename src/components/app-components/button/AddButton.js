import React from "react";
import addBtnStyles from './addButton.module.scss'

export const AddButton = ({ handleClick, type }) => {
  return <button className={addBtnStyles.button} onClick={handleClick}>{type}</button>;
};
