import localforage from "localforage";
import { user0, Activity } from "./user0";

export const dynamicDate = (starterPoint, finalPoint) => {
  let dateArray = [];
  let splitDate = starterPoint.split("/");
  let splitFP = finalPoint.split("/");

  let c = 0;
  let x = splitDate[0] - splitFP[0];
  if (splitDate[1] != splitFP[1]) x = 31 - x;
  if (splitFP[1] - splitDate[1] > 1) x = x + 31;

  while (c < x) {
    dateArray.push(generateDate(-c));
    c++;
  }

  return dateArray;
};

export const generateDate = (dayPicker) => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (dayPicker) day = date.getDate() + dayPicker;

  if (day < 1) {
    let offSet = day;
    day = 31 + offSet; //supus que todos meses tem 31 dias
    month = month - 1;
    if (day < 1) {
      let offSet = day;
      day = 31 + offSet;
      month = month - 1;
    }
  }

  return `${day}/${month}/${year}`;
};

export const register = async () => {
  try {
    const res = await localforage.setItem("user0", user0);
  } catch (error) {
    console.log(error);
  }
};

export const retrieveUser = async () => {
  try {
    return await localforage.getItem("user0");
  } catch (error) {
    console.log(error);
  }
};

export const newActv = async (new_actv) => {
  try {
    const user = await retrieveUser("user0");
    user.user_actvs.push(new_actv);

    const todayKey = generateDate();
    if (!user.user_registers[todayKey]) user.user_registers[todayKey] = [];
    user.user_registers[todayKey].push({ id: new_actv.actv_id, time: 0 });

    await localforage.setItem("user0", user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const buildActv = ({ name, color, icon }) => {
  return new Activity({ name, color, icon });
};

export const clean = async () => {
  const user = await retrieveUser("user0");
  user.user_actvs = [];
  user.user_registers = {};
  await localforage.setItem("user0", user);
  return null;
};

export const updateRegister = async (formData) => {
  let user = await retrieveUser();
  const TimeKey = generateDate();
  let { actvID, actvTime } = formData;

  if (formData.increaseBTN != undefined) actvTime++;
  if (formData.decreaseBTN != undefined) actvTime--;
  if (actvTime < 0) actvTime = 0;

  const timeInverval = user.user_registers[TimeKey];
  timeInverval.filter((reg) => reg.id == actvID)[0].time = parseInt(actvTime);
  await localforage.setItem("user0", user);
  return user;
};

export const updateActv = async ({ actvID, newActvData }) => {
  let user = await retrieveUser();

  newActvData = buildActv(newActvData);
  newActvData.actv_id = actvID;

  user.user_actvs = user.user_actvs.map((act) => {
    if (act.actv_id == actvID) act = newActvData;
    return act;
  });

  await localforage.setItem("user0", user);
  return newActv;
};

export const fakeRegisters = async () => {
  const names = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
  ];
  const hex = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
  ];
  const icons = ["work", "ellipsis", "exercise", "play", "self-care", "social", "study"];

  const objects = Array.from({ length: 10 }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const color = hex[Math.floor(Math.random() * hex.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    return { name, color, icon };
  });

  await clean();
  const indexes = dynamicDate("01/01/2023", "01/06/2023");
  const user = await retrieveUser();

  let c1 = 0;

  while (c1 < objects.length) {
    user.user_actvs.push(buildActv(objects[c1]));
    await localforage.setItem("user0", user);
    c1++;
  }

  let c2 = 0;
  while (c2 < indexes.length) {
    user.user_registers[indexes[c2]] = [];
    let x = 0;
    while (x < objects.length) {
      let randomNumber = Math.floor(Math.random() * user.user_actvs.length);
      let act = user.user_actvs[x];
      user.user_registers[indexes[c2]].push({ id: act.actv_id, time: randomNumber });
      x++;
    }
    c2++;
  }
  await localforage.setItem("user0", user);
  return user;
};
