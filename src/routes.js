import React from 'react'
import { Redirect } from 'react-router-dom'

// Layout Types
import { DefaultLayout } from './layouts'

// Route Views
import Wrestling_Designer from './views/Wrestling_Designer'

export default [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/wrestling_mat_designer" />,
  },
  {
    path: '/wrestling_mat_designer',
    layout: DefaultLayout,
    component: Wrestling_Designer,
  },
  {
    path: '/saved_design/:id',
    layout: DefaultLayout,
    component: Wrestling_Designer,
  },
  {
    path: '/swain_mat_designer',
    layout: DefaultLayout,
    component: Wrestling_Designer,
  },
  {
    path: '/wall_pad_designer',
    layout: DefaultLayout,
    component: Wrestling_Designer,
  },
  {
    path: '/material_arts_and_fitness_designer',
    layout: DefaultLayout,
    component: Wrestling_Designer,
  },
]
