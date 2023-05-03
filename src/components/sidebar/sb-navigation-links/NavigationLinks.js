import React from "react";
import { NavLink } from "react-router-dom";
import navigationLinksStyle from './navigationLinks.module.scss'
export const NavigationLinks = () => {
  return (
    <ul className={navigationLinksStyle.navigation}>
      <li className={navigationLinksStyle.today}>
        <NavLink to={"/app/today"}>Today</NavLink>
      </li>
      <li className={navigationLinksStyle.upcoming}>
        <NavLink to={"/app/upcoming"}>Upcoming</NavLink>
      </li>
      <li className={navigationLinksStyle.overdue}>
        <NavLink to={"/app/overdue"}>Overdue Tasks</NavLink>
      </li>
    </ul>
  );
};
