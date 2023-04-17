import React from "react";
import headerStyles from './headerComponent.module.scss'

export const HeaderComponent =({pageName}) =>{
  return (
      <header className={`${headerStyles.headerContainer}`}>
        {/* this should be a component */}
        <div className={`${headerStyles.titleDateContainer}`}>
          <h1>{pageName}</h1>
          <p>Thu 23 Mar</p>
        </div>
      </header>
  )
}

