import React from "react";
import cardLoginCss from "../assets/styles/cardlogin.module.css";
import { useNavigate } from "react-router-dom";

import { register } from "../assets/scripts/userControl";

const troll = () => {
  !confirm("Nope. Don't do that. Just login. You are jeremy. That's you today.");
};

const CardLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dash");
    register();
  };

  return (
    <section className={cardLoginCss.card}>
      <div className={cardLoginCss.imgWrapper}>
        <img src='../../public/images/jeremy.png' alt='' />
      </div>

      <div className={cardLoginCss.formDiv}>
        <label htmlFor='nameInput'>User's name</label>
        <input
          type='text'
          id='nameInput'
          placeholder='Jeremy'
          readOnly
          onChange={troll}
        />
        <button type='button' onClick={handleLogin}>
          login
        </button>
      </div>
    </section>
  );
};

export default CardLogin;

/*  TODO: 
- ambos vão ser renderizados no mesmo contexto, o que permite usar o useOutletContext para trazer os dados do user0 para popular a UI.

- Posso add uma tela de loding do uiverse enquanto carrega os dados do user0

- com o tempo, NAO vai ser possível expandir esse login para ter um registro e relacionados. Esse não é o objetivo. Ele vai ser só isso mesmo. A função é só completar a UX e a interatividade.
*/
