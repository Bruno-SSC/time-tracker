import { retrieveUser } from "./userControl";

const setId = async () => {
  const user = await retrieveUser();
  let totalActvs = user.user_actvs.length;
  return ++totalActvs;
};

export class Activity {
  constructor({ name, color, icon }) {
    this.name = name;
    this.actvImgPath = `images/icon-${icon}.svg`;
    this.color = color;
    setId().then((id) => {
      this.actv_id = "actv" + id;
    });
  }
}

export let user0 = {
  user_info: {
    user_id: "",
    user_name: "Jeremy Robson",
    user_pic: "/images/jeremy.png",
  },
  user_actvs: [], // persiste entre dias
  user_registers: {}, // cada dia gera uma chave com as atividades e seus tempos relativos
};
