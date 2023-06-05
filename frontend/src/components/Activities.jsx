import React from "react";
import activitiesCss from "../assets/styles/activities.module.css";
import Activity from "./Activity";
import { useOutletContext } from "react-router-dom";

const Activities = () => {
  const user = useOutletContext();
  const activitiesArr = user.user_actvs;

  return (
    <section className={activitiesCss.activities}>
      <div className={activitiesCss.subsection}>
        {activitiesArr == "" ? (
          <Empty />
        ) : (
          activitiesArr.map((actv) => {
            return (
              <Activity actv={actv} key={actv.actv_id} registers={user.user_registers} />
            );
          })
        )}
      </div>
    </section>
  );
};

const Empty = () => {

  return (
    <div className={activitiesCss.empty}>
      <h1> Time to start adding activities!</h1>
    </div>
  );
};

export default Activities;
