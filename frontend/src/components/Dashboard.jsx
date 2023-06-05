import { Outlet, useLoaderData } from "react-router-dom";

import CardProfile from "./CardProfile";

import contentCss from "../assets/styles/content.module.css";

const Dashboard = () => {
  const { user } = useLoaderData();

  return (
    <div className={contentCss.content}>
      <CardProfile props={user} />
      <Outlet context={user} />
    </div>
  );
};

export default Dashboard;
