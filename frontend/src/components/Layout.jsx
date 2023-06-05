import React from "react";
import { Outlet } from "react-router-dom";

import layoutCss from "../assets/styles/layout.module.css";

const Layout = () => {
  return (
    <section className={layoutCss.background}>
      <Outlet />
    </section>
  );
};

export default Layout;
