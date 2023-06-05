import React, { useState } from "react";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

import newActvCss from "../assets/styles/newactvform.module.css";
import { CirclePicker } from "react-color";

const prepareDefOpt = (actvToFill) => {
  let string = actvToFill.actvImgPath.split("-");
  string = string[1].split(".");
  string = string[0];
  return string;
};

const NewActvForm = () => {
  let icons = ["work", "ellipsis", "exercise", "play", "self-care", "social", "study"];
  const [selectedColor, setColor] = useState("#fff");
  const navigate = useNavigate();
  const submit = useSubmit();

  const { user, actvID } = useLoaderData();

  let actvToFill = "";
  let defaultOpt = "";

  if (actvID != null) {
    actvToFill = user.user_actvs.filter((act) => act.actv_id == actvID)[0];
    defaultOpt = prepareDefOpt(actvToFill);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submit(e.target, { method: "post" });
    setTimeout(() => navigate("/dash"), 500);
  }

  return (
    <section className={newActvCss.formCont}>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        method='POST'
        className={newActvCss.formDiv}
        replace>
        <input
          type='text'
          style={{ display: "none" }}
          readOnly
          name='actvID'
          value={actvID != null ? actvID : undefined}
        />

        <div className={newActvCss.inputDrawer}>
          <span>Name</span>
          <input
            name='name'
            required
            type='text'
            placeholder="how's you activity called?"
            defaultValue={actvToFill ? actvToFill.name : undefined}
          />
        </div>

        <div className={newActvCss.inputDrawer}>
          <span>Color</span>
          <input
            type='text'
            name='color'
            style={{ display: "none" }}
            readOnly
            value={selectedColor}
          />
          <CirclePicker
            color={selectedColor}
            onChange={(color) => setColor(color.hex)}
            className={newActvCss.picker}
          />
        </div>

        <div className={newActvCss.inputDrawer}>
          <span>Icon</span>
          <select defaultValue={defaultOpt ? defaultOpt : undefined} name='icon'>
            {icons.map((ic) => {
              return (
                <option key={ic} value={ic}>
                  {ic}
                </option>
              );
            })}
          </select>
        </div>

        <div className={newActvCss.buttons}>
          <button type='submit'>Send</button>
          <button
            type='button'
            onClick={() => {
              navigate("/dash");
            }}>
            Cancel
          </button>
        </div>
      </Form>
    </section>
  );
};

export default NewActvForm;
