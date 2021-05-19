import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Swain_Designer from "./views/Swain_Designer";
import Wrestling_Designer from "./views/Wrestling_Designer";
import Flexi_Designer from "./views/Flexi_Designer";
import WallPad_Designer from "./views/WallPad_Designer";
import AdminLayout from "./views/Admin";
import HomePage from "./views/home";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: HomePage
  },
  {
    path: "/wrestling_mat_designer",
    layout: DefaultLayout,
    component: Wrestling_Designer
  },
  {
    path: "/wrestling_save_designer/:id",
    layout: DefaultLayout,
    component: Wrestling_Designer
  },
  {
    path: "/swain_mat_designer",
    layout: DefaultLayout,
    component: Swain_Designer
  },
  {
    path: "/swain_save_designer/:id",
    layout: DefaultLayout,
    component: Swain_Designer
  },
  {
    path: "/wallpad_mat_designer",
    layout: DefaultLayout,
    component: WallPad_Designer
  },
  {
    path: "/wallpad_save_designer/:id",
    layout: DefaultLayout,
    component: WallPad_Designer
  },
  {
    path: "/flexi_mat_designer",
    layout: DefaultLayout,
    component: Flexi_Designer
  },
  {
    path: "/flexi_save_designer/:id",
    layout: DefaultLayout,
    component: Flexi_Designer
  },
  {
    path: "/admin",
    layout: DefaultLayout,
    component: AdminLayout
  }
];
