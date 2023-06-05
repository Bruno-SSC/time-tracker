import { useEffect } from "react";
import activityCss from "../assets/styles/activity.module.css";
import { NavLink, useFetcher, useLocation } from "react-router-dom";
import { dynamicDate, generateDate, register } from "../assets/scripts/userControl";

const filter = (registers, actv, dayPicker) => {
  const TimeKey = generateDate(dayPicker);
  const Regis = registers[TimeKey];
  let TimeAmount = [{ time: 0 }];
  if (Regis) TimeAmount = Regis.filter((reg) => reg.id == actv.actv_id);
  return TimeAmount[0];
};

const prepRangeValues = (range) => {
  let initial = 0;
  let final = 0;

  switch (range) {
    case "week":
      initial = generateDate();
      final = generateDate(-14);
      break;
    case "month":
      initial = generateDate();
      final = generateDate(-62);
      break;
    default:
      break;
  }

  return { initial, final };
};

const setTimeRange = (range) => {
  let { initial, final } = prepRangeValues(range);
  const dateArrayPrevious = dynamicDate(final, initial);
  const spliceIndex = -dateArrayPrevious.length;
  const spliceAmount = dateArrayPrevious.length / 2;
  const dateArrayCurrent = dateArrayPrevious.splice(spliceIndex, spliceAmount);
  return { dateArrayCurrent, dateArrayPrevious };
};

const sumActvRegisters = (regis, actv, indexes) => {
  let base = {};

  // TODO: parei aqui. Só falta iterar nos registros usando esses indexes, retornando o objeto filtrado e somando ele na base

  let c = 0;

  while (c < 10) {
    c++;
  }

  return base;
};

const Activity = ({ actv, registers }) => {
  const fetch = useFetcher();
  const location = useLocation();

  let current = {};
  let previous = {};
  /* 
  let current = filter(registers, actv, null);
  let previous = filter(registers, actv, -1);
 */
  let imgPath = actv.actvImgPath;
  if (location.pathname !== "/") {
    imgPath = "../" + imgPath;
  }

  const handleContentChange = (actv) => {
    const activityEl = document.querySelector(`#${actv.actv_id}`);
    activityEl.style.setProperty("--after-image", `url(${imgPath})`);
    activityEl.style.setProperty("--before-color", `${actv.color}`);

    const activityBtns = document.querySelectorAll(`.${activityCss.btn}`);
    Array.from(activityBtns).forEach((btn) =>
      btn.style.setProperty("--color", `${actv.color}`)
    );
  };

  useEffect(() => {
    handleContentChange(actv, imgPath);

    if (fetch.formData != undefined) {
      current.time = fetch.formData.get("actvTime");
    }
  });

  if (location.pathname == "/dash") {
    const { dateArrayPrevious, dateArrayCurrent } = setTimeRange("week");

    let currentIndex = dateArrayCurrent[0];
    let previousIndex = dateArrayCurrent[1];

    current = registers[currentIndex].filter((r) => r.id == actv.actv_id)[0];

    previous = registers[previousIndex]
      ? registers[previousIndex].filter((r) => r.id == actv.actv_id)[0]
      : { time: 0 };
  }

  if (location.pathname == "/dash/week") {
    const { dateArrayPrevious, dateArrayCurrent } = setTimeRange("week");
    let actvCurrentTime = 0;
    let actvPrevTime = 0;
  }

  if (location.pathname == "/dash/month") {
    const { dateArrayPrevious, dateArrayCurrent } = setTimeRange("month");
    let actvCurrentTime = 0;
    let actvPrevTime = 0;
  }

  return (
    <div className={activityCss.activity} id={actv.actv_id}>
      <div className={activityCss.activityInfo}>
        <p>{actv.name}</p>
        <NavLink to={`createActv/${actv.actv_id}`}>...</NavLink>
      </div>
      <div className={activityCss.activityHours}>
        <fetch.Form className={activityCss.buttons} method='POST'>
          <button name='increaseBTN' type='submit' className={activityCss.btn}>
            <span>&#43;</span>
          </button>
          <input
            type='text'
            name='actvTime'
            value={current.time}
            readOnly
            style={{ display: "none" }}
          />
          <input
            type='text'
            name='actvID'
            value={actv.actv_id}
            readOnly
            style={{ display: "none " }}
          />

          <h1>{current.time}</h1>

          <button name='decreaseBTN' type='submit' className={activityCss.btn}>
            <span>&#8722;</span>
          </button>
        </fetch.Form>
        <p>
          Previous - <span>{previous == undefined ? 0 : previous.time}</span>
        </p>
      </div>
    </div>
  );
};

export default Activity;
