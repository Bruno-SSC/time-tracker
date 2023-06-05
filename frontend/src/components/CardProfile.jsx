import React from "react";
import cardProfileCss from "../assets/styles/cardprofile.module.css";
import { NavLink, Form, useLocation } from "react-router-dom";

const CardProfile = ({ props }) => {
  const user = props;
  const location = useLocation();

  let imgPath = user.user_info.user_pic;

  if (location.pathname !== "/") {
    let count = location.pathname.split("/").length - 1;

    for (let i = 0; i < count; i++) {
      imgPath = "../" + imgPath;
    }
  }

  return (
    <section className={cardProfileCss.card}>
      <div className={cardProfileCss.info}>
        <div className={cardProfileCss.profilePic}>
          <img src={imgPath} alt='' />
        </div>
        <div className={cardProfileCss.name}>
          <p>Report for</p>
          <h1>{user.user_info.user_name}</h1>
        </div>
      </div>
      <div className={cardProfileCss.triggers}>
        <div className={cardProfileCss.time}>
          <NavLink to={""} replace>
            Daily
          </NavLink>
          <NavLink to={"week"} replace>
            Weekly
          </NavLink>
          <NavLink to={"month"} replace>
            Monthly
          </NavLink>
        </div>

        <div className={cardProfileCss.actions}>
          <NavLink to={"createActv"} replace>
            New
          </NavLink>

          <Form method='delete' replace>
            <button type='submit'>Clean</button>
          </Form>

          <Form method='post' replace>
            <button type='submit'>Fake</button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default CardProfile;
