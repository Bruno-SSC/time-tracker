import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./components/Layout";
import CardLogin from "./components/CardLogin";
import Dashboard from "./components/Dashboard";
import Activities from "./components/Activities";
import NewActvForm from "./components/NewActvForm";

import {
  clean,
  newActv,
  retrieveUser,
  buildActv,
  updateRegister,
  updateActv,
  fakeRegisters,
} from "./assets/scripts/userControl";

const dashAdd = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const new_actv = buildActv(formData);
  const user = await newActv(new_actv);

  return user || null;
};

const dashAction = async ({ request }) => {
  if (request.method == "DELETE") return await clean();
  if (request.method == "POST") return await fakeRegisters();
};

const dashLoader = async ({ params }) => {
  const user = await retrieveUser();
  let actvID = null;

  if (Object.keys(params).length != 0) {
    actvID = params.actvID;
  }

  return { user, actvID };
};

const actvAction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  const user = await updateRegister(formData);
  return user || null;
};

const actvUpdate = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  let { actvID, ...newActvData } = formData;
  const updated = await updateActv({ actvID, newActvData });
  return updated;
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<CardLogin />} />
      <Route path='dash' loader={dashLoader} action={dashAction} element={<Dashboard />}>
        <Route index action={actvAction} element={<Activities />} />
        <Route path='week' action={actvAction} element={<Activities />} />
        <Route path='month' action={actvAction} element={<Activities />} />

        <Route
          path='createActv'
          action={dashAdd}
          loader={dashLoader} // eu usei o mesmo comp em duas rotas, sendo que apenas uma usa os dados do loader. A outra, no caso. Porém, ele espera os dados do loader anyway.
          element={<NewActvForm />}
        />

        <Route
          path='createActv/:actvID'
          action={actvUpdate}
          loader={dashLoader}
          element={<NewActvForm />}
        />
      </Route>
    </Route>
  )
);

export default Router;
