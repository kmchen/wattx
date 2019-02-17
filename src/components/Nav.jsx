import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const Nav = ({selectTopList}) =>
  <nav className="navbar">
    <div className="container">
      <div className="navbar-brand">
        <span className="navbar-burger burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    <div id="navbarMenu" className="navbar-menu">
      <div className="navbar-end">
        <Link className="navbar-item is-active" to="/">Market Overview</Link>
        <Link className="navbar-item" to="/liquidity">Liquidity</Link>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link"> Top List </a>
          <div className="navbar-dropdown">
            <a className="navbar-item" onClick={() => selectTopList(10)}> Top 10 </a>
            <a className="navbar-item" onClick={() => selectTopList(50)}> Top 50 </a>
            <a className="navbar-item" onClick={() => selectTopList(0)}> All </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </nav>
